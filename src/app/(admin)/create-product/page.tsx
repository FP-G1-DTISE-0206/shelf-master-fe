"use client"
import Link from "next/link";
import { useState, FC, useCallback, useRef } from "react";
import { cn } from "@/utils";
import { 
  Card, TextInput, Textarea, Button, Badge, Carousel, Breadcrumb, 
  Label, Dropdown, 
} from "flowbite-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMinus, faSearch, faTrash, 
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { ErrorMessage, Form, Formik, Field } from "formik";
import { CreateProductRequest } from "@/types/product";
import useProductCategory from "@/hooks/category/useProductCategory";
import { useSearchPaginationStore } from "@/store/useSearchPaginationStore";
import useCreateProduct from "@/hooks/product/useCreateProduct";
import { useSession } from "next-auth/react";
import * as Yup from "yup";
import MultipleImageUploader from "../products/components/MultipleImageUploader";
import CustomSpinner from "@/components/CustomSpinner";
import debounce from "lodash.debounce";

const validationSchema = Yup.object({
  sku: Yup.string()
    .required("SKU is required"),
  name: Yup.string()
    .required("Name is required"),
  price: Yup.number().moreThan(0, "Price must be greater than 0").required("Price is required"),
  weight: Yup.number().moreThan(0, "Weight must be greater than 0").required("Weight is required"),
});

