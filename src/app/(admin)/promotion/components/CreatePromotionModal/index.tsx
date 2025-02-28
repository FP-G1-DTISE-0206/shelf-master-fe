"use client";
import ConfirmationModal from "@/components/ConfirmationModal";
import { useToast } from "@/providers/ToastProvider";
import axios from "axios";
import { Button, Modal, Spinner } from "flowbite-react";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { useSession } from "next-auth/react";
import { FC, useState } from "react";
import * as Yup from "yup";
import ImageUploader from "../ImageUploader";

interface CreatePromotionModalProps {
  openModalCreatePromotion: boolean;
  setOpenModalCreatePromotion: (value: boolean) => void;
  refetch: () => void;
}
interface CreatePromotionFormProps {
  title: string;
  description: string;
  imageUrl: string;
  productUrl: string;
}

const ValidationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  imageUrl: Yup.string().required("Image is required"),
});
const CreatePromotionModal: FC<CreatePromotionModalProps> = ({
  openModalCreatePromotion,
  setOpenModalCreatePromotion,
  refetch,
}) => {
  const { data: session } = useSession();
  const { showToast } = useToast();
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (
    values: CreatePromotionFormProps,
    formikHelpers: FormikHelpers<CreatePromotionFormProps>
  ) => {
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/promotion`,
        {
          ...values,
        },
        {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        }
      );
      if (data.success) {
        formikHelpers.resetForm();
        showToast(data.message, "success");
      } else {
        showToast(data.message, "error");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        showToast(error.response?.data.message, "error");
      } else {
        showToast("An unexpected error occurred. Please try again.", "error");
      }
    } finally {
      setOpenModalCreatePromotion(false);
      refetch();
    }
  };
  return (
    <Modal
      show={openModalCreatePromotion}
      onClose={() => setOpenModalCreatePromotion(false)}
    >
      <Formik
        initialValues={{
          title: "",
          description: "",
          imageUrl: "",
          productUrl: "",
        }}
        validationSchema={ValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, handleSubmit, errors, setValues, values }) => (
          <Form>
            <Modal.Header>Create new promotion</Modal.Header>
            <Modal.Body>
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-2 justify-center items-center text-center">
                  <div className="w-full">
                    <label
                      className="block text-sm font-bold mb-2"
                      htmlFor="title"
                    >
                      Title
                    </label>
                    <Field
                      name="title"
                      type="text"
                      placeholder="Title"
                      className="shadow appearance-none rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none w-full"
                      required
                    />
                    <ErrorMessage
                      name="title"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div className="w-full">
                    <label
                      className="block text-sm font-bold mb-2"
                      htmlFor="description"
                    >
                      Description
                    </label>
                    <Field
                      as="textarea"
                      name="description"
                      placeholder="Description"
                      className="shadow appearance-none rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none w-full"
                      rows={3}
                    />
                    <ErrorMessage
                      name="description"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div className="w-full">
                    <Field
                      name="imageUrl"
                      component={ImageUploader}
                      values={values}
                      setValues={setValues}
                      loading={loading}
                      setLoading={setLoading}
                    />
                  </div>
                  <div className="w-full">
                    <label
                      className="block text-sm font-bold mb-2"
                      htmlFor="productUrl"
                    >
                      Product Url
                    </label>
                    <Field
                      name="productUrl"
                      type="text"
                      placeholder="Product Url"
                      className="shadow appearance-none rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none w-full"
                      required
                    />
                    <ErrorMessage
                      name="productUrl"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer className="flex justify-between">
              <Button
                color="light"
                className="rounded-lg border"
                onClick={() => setOpenModalCreatePromotion(false)}
              >
                Decline
              </Button>
              <Button
                color="warning"
                className="rounded-lg flex gap-2 items-center"
                onClick={() => setOpenConfirmationModal(true)}
                disabled={isSubmitting || Object.keys(errors).length > 0}
              >
                Accept{isSubmitting && <Spinner color="warning" />}
              </Button>
            </Modal.Footer>
            <ConfirmationModal
              isOpen={openConfirmationModal}
              onClose={() => setOpenConfirmationModal(false)}
              onConfirm={() => {
                handleSubmit();
                setOpenConfirmationModal(false);
              }}
            />
          </Form>
        )}
      </Formik>
    </Modal>
  );
};
export default CreatePromotionModal;
