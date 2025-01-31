"use client";
import { useToast } from "@/providers/ToastProvider";
import {
  faFacebook,
  faGoogle,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { Spinner } from "flowbite-react";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC } from "react";
import * as Yup from "yup";
type SignupFormValues = {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
};
const validationSchema = Yup.object({
  userName: Yup.string().required("Full Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(4, "Password must be at least 4 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), ""], "Passwords must match")
    .required("Confirm Password is required"),
});

const RegisterPage: FC = () => {
  const { showToast } = useToast();
  const router = useRouter();
  const handleSubmit = async (
    values: SignupFormValues,
    formikHelpers: FormikHelpers<SignupFormValues>
  ) => {
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`,
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
    <div className="flex items-center justify-center bg-white px-8 max-sm:py-8">
      <div className="w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6">
          Create an Account
        </h2>
        <Formik<SignupFormValues>
          initialValues={{
            userName: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div>
                <label className="block text-gray-700">Full Name</label>
                <Field
                  type="text"
                  name="userName"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your full name"
                />
                <ErrorMessage
                  name="userName"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
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
              <div>
                <label className="block text-gray-700">Password</label>
                <Field
                  type="password"
                  name="password"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Create a password"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-gray-700">Confirm Password</label>
                <Field
                  type="password"
                  name="confirmPassword"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Confirm your password"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-shelf-black text-white py-2 rounded-lg hover:bg-shelf-orange"
                disabled={isSubmitting}
              >
                Sign Up
              </button>
              {isSubmitting && <Spinner className="w-full" color="warning" />}
              <div className="flex items-center my-4">
                <hr className="flex-grow border-t border-gray-300" />
                <span className="mx-4 text-gray-500">OR</span>
                <hr className="flex-grow border-t border-gray-300" />
              </div>
              <div className="space-y-4">
                <button
                  type="button"
                  className="w-full flex items-center justify-center border border-gray-300 py-2 rounded-lg hover:bg-gray-100"
                >
                  <FontAwesomeIcon icon={faGoogle} className="w-6 h-6 mr-2" />
                  Sign Up with Google
                </button>
                <button
                  type="button"
                  className="w-full flex items-center justify-center border border-gray-300 py-2 rounded-lg hover:bg-gray-100"
                >
                  <FontAwesomeIcon icon={faFacebook} className="w-6 h-6 mr-2" />
                  Sign Up with Facebook
                </button>
                <button
                  type="button"
                  className="w-full flex items-center justify-center border border-gray-300 py-2 rounded-lg hover:bg-gray-100"
                >
                  <FontAwesomeIcon icon={faTwitter} className="w-6 h-6 mr-2" />
                  Sign Up with X (Twitter)
                </button>
              </div>
              <p className="text-center text-gray-600 mt-4">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-shelf-orange hover:underline"
                >
                  Login
                </Link>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default RegisterPage;
