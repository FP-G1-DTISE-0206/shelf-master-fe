"use client"
import Link from "next/link";
import { useState } from "react";
import { 
  Card, TextInput, Textarea, FileInput, Button, Badge, Carousel, 
  Breadcrumb, Label, Dropdown, Modal, 
} from "flowbite-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faSearch } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { ErrorMessage, Form, Formik, Field } from "formik";
import { UpdateProductRequest } from "@/types/product";
import useAdminProductCategory from "@/hooks/useAdminProductCategory";
import useUpdateProduct from "@/hooks/useUpdateProduct";
import useDeleteProduct from "@/hooks/useDeleteProduct";
import useAdminProductDetail from "@/hooks/useAdminProductDetail";
import { useSession } from "next-auth/react";
import * as Yup from "yup";
import { useParams } from "next/navigation";
import CustomSpinner from "@/components/CustomSpinner";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  price: Yup.number().moreThan(0).required("Price is required"),
});

const UpdateProduct = () => {
  const [openModalConfirmation, setOpenModalConfirmation] = useState<boolean>(false);
  const [transactionType, setTransactionType] = useState<string>("");
  const { id }: { id: string } = useParams();
  const { data: session } = useSession();
  const { categories } = useAdminProductCategory(session?.accessToken as string);
  const { 
    product, isLoading, errorProductDetail, refetch,
  } = useAdminProductDetail(session?.accessToken as string, id);
  const [query, setQuery] = useState("");
  const { updateProduct } = useUpdateProduct(session?.accessToken as string);
  const { deleteProduct } = useDeleteProduct(session?.accessToken as string);

  if (errorProductDetail) return <div>Error: {errorProductDetail.message}</div>;
  if (isLoading) return <div><CustomSpinner /></div>;
  if (!product) return <div>No such product</div>;

  const initialValues: UpdateProductRequest = {
    id: product.id,
    name: product.name,
    price: product.price,
    categories: product.categories.map(category => category.id),
  };

  const handleSubmit = async (values: UpdateProductRequest) => {
    try {
      updateProduct({ id, updateData: values });
      refetch();
    } catch (error) {
      console.error("An unexpected error occurred:", error);
    }
  };

  const handleDelete = async () => {
    try {
      deleteProduct({ id });
      refetch();
    } catch (error) {
      console.error("An unexpected error occurred:", error);
    }
  };

  const handleConfirmation = () => {
    if (transactionType === "update") {
      handleSubmit(initialValues);
    } else if (transactionType === "delete") {
      handleDelete();
    } else {
      console.error("Unknown transaction type");
    }
    setTransactionType("");
    setOpenModalConfirmation(false);
  };

  return (
    <div className="container mx-auto px-4 w-full">
      <Breadcrumb className="bg-gray-50 px-5 py-3 dark:bg-gray-800">
        <Breadcrumb.Item><Link href={"/products"}>Products</Link></Breadcrumb.Item>
        <Breadcrumb.Item>Detail</Breadcrumb.Item>
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
                  <Label htmlFor="description" className="font-medium">Description</Label>
                  <Textarea id="description" name="description" placeholder="Enter product description" rows={3} />
                </div>
                <div>
                  <Label htmlFor="sku" className="font-medium">SKU</Label>
                  <TextInput id="sku" name="sku" placeholder="Enter SKU" />
                </div>
                <div>
                  <Label htmlFor="price" className="font-medium">Price</Label>
                  <Field as={TextInput} id="price" name="price" type="number" placeholder="Enter regular price" />
                  <ErrorMessage name="price" component="div" className="text-red-500 text-sm" />
                </div>
                <div className="w-full relative">
                  <Label htmlFor="category" className="font-medium">Category</Label>
                  <TextInput id="category" name="category" type="text" placeholder="Enter category" value={query} onChange={(e) => setQuery(e.target.value)} />
                  <div className="absolute right-2 bottom-3">
                    <Dropdown label={<FontAwesomeIcon icon={faSearch} />} inline arrowIcon={false}>
                      {categories?.length > 0 ? categories.map((option, idx) => (
                        <Dropdown.Item key={idx} onClick={() => {
                          if (!values.categories.includes(option.id)) {
                            setFieldValue("categories", [...values.categories, option.id]);
                          }
                          setQuery("");
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
                  <Label className="font-medium">Product Gallery</Label>
                  <div className="border-dashed border-2 border-gray-300 rounded-lg p-4 flex flex-col items-center">
                    <Carousel slide={false}>
                      {["/images/kohceng-senam.jpg", "/images/kohceng-senam.jpg"].map((src, index) => (
                        <div key={index} className="relative w-full aspect-[9/6]">
                          <Image src={src} alt={`Product ${index + 1}`} layout="fill" objectFit="cover" />
                        </div>
                      ))}
                    </Carousel>
                    <FileInput name="images" multiple accept="image/jpeg, image/png" />
                    <p className="text-gray-500 text-sm mt-2">Jpeg, png are allowed. Max 1MB.</p>
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
              
              <Modal show={openModalConfirmation} onClose={() => setOpenModalConfirmation(false)}>
                <Modal.Header>Confirmation changes</Modal.Header>
                <Modal.Body>Are you sure you want to proceed with this action?</Modal.Body>
                <Modal.Footer className="flex justify-between bg-ghost-white">
                  <Button color="failure" onClick={handleConfirmation}>Yes</Button>
                  <Button onClick={() => {
                    setOpenModalConfirmation(false);
                    setSubmitting(false);
                  }}>No</Button>
                </Modal.Footer>
              </Modal>
            </Form>
          )}
        </Formik>
      </Card>
    </div>
  );
};

export default UpdateProduct;
