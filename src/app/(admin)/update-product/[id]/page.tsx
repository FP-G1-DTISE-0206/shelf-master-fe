"use client"
import Link from "next/link";
import { useState, useCallback, useRef } from "react";
import { cn } from "@/utils";
import { 
  Card, TextInput, Textarea, Button, Badge, Carousel, 
  Breadcrumb, Label, Dropdown, 
} from "flowbite-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faSearch, faTrash } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { ErrorMessage, Form, Formik, Field } from "formik";
import { UpdateProductRequest } from "@/types/product";
import useProductCategory from "@/hooks/category/useProductCategory";
import useUpdateProduct from "@/hooks/product/useUpdateProduct";
import useDeleteProduct from "@/hooks/product/useDeleteProduct";
import useProductDetail from "@/hooks/product/useProductDetail";
import { useSession } from "next-auth/react";
import * as Yup from "yup";
import { useParams } from "next/navigation";
import CustomSpinner from "@/components/CustomSpinner";
import { useSearchPaginationStore } from "@/store/useSearchPaginationStore";
import ConfirmationModal from "@/components/ConfirmationModal";
import MultipleImageUploader from "../../products/components/MultipleImageUploader";
import debounce from "lodash.debounce";

const validationSchema = Yup.object({
  sku: Yup.string()
    .required("SKU is required"),
  name: Yup.string()
    .required("Name is required"),
  price: Yup.number().moreThan(0, "Price must be greater than 0").required("Price is required"),
  weight: Yup.number().moreThan(0, "Weight must be greater than 0").required("Weight is required"), 
});

const UpdateProduct = () => {
  const [openModalConfirmation, setOpenModalConfirmation] = useState<boolean>(false);
  const [transactionType, setTransactionType] = useState<string>("");
  const { id }: { id: string } = useParams() ?? { id: "" };
  const { data: session } = useSession();
  const { setSearch } = useSearchPaginationStore();
  const accessToken = session?.accessToken ?? "";
  const { categories } = useProductCategory(accessToken);
  const { 
    product, isLoading, errorProductDetail, 
  } = useProductDetail(accessToken, id);
  const { updateProduct } = useUpdateProduct(accessToken);
  const { deleteProduct } = useDeleteProduct(accessToken);
  const [loading, setLoading] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleFilter = useCallback(
    debounce((value: string) => {
      setSearch(value);
    }, 700), [setSearch]
  );

  if (errorProductDetail) return <div>Error: {errorProductDetail.message}</div>;
  if (isLoading) return <div><CustomSpinner /></div>;
  if (!product) return <div>No such product</div>;

  const initialValues: UpdateProductRequest = {
    id: product.id,
    sku: product.sku,
    name: product.name,
    description: product.description, 
    price: product.price,
    weight: product.weight, 
    categories: product.categories.map(category => category.id), 
    images: product.images.map(image => image.imageUrl) ?? [], 
  };

  const handleSubmit = async (values: UpdateProductRequest) => {
    try {
      updateProduct({ id, updateData: values });
    } catch (error) {
      console.error("An unexpected error occurred:", error);
    }
  };

  const handleDelete = async () => {
    try {
      deleteProduct({ id });
    } catch (error) {
      console.error("An unexpected error occurred:", error);
    }
  };

  const handleConfirmation = (value: UpdateProductRequest, setSubmitting: (type: boolean) => void) => {
    if (transactionType === "update") {
      handleSubmit(value);
    } else if (transactionType === "delete") {
      handleDelete();
    } else {
      console.error("Unknown transaction type");
    }
    setTransactionType("");
    setOpenModalConfirmation(false);
    setSubmitting(false)
  };

  const handleDeleteImage = async (
      imageUrl: string, 
      setFieldValue: (field: string, value: any) => void, 
      values: UpdateProductRequest
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

  return (
    <div className="container mx-auto px-4 w-full">
      <Breadcrumb className="bg-gray-50 px-5 py-3 dark:bg-gray-800">
        <Breadcrumb.Item><Link href={"/products"}>Products</Link></Breadcrumb.Item>
        <Breadcrumb.Item>Update</Breadcrumb.Item>
      </Breadcrumb>
      <Card className="w-full">
        <Formik<UpdateProductRequest>
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={() => {
            setTransactionType("update");
            setOpenModalConfirmation(true);
          }}
        >
          {({ values, setFieldValue, isSubmitting, setSubmitting }) => (
            <Form className="flex w-full">
              <div className="w-1/2 p-4 space-y-4">
                <div>
                  <Label htmlFor="name" className="font-medium">Product Name</Label>
                  <Field as={TextInput} id="name" name="name" placeholder="Enter product name" />
                  <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
                </div>
                <div>
                  <Label htmlFor="sku" className="font-medium">SKU</Label>
                  <Field as={TextInput} id="sku" name="sku" placeholder="Enter product SKU" />
                  <ErrorMessage name="sku" component="div" className="text-red-500 text-sm" />
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
                  <TextInput id="category" name="category" type="text" autoComplete="off"
                    ref={searchInputRef} 
                    placeholder="Enter category" onChange={(e) => handleFilter(e.target.value)} />
                  <div className="absolute right-2 bottom-3">
                    <Dropdown label={<FontAwesomeIcon icon={faSearch} />} inline arrowIcon={false}>
                      {categories?.length > 0 ? categories.map((option, idx) => (
                        <Dropdown.Item key={idx} onClick={() => {
                          if (!values.categories.includes(option.id)) {
                            setFieldValue("categories", [...values.categories, option.id]);
                          }
                          searchInputRef.current!.value = "";
                          setSearch("");
                        }}>
                          {option.name}
                        </Dropdown.Item>
                      )) : <Dropdown.Item disabled>No categories found</Dropdown.Item>}
                    </Dropdown>
                  </div>
                </div>
                <div className="flex gap-2 mt-2 flex-wrap">
                  {values.categories.map((categoryId, idx) => {
                    const category = categories.find(c => c.id === categoryId);
                    return category && (
                      <Badge key={idx} color="info" className="relative inline-block pr-5">
                        {category.name}
                        <div className="absolute -top-2 -right-0 px-1 font-bold rounded-lg bg-black cursor-pointer"
                          onClick={() => setFieldValue("categories", values.categories.filter(id => id !== categoryId))}
                        >
                          <FontAwesomeIcon icon={faMinus} color="red" />
                        </div>
                      </Badge>
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
                              onClick={() => handleDeleteImage(src, setFieldValue, values)}
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
                <div className="w-full px-14 flex gap-5">
                  <Button color="failure" className="w-1/2 mt-5" onClick={() => {
                    setTransactionType("delete");
                    setOpenModalConfirmation(true);
                  }} disabled={isSubmitting}>Delete</Button>
                  <Button color="blue" className="w-1/2 mt-5" disabled={isSubmitting} type="submit">Update</Button>
                </div>
              </div>
              
              <ConfirmationModal 
                title="Confirmation changes"
                message="Are you sure you want to proceed with this action?"
                onClose={() => {
                  setOpenModalConfirmation(false);
                  setSubmitting(false);
                }}
                onConfirm={()=>{handleConfirmation(values, setSubmitting)}}
                isOpen={openModalConfirmation}
              />
            </Form>
          )}
        </Formik>
      </Card>
    </div>
  );
};

export default UpdateProduct;
