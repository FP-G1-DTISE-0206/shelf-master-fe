"use client"
import Link from "next/link";
import { useState, FC, } from "react";
import { cn } from "@/utils";
import { 
  Card, TextInput, Textarea, Badge, Carousel, Breadcrumb, Label, 
} from "flowbite-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMinus, faTrash, 
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { ErrorMessage, Form, Formik, Field } from "formik";
import { CreateProductRequest } from "@/types/product";
import useCreateProduct from "@/hooks/product/useCreateProduct";
import { useSession } from "next-auth/react";
import * as Yup from "yup";
import MultipleImageUploader from "../products/components/MultipleImageUploader";
import CustomSpinner from "@/components/CustomSpinner";
import CategorySearchField from "../components/CategorySearchField";
import { CategoryResponse } from "@/types/category";

const validationSchema = Yup.object({
  sku: Yup.string()
    .required("SKU is required"),
  name: Yup.string()
    .required("Name is required"),
  price: Yup.number().moreThan(0, "Price must be greater than 0").required("Price is required"),
  weight: Yup.number().moreThan(0, "Weight must be greater than 0").required("Weight is required"),
  images: Yup.array()
    .of(Yup.string().url("Each image must be a valid URL"))
    .min(1, "At least one image is required")
});

const CreateProduct: FC = () => {
  const { data: session } = useSession();
  const { createProduct } = useCreateProduct(session?.accessToken as string);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<CategoryResponse[]>([])

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
    setFieldValue: (field: string, value: string[]) => void, 
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
      <Breadcrumb className="px-5 py-3">
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
            <Form className="flex flex-col md:flex-row w-full">
              <div className="w-full md:w-1/2 p-4 space-y-4">
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
                  <Label htmlFor="weight" className="font-medium">Weight{"(grams)"}</Label>
                  <Field as={TextInput} id="weight" name="weight" 
                    type="number" placeholder="Enter weight in grams" />
                  <ErrorMessage
                    name="weight"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div className="w-full relative">
                  <Label htmlFor="categories" className="font-medium">Category</Label>
                  <Field component={CategorySearchField} id="categories" name="categories" 
                    session={session} type="text" placeholder="Search category" 
                    selectedCategories={categories} setSelectedCategories={setCategories} />
                </div>
                <div className="flex gap-2 mt-2 flex-wrap">
                  {categories?.map((category) => {
                    return (
                      category && (
                        <Badge key={category.id} color="info" className="relative inline-block pr-5">
                          {category.name}
                          <div
                            className="absolute -top-2 -right-0 px-1 font-bold rounded-lg bg-black cursor-pointer"
                            onClick={() => {
                              setCategories(categories.filter((c) => c.id !== category.id))
                              setFieldValue( "categories", categories);
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
              <div className="w-full md:w-1/2 p-4 space-y-4">
                <div>
                  <Label className="font-medium">Product Gallery</Label>
                  <div className="border-dashed relative border-2 border-gray-300 rounded-lg p-4 flex flex-col items-center">
                    {values.images.length > 0 ? (
                      <Carousel slide={false}>
                        {values.images.map((src, index) => (
                          <div key={index} className="relative w-full aspect-[9/6]">
                            <Image src={src} alt={`Product ${index + 1}`} layout="fill" objectFit="cover" />
                            <button title="delete image" type="button" 
                              onClick={() => handleDelete(src, setFieldValue, values)}
                              className={cn(
                                'absolute top-2 right-16', 
                                'bg-white bg-opacity-50 w-10 h-10 rounded-full', 
                                'flex items-center justify-center hover:bg-opacity-80 transition'
                              )}
                            >
                              <FontAwesomeIcon icon={faTrash} color="red" />
                            </button>
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
                    {
                      loading && (
                        <div className="w-full h-full absolute top-0 z-10 bg-black bg-opacity-20 flex items-center">
                          <CustomSpinner />
                        </div>
                      )
                    }
                  </div>
                  <ErrorMessage
                    name="images"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div className="w-full flex justify-end">
                  <button
                    type="submit"
                    className="bg-shelf-blue text-white py-2 px-5 rounded-lg w-max"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Creating Product..." : "Create Product"}
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </Card>
    </div>
  );
};

export default CreateProduct;