const CreateProduct: FC = () => {
  const { data: session } = useSession();
  const { setSearch } = useSearchPaginationStore();
  const { categories } = useProductCategory(session?.accessToken as string);
  const { createProduct } = useCreateProduct(session?.accessToken as string);
  const [loading, setLoading] = useState(false);
  
  const searchInputRef = useRef<HTMLInputElement>(null);
  const handleFilter = useCallback(
    debounce((value: string) => {
      setSearch(value);
    }, 700), [setSearch]
  );

  const handleSubmit = async (
    values: CreateProductRequest
  ) => {
      try {
        createProduct({creationData: values});
      } catch (error) {
        console.error("An unexpected error occurred:", error);
      } finally {
    }
  };

  const handleDelete = async (
    imageUrl: string, 
    setFieldValue: (field: string, value: any) => void, 
    values: CreateProductRequest
  ) => {
    setLoading(true);
    try {
      setFieldValue("images", values.images.filter((url) => url !== imageUrl));
    } catch (error) {
      console.error(error);
      alert("Failed to delete image.");
    } finally {
      setLoading(false);
    }
  };

  const initialValues: CreateProductRequest = {
    sku: "",
    name: "",
    description: "", 
    price: 0,
    weight: 0, 
    categories: [], 
    images: [], 
  };

  return (
    <div className="container mx-auto px-4 w-full">
      <Breadcrumb className="bg-gray-50 px-5 py-3 dark:bg-gray-800">
        <Breadcrumb.Item><Link href={"/products"}>Products</Link></Breadcrumb.Item>
        <Breadcrumb.Item>Create</Breadcrumb.Item>
      </Breadcrumb>
      <Card className="w-full">
        <Formik<CreateProductRequest>
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue, isSubmitting }) => (
            <Form className="flex w-full">
              <div className="w-1/2 p-4 space-y-4">
                <div>
                  <Label htmlFor="name" className="font-medium">Product Name</Label>
                  <Field as={TextInput} id="name" name="name" placeholder="Enter product name" />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div>
                  <Label htmlFor="sku" className="font-medium">SKU</Label>
                  <Field as={TextInput} id="sku" name="sku" placeholder="Enter product SKU" />
                  <ErrorMessage
                    name="sku"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div>
                  <Label htmlFor="description" className="font-medium">Description</Label>
                  <Field as={Textarea} id="description" name="description" 
                    placeholder="Enter product description" rows={7} />
                  <ErrorMessage
                    name="description"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div>
                  <Label htmlFor="price" className="font-medium">Price</Label>
                  <Field as={TextInput} id="price" name="price" 
                    type="number" placeholder="Enter price" />
                  <ErrorMessage
                    name="price"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div>
                  <Label htmlFor="weight" className="font-medium">Weight</Label>
                  <Field as={TextInput} id="weight" name="weight" 
                    type="number" placeholder="Enter weight in grams" />
                  <ErrorMessage
                    name="weight"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div className="w-full relative">
                  <Label htmlFor="category" className="font-medium">Category</Label>
                  <TextInput id="category" name="category" type="text" placeholder="Enter category"
                    ref={searchInputRef}
                    autoComplete="off" onChange={(e) => {handleFilter(e.target.value)}}/>
                  <div className="absolute right-2 bottom-3">
                    <Dropdown
                      label={<FontAwesomeIcon icon={faSearch} />}
                      inline
                      arrowIcon={false}
                    >
                      {categories && categories.length > 0 ? (
                        categories.map((option, idx) => (
                          <Dropdown.Item
                            key={idx}
                            onClick={() => {
                              if (!values.categories.includes(option.id)) {
                                setFieldValue("categories", [...values.categories, option.id]);
                              }
                              searchInputRef.current!.value = "";
                              setSearch("");
                            }}
                          >
                            {option.name}
                          </Dropdown.Item>
                        ))
                      ) : (
                        <Dropdown.Item disabled>No categories found</Dropdown.Item>
                      )}
                    </Dropdown>
                  </div>
                </div>
                <div className="flex gap-2 mt-2 flex-wrap">
                  {values.categories.map((categoryId, idx) => {
                    const category = categories.find(c => c.id === categoryId);
                    return (
                      category && (
                        <Badge key={idx} color="info" className="relative inline-block pr-5">
                          {category.name}
                          <div
                            className="absolute -top-2 -right-0 px-1 font-bold rounded-lg bg-black cursor-pointer"
                            onClick={() => {
                              setFieldValue(
                                "categories",
                                values.categories.filter(id => id !== categoryId)
                              );
                            }}
                          >
                            <FontAwesomeIcon icon={faMinus} color="red" />
                          </div>
                        </Badge>
                      )
                    );
                  })}
                </div>
              </div>
              <div className="w-1/2 p-4 space-y-4">
                <div>
                  {
                    loading && (
                      <div className="w-full h-full z-10 bg-black bg-opacity-20 flex items-center">
                        <CustomSpinner />
                      </div>
                    )
                  }
                  <Label className="font-medium">Product Gallery</Label>
                  <div className="border-dashed border-2 border-gray-300 rounded-lg p-4 flex flex-col items-center">
                    {values.images.length > 0 ? (
                      <Carousel slide={false}>
                        {values.images.map((src, index) => (
                          <div key={index} className="relative w-full aspect-[9/6]">
                            <Image src={src} alt={`Product ${index + 1}`} layout="fill" objectFit="cover" />
                            <Button
                              onClick={() => handleDelete(src, setFieldValue, values)}
                              className={cn(
                                'absolute top-2 right-16', 
                                'bg-white bg-opacity-50 w-10 h-10 rounded-full', 
                                'flex items-center justify-center hover:bg-opacity-80 transition'
                              )}
                            >
                              <FontAwesomeIcon icon={faTrash} color="red" />
                            </Button>
                          </div>
                        ))}
                      </Carousel>
                    ) : (
                      <div className="relative w-full aspect-[9/6] flex items-center justify-center border-2 border-dashed border-gray-300 text-gray-500">
                        No images available
                      </div>
                    )}
                    <br/>
                    <MultipleImageUploader
                      setFieldValue={setFieldValue}
                      urlImages={values.images}
                      loading={loading}
                      setLoading={setLoading} />
                  </div>
                </div>
                <Button gradientDuoTone="purpleToPink" className="w-full mt-5"
                  disabled={isSubmitting} type="submit">
                  Create Product
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Card>
    </div>
  );
};

export default CreateProduct;
