"use client";
import CustomSpinner from "@/components/CustomSpinner";
import { useToast } from "@/providers/ToastProvider";
import axios from "axios";
import { Spinner } from "flowbite-react";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FC, useEffect, useState } from "react";
import * as Yup from "yup";
type SetupAccountFormValues = {
  userName: string;
  password: string;
  confirmPassword: string;
};
const validationSchema = Yup.object({
  userName: Yup.string().required("Full Name is required"),
  password: Yup.string()
    .min(4, "Password must be at least 4 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), ""], "Passwords must match")
    .required("Confirm Password is required"),
});
const SetupAccountPage: FC = () => {
  const { showToast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const paramToken = searchParams.get("token");
  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleSubmit = async (
    values: SetupAccountFormValues,
    formikHelpers: FormikHelpers<SetupAccountFormValues>
  ) => {
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/setup-account`,
        {
          ...values,
          token: paramToken,
        }
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
  useEffect(() => {
    const setupPassword = async () => {
      if (paramToken) {
        try {
          const { data } = await axios.get(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/verify`,
            {
              params: { token: paramToken }, // Pass paramToken as a query parameter
            }
          );
          if (data.success) {
            showToast(data.message, "success");
            setIsValid(true);
          } else {
            showToast(data.message, "error");
          }
        } catch (error) {
          if (axios.isAxiosError(error)) {
            showToast(error.response?.data.message, "error");
          } else {
            showToast(
              "An unexpected error occurred. Please try again.",
              "error"
            );
          }
        } finally {
          setIsLoading(false);
        }
      }
    };

    setupPassword();
  }, [paramToken]);
  return (
    <div className="flex items-center justify-center bg-white px-8 max-sm:py-8">
      <div className="w-full max-w-md">
        <Link href="/">
          <Image
            className="rounded-md w-full object-cover"
            src="/images/shelfmaster-medium.jpeg"
            width={1000}
            height={500}
            alt="User Profile"
          />
        </Link>
        {isLoading && paramToken && (
          <div className="bg-white shadow-lg rounded-xl p-6 text-center border border-shelf-orange flex flex-col gap-4">
            <h2 className="text-xl font-semibold text-shelf-orange">
              Checking token...
            </h2>
            <CustomSpinner />
          </div>
        )}
        {!paramToken && (
          <div className="bg-white shadow-lg rounded-xl p-6 text-center border border-red-500">
            <h2 className="text-xl font-semibold text-red-600">
              Token not found.
            </h2>
          </div>
        )}
        {!isValid && paramToken && !isLoading && (
          <>
            <div className="bg-white shadow-lg rounded-xl p-6 text-center border border-red-500">
              <h2 className="text-xl font-semibold text-red-600">
                Link is Invalid or Expired
              </h2>
              <p className="text-gray-600 mt-2">
                Please request a new link by signing up with the same email.
              </p>
              <Link href="/register" className="text-shelf-orange">
                Sign Up
              </Link>
            </div>
          </>
        )}
        {isValid && !isLoading && paramToken && (
          <>
            <h2 className="text-3xl font-bold text-center mb-6">
              Set your Account
            </h2>
            <Formik<SetupAccountFormValues>
              initialValues={{
                userName: "",
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
                    <label className="block text-gray-700">
                      Confirm Password
                    </label>
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
                    Save
                  </button>
                  {isSubmitting && (
                    <Spinner className="w-full" color="warning" />
                  )}
                </Form>
              )}
            </Formik>
          </>
        )}
      </div>
    </div>
  );
};
export default SetupAccountPage;
