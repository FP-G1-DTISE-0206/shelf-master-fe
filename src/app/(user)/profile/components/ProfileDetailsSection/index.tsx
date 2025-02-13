"use client";
import ConfirmationModal from "@/components/ConfirmationModal";
import { useToast } from "@/providers/ToastProvider";
import { ProfileResponse } from "@/types/profile";
import axios from "axios";
import { Button, Modal, Spinner } from "flowbite-react";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { useSession } from "next-auth/react";
import { FC, useState } from "react";
import * as Yup from "yup";
interface ProfileDetailSectionProps {
  profile: ProfileResponse;
  refetch: () => void;
}
interface UserNameFormProps {
  userName: string;
}
const ChangeUserNameSchema = Yup.object().shape({
  userName: Yup.string()
    .required("Username is required")
    .min(4, "Username must be at least 4 characters")
    .max(50, "Username must be 50 characters or less"),
});
const ProfileDetailsSection: FC<ProfileDetailSectionProps> = ({
  profile,
  refetch,
}) => {
  const { data: session } = useSession();
  const [openModalUserName, setOpenModalUserName] = useState(false);
  const [isModalConfirmationOpen, setIsModalConfirmationOpen] = useState(false);
  const { showToast } = useToast();
  const handleChangeUserName = async (
    values: UserNameFormProps,
    formikHelpers: FormikHelpers<UserNameFormProps>
  ) => {
    try {
      const { data } = await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user`,
        {
          ...profile,
          userName: values.userName,
        },
        {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        }
      );
      if (data.success) {
        showToast(data.message, "success");
        setOpenModalUserName(false);
        profile.userName = values.userName;
      } else {
        showToast(data.message, "error");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        formikHelpers.setErrors({ userName: error.response?.data.message });
      } else {
        formikHelpers.setErrors({
          userName: "An unexpected error occurred",
        });
      }
    } finally {
      refetch();
    }
  };
  return (
    <>
      <div className="flex gap-5 text-wrap">
        <div>
          <div className="text-lg font-medium">Name</div>
          <div className="text-lg font-medium">Email</div>
        </div>
        <div>
          <div className="text-lg font-normal flex gap-2">
            {profile?.userName}
            <span
              className="text-xs text-shelf-orange font-normal hover:cursor-pointer"
              onClick={() => setOpenModalUserName(true)}
            >
              Edit
            </span>
          </div>
          <div className="text-lg font-normal flex gap-2">
            {profile?.email}
            <span className="text-xs text-shelf-orange font-normal">
              Change
            </span>
          </div>
        </div>
      </div>
      <Modal
        show={openModalUserName}
        onClose={() => setOpenModalUserName(false)}
      >
        <Formik
          initialValues={{
            userName: profile?.userName,
          }}
          validationSchema={ChangeUserNameSchema}
          onSubmit={handleChangeUserName}
        >
          {({ isSubmitting, handleSubmit }) => (
            <Form>
              <Modal.Header>Change Username</Modal.Header>
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
                        placeholder="Your Username"
                        className="shadow appearance-none rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none w-full"
                        required
                      />
                      <ErrorMessage
                        name="userName"
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
                  onClick={() => setOpenModalUserName(false)}
                >
                  Decline
                </Button>
                <Button
                  color="warning"
                  className="rounded-lg flex gap-2 items-center"
                  onClick={() => setIsModalConfirmationOpen(true)}
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
                message="Are you sure you want to change your username?"
              />
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  );
};
export default ProfileDetailsSection;
