import { FC, useState } from 'react'
import { ErrorMessage, Form, Formik, Field } from "formik";
import * as Yup from "yup";
import { CreateCategoryRequest, UpdateCategoryRequest } from "@/types/category";
import { useSidebarAdminStore } from "@/store/useSidebarAdminStore";
import ConfirmationModal from "@/components/ConfirmationModal";
import useCreateCategory from "@/hooks/category/useCreateCategory";
import useUpdateCategory from "@/hooks/category/useUpdateCategory";
import useDeleteCategory from '@/hooks/category/useDeleteCategory';
import { useSession } from "next-auth/react";
import { 
  Button, TextInput, 
  Label, Modal, Textarea, 
} from "flowbite-react";

const validationSchema = Yup.object({
  name: Yup.string()
    .required("Name is required"),
});

const Category: FC = () => {
  const { data: session } = useSession();
  const [openModalConfirmation, setOpenModalConfirmation] = useState<boolean>(false);
  const { 
    isModalCategoryOpen, setIsModalCategoryOpen, modalCategoryType, 
    category, isDeletingCategory, setIsDeletingCategory, 
  } = useSidebarAdminStore();
  const { createCategory } = useCreateCategory(session?.accessToken as string);
  const { updateCategory } = useUpdateCategory(session?.accessToken as string);
  const { deleteCategory } = useDeleteCategory(session?.accessToken as string);

  const handleSubmit = async (
    values: CreateCategoryRequest | UpdateCategoryRequest
  ) => {
      try {
        if(modalCategoryType === "create") {
          createCategory({creationData: values as CreateCategoryRequest});
        } else if(modalCategoryType === "update") {
          updateCategory({
            id: category.id.toString(), updateData: values as UpdateCategoryRequest
          });
        }
      } catch (error) {
        console.error("An unexpected error occurred:", error);
      }
  };

  const handleDeleteCategory = async () => {
    try {
      deleteCategory({ id: category.id.toString() })
    } catch (error) {
      console.error("An unexpected error occurred:", error);
    }
  };

  return (
    <>
      <Modal show={isModalCategoryOpen} onClose={() => setIsModalCategoryOpen(false)}>
        <Formik<CreateCategoryRequest | UpdateCategoryRequest>
          initialValues={modalCategoryType == "update" ? category : { name: "" }}
          validationSchema={validationSchema}
          onSubmit={()=>{
            setOpenModalConfirmation(true);
          }}
        >
          {({ setSubmitting, isSubmitting, values }) => (
            <Form className="flex flex-col w-full">
              <Modal.Header>
                <span className="capitalize">{modalCategoryType}</span>
                &nbsp;Category
              </Modal.Header>
              <Modal.Body>
                <div>
                  <Label htmlFor="name" className="font-medium">Category Name</Label>
                  <Field as={TextInput} id="name" name="name" placeholder="Enter category name" />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div>
                  <Label htmlFor="description" className="font-medium">Description</Label>
                  <Textarea id="description" name="description" 
                    placeholder="Enter category description" rows={3} />
                </div>
              </Modal.Body>
              <Modal.Footer className="flex justify-between bg-ghost-white">
                <Button color="gray" onClick={() => {
                  setIsModalCategoryOpen(false);
                }} disabled={isSubmitting}>Cancel</Button>
                <Button color="blue" disabled={isSubmitting} type="submit">
                  <span className="capitalize">{modalCategoryType}</span>
                </Button>
              </Modal.Footer>

              <ConfirmationModal 
                isOpen={openModalConfirmation}
                onClose={()=>{
                  setSubmitting(false);
                  setOpenModalConfirmation(false);
                }}
                onConfirm={()=>{
                  handleSubmit(values);
                  setOpenModalConfirmation(false);
                }}
              />
            </Form>
          )}
        </Formik>
      </Modal>
      <ConfirmationModal 
        title='Category Deletion Confirmation'
        message={
          `Are you sure you want to delete '${category.name}'?. `
          + `This action can't be undone.`
        }
        isOpen={isDeletingCategory}
        onClose={()=>{
          setIsDeletingCategory(false);
        }}
        onConfirm={handleDeleteCategory}
      />
    </>
  )
}

export default Category;