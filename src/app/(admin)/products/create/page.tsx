"use client"
import Link from "next/link";
import { useEffect, useState } from "react";
import { 
  Card, 
  TextInput, 
  Textarea, 
  FileInput, 
  Button, 
  Badge, 
  Carousel, 
  Breadcrumb, 
  Label, 
  Dropdown, 
} from "flowbite-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMinus,
  faSearch,  
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { ErrorMessage, Form, Formik, Field, FormikHelpers } from "formik";
import { CreateProductRequest } from "@/types/product";
import useAdminProductCategory from "@/hooks/useAdminProductCategory";
//import { useSearchPaginationStore } from "@/store/useSearchPaginationStore";
import useCreateProduct from "@/hooks/useCreateProduct";
import { useSession } from "next-auth/react";
import * as Yup from "yup";
import { useToast } from "@/providers/ToastProvider";
import { useRouter } from "next/navigation";

const validationSchema = Yup.object({
  name: Yup.string()
    .required("Name is required"),
  price: Yup.number()
    .moreThan(0)
    .required("Price is required"),
});

const CreateProduct = () => {
  const { data: session } = useSession();
  //const { search, setSearch } = useSearchPaginationStore();
  const { categories } = useAdminProductCategory(session?.accessToken as string);
  const [query, setQuery] = useState("");
  const { createProduct, error, isSuccess, data } = useCreateProduct(session?.accessToken as string);
  const { showToast } = useToast();
  const router = useRouter();
  
  const handleSubmit = async (
    values: CreateProductRequest,
    formikHelpers: FormikHelpers<CreateProductRequest>
  ) => {
      try {
        createProduct({creationData: values});
        formikHelpers.resetForm();
      } catch (error) {
        console.error("An unexpected error occurred:", error);
      } finally {
    }
  };

  useEffect(() => {
    if (error) {
      showToast(error.message, "error");
    }

    if (isSuccess) {
      showToast("Product created", "success");
      router.push("/products/detail/" + data?.id );
    }
  }, [error, isSuccess]);

  return (
    <div className="container mx-auto px-4 w-full">
      <Breadcrumb className="bg-gray-50 px-5 py-3 dark:bg-gray-800">
        <Breadcrumb.Item><Link href={"/products"}>Products</Link></Breadcrumb.Item>
        <Breadcrumb.Item>Create</Breadcrumb.Item>
      </Breadcrumb>
      <Card className="w-full">
        <Formik<CreateProductRequest>
          initialValues={{ name: "", price: 0, categories: [] }}
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
                  <Label htmlFor="description" className="font-medium">Description</Label>
                  <Textarea id="description" name="description" 
                    placeholder="Enter product description" rows={3} />
                </div>
                <div>
                  <Label htmlFor="sku" className="font-medium">SKU</Label>
                  <TextInput id="sku" name="sku" placeholder="Enter SKU" />
                </div>
                <div>
                  <Label htmlFor="price" className="font-medium">Price</Label>
                  <Field as={TextInput} id="price" name="price" 
                    type="number" placeholder="Enter regular price" />
                  <ErrorMessage
                    name="price"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div className="w-full relative">
                  <Label htmlFor="category" className="font-medium">Category</Label>
                  <TextInput id="category" name="category" type="text" placeholder="Enter category"
                    value={query} onChange={(e) => {setQuery(e.target.value)}}/>
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
                              setQuery("");
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
                  <Label className="font-medium">Product Gallery</Label>
                  <div className="border-dashed border-2 border-gray-300 rounded-lg p-4 flex flex-col items-center">
                    <Carousel slide={false}>
                      {["/images/kohceng-senam.jpg", "/images/kohceng-senam.jpg"].map((src, index) => (
                        <div key={index} className="relative w-full aspect-[9/6]">
                          <Image src={src} alt={`Product ${index + 1}`} layout="fill" objectFit="cover" />
                        </div>
                      ))}
                    </Carousel>
                    <br/>
                    <FileInput name="images" multiple accept="image/jpeg, image/png" />
                    <p className="text-gray-500 text-sm mt-2">Jpeg, png are allowed. Max 1MB.</p>
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
