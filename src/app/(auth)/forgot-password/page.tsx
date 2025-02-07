"use client";
import { useToast } from "@/providers/ToastProvider";
import axios from "axios";
import { Spinner } from "flowbite-react";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC } from "react";
import * as Yup from "yup";
type ForgotPasswordFormValues = {
  email: string;
};
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
});

const ForgotPasswordPage: FC = () => {
  const { showToast } = useToast();
  const router = useRouter();
  const handleSubmit = async (
    values: ForgotPasswordFormValues,
    formikHelpers: FormikHelpers<ForgotPasswordFormValues>
  ) => {
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/forgot-password`,
        values
      );
      if (data.success) {
        showToast(data.message, "success");
        formikHelpers.resetForm();
        router.push("/login");
      } else {
        showToast(data.message, "error");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        showToast(error.response?.data.message, "error");
      } else {
        showToast("An unexpected error occurred. Please try again.", "error");
      }
    }
  };
  return (
    <>
      <h2 className="text-3xl font-bold text-center mb-6">Forgot Password</h2>
      <p className="text-center text-gray-600 mb-4">
        Enter your email to receive a password reset link.
      </p>
      <Formik<ForgotPasswordFormValues>
        initialValues={{
          email: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            <div>
              <label className="block text-gray-700">Email</label>
              <Field
                type="email"
                name="email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-shelf-black text-white py-2 rounded-lg hover:bg-shelf-orange"
              disabled={isSubmitting}
            >
              Send Reset Link
            </button>
            {isSubmitting && <Spinner className="w-full" color="warning" />}
            <p className="text-center text-gray-600 mt-4">
              Remembered your password?{" "}
              <Link href="/login" className="text-shelf-orange hover:underline">
                Login
              </Link>
            </p>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default ForgotPasswordPage;
