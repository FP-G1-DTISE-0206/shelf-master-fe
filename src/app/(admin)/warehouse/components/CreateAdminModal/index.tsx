"use client";
import ConfirmationModal from "@/components/ConfirmationModal";
import { useToast } from "@/providers/ToastProvider";
import axios from "axios";
import { Button, Modal, Spinner } from "flowbite-react";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { useSession } from "next-auth/react";
import { FC, useState } from "react";
import * as Yup from "yup";

interface CreateAdminModalProps {
  openModalCreateAdmin: boolean;
  setOpenModalCreateAdmin: (value: boolean) => void;
  refetch: () => void;
}
interface CreateAdminFormProps {
  email: string;
  password: string;
  confirmPassword: string;
  userName: string;
}

const ValidationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(2, "Too Short!")
    .max(200, "Too Long!")
    .required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "Passwords must match")
    .required("Required"),
  userName: Yup.string()
    .min(2, "Too Short!")
    .max(200, "Too Long!")
    .required("Required"),
});
const CreateAdminModal: FC<CreateAdminModalProps> = ({
  openModalCreateAdmin,
  setOpenModalCreateAdmin,
  refetch,
}) => {
  const { data: session } = useSession();
  const { showToast } = useToast();
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  const handleSubmit = async (
    values: CreateAdminFormProps,
    formikHelpers: FormikHelpers<CreateAdminFormProps>
  ) => {
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/register`,
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
      setOpenModalCreateAdmin(false);
      refetch();
    }
  };
  return (
    <Modal
      show={openModalCreateAdmin}
      onClose={() => setOpenModalCreateAdmin(false)}
    >
      <Formik
        initialValues={{
          email: "",
          password: "",
          confirmPassword: "",
          userName: "",
        }}
        validationSchema={ValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, handleSubmit, errors }) => (
          <Form>
            <Modal.Header>Create new admin</Modal.Header>
            <Modal.Body>
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-2 justify-center items-center text-center">
                  <div className="w-full">
                    <label
                      className="block text-sm font-bold mb-2"
                      htmlFor="userName"
                    >
                      Username
                    </label>
                    <Field
                      name="userName"
                      type="text"
                      placeholder="Username"
                      className="shadow appearance-none rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none w-full"
                      required
                    />
                    <ErrorMessage
                      name="userName"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div className="w-full">
                    <label
                      className="block text-sm font-bold mb-2"
                      htmlFor="emai"
                    >
                      email
                    </label>
                    <Field
                      name="email"
                      type="email"
                      placeholder="Email"
                      className="shadow appearance-none rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none w-full"
                      required
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
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
                onClick={() => setOpenModalCreateAdmin(false)}
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
              title="Changes Confirmation"
              message="Are you sure you want to change your username?"
            />
          </Form>
        )}
      </Formik>
    </Modal>
  );
};
export default CreateAdminModal;
