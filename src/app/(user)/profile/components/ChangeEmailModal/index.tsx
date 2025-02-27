"use client";
import ConfirmationModal from "@/components/ConfirmationModal";
import { useToast } from "@/providers/ToastProvider";
import axios from "axios";
import { Button, Modal, Spinner } from "flowbite-react";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import * as Yup from "yup";
interface ChangeEmailModalProps {
  openModalEmail: boolean;
  setOpenModalEmail: (value: boolean) => void;
}
interface EmailFormProps {
  newEmail: string;
  password: string;
}
const ChangeUserNameSchema = Yup.object().shape({
  newEmail: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(4, "Password must be at least 4 characters")
    .required("Password is required"),
});
const ChangeEmailModal: FC<ChangeEmailModalProps> = ({
  openModalEmail,
  setOpenModalEmail,
}) => {
  const { data: session } = useSession();
  const [isModalConfirmationOpen, setIsModalConfirmationOpen] = useState(false);
  const { showToast } = useToast();
  const router = useRouter();
  const handleChangeUsername = async (
    values: EmailFormProps,
    formikHelpers: FormikHelpers<EmailFormProps>
  ) => {
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/change-email`,
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
        showToast(data.message, "success");
        await signOut({ redirect: false });
        router.push("/login");
      } else {
        showToast(data.message, "error");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        showToast(error.response?.data.message, "error");
      } else {
        showToast("An unexpected error occurred", "error");
      }
    } finally {
      formikHelpers.resetForm();
      setOpenModalEmail(false);
    }
  };
  //   const handleLogout = async (): Promise<void> => {
  //     if (!session) {
  //       alert("You are not logged in.");
  //       return;
  //     }
  //     try {
  //       const { data } = await axios.post(
  //         `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/logout`,
  //         {
  //           accessToken: session.accessToken,
  //           refreshToken: session.refreshToken,
  //         },
  //         {
  //           headers: {
  //             Authorization: `Bearer ${session.accessToken}`,
  //             "Content-Type": "application/json",
  //           },
  //         }
  //       );
  //       if (data.success) {
  //         showToast(data.message, "success");
  //       } else {
  //         showToast(data.message, "error");
  //       }
  //     } catch (error) {
  //       if (axios.isAxiosError(error)) {
  //         showToast(
  //           error.response?.data.message || "Error during logout.",
  //           "error"
  //         );
  //       } else {
  //         showToast("An unexpected error occurred. Please try again.", "error");
  //       }
  //     } finally {
  //       await signOut({ redirect: false });
  //       router.push("/login");
  //     }
  //   };
  return (
    <>
      <Modal show={openModalEmail} onClose={() => setOpenModalEmail(false)}>
        <Formik
          initialValues={{
            newEmail: "",
            password: "",
          }}
          validationSchema={ChangeUserNameSchema}
          onSubmit={handleChangeUsername}
        >
          {({ isSubmitting, handleSubmit, errors }) => (
            <Form>
              <Modal.Header>Change Username</Modal.Header>
              <Modal.Body>
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col gap-2 justify-center items-center text-center">
                    <div className="w-full">
                      <label
                        className="block text-sm font-bold mb-2"
                        htmlFor="newEmail"
                      >
                        Email
                      </label>
                      <Field
                        name="newEmail"
                        type="text"
                        placeholder="New Email"
                        className="shadow appearance-none rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none w-full"
                        required
                      />
                      <ErrorMessage
                        name="newEmail"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                    <div className="w-full">
                      <label
                        className="block text-sm font-bold mb-2"
                        htmlFor="newEmail"
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
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer className="flex justify-between">
                <Button
                  color="light"
                  className="rounded-lg border"
                  onClick={() => setOpenModalEmail(false)}
                >
                  Decline
                </Button>
                <Button
                  color="warning"
                  className="rounded-lg flex gap-2 items-center"
                  onClick={() => setIsModalConfirmationOpen(true)}
                  disabled={isSubmitting || Object.keys(errors).length > 0}
                >
                  Accept{isSubmitting && <Spinner color="warning" />}
                </Button>
              </Modal.Footer>
              <ConfirmationModal
                isOpen={isModalConfirmationOpen}
                onClose={() => setIsModalConfirmationOpen(false)}
                onConfirm={() => {
                  handleSubmit();
                  setIsModalConfirmationOpen(false);
                }}
                title="Changes Confirmation"
                message="Your session will end, and you must verify your new email before logging in again. Your password and username will be reset, but your purchase history will remain. Check your email for the verification link. If the link expires, you can re-register using the same email. Are you sure you want to proceed?"
              />
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  );
};
export default ChangeEmailModal;
