"use client";
import ConfirmationModal from "@/components/ConfirmationModal";
import { useToast } from "@/providers/ToastProvider";
import { Admin } from "@/types/warehouse";
import axios from "axios";
import { Button, Modal, Spinner } from "flowbite-react";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { useSession } from "next-auth/react";
import { FC, useState } from "react";
import * as Yup from "yup";
interface ChangePasswordModalProps {
  isChangePasswordModalOpen: boolean;
  setIsChangePasswordModalOpen: (value: boolean) => void;
  refetch: () => void;
  admin: Admin;
}
interface ChangePasswordFormProps {
  confirmPassword: string;
  password: string;
}

const ValidationSchema = Yup.object().shape({
  password: Yup.string()
    .min(2, "Too Short!")
    .max(200, "Too Long!")
    .required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "Passwords must match")
    .required("Required"),
});
const ChangePasswordModal: FC<ChangePasswordModalProps> = ({
  isChangePasswordModalOpen,
  setIsChangePasswordModalOpen,
  refetch,
  admin,
}) => {
  const { data: session } = useSession();
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  const { showToast } = useToast();
  const handleSubmit = async (
    values: ChangePasswordFormProps,
    formikHelpers: FormikHelpers<ChangePasswordFormProps>
  ) => {
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/change-password/${admin.id}`,
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
      setIsChangePasswordModalOpen(false);
      refetch();
    }
  };
  return (
    <Modal
      show={isChangePasswordModalOpen}
      onClose={() => setIsChangePasswordModalOpen(false)}
    >
      <Formik
        initialValues={{
          password: "",
          confirmPassword: "",
        }}
        validationSchema={ValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, handleSubmit, errors }) => (
          <Form>
            <Modal.Header>Change password</Modal.Header>
            <Modal.Body>
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-2 justify-center items-center text-center">
                  <div className="w-full">
                    <label
                      className="block text-sm font-bold mb-2"
                      htmlFor="password"
                    >
                      Password
                    </label>
                    <Field
                      name="password"
                      type="password"
                      placeholder="Password"
                      className="shadow appearance-none rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none w-full"
                      required
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div className="w-full">
                    <label
                      className="block text-sm font-bold mb-2"
                      htmlFor="confirmPassword"
                    >
                      Confirm Password
                    </label>
                    <Field
                      name="confirmPassword"
                      type="password"
                      placeholder="Confirm Password"
                      className="shadow appearance-none rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none w-full"
                      required
                    />
                    <ErrorMessage
                      name="confirmPassword"
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
                onClick={() => setIsChangePasswordModalOpen(false)}
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
export default ChangePasswordModal;
