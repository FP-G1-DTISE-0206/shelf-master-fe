"use client";
import { useToast } from "@/providers/ToastProvider";
import axios from "axios";
import { Spinner } from "flowbite-react";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { useRouter, useSearchParams } from "next/navigation";
import { FC, useEffect, useState } from "react";
import * as Yup from "yup";
import CheckingTokenCard from "../components/CheckingTokenCard";
import ForgotTokenExpiredCard from "../components/ForgotTokenExpiredCard";
import TokenNotFoundCard from "../components/TokenNotFoundCard";
type SetupPasswordFormValues = {
  userName: string;
  password: string;
  confirmPassword: string;
};
const validationSchema = Yup.object({
  password: Yup.string()
    .min(4, "Password must be at least 4 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), ""], "Passwords must match")
    .required("Confirm Password is required"),
});
const SetupPasswordPage: FC = () => {
  const { showToast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const paramToken = searchParams.get("token");
  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleSubmit = async (
    values: SetupPasswordFormValues,
    formikHelpers: FormikHelpers<SetupPasswordFormValues>
  ) => {
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/setup-password`,
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
    const verifyToken = async () => {
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

    verifyToken();
  }, [paramToken]);
  return (
    <>
      {isLoading && paramToken && <CheckingTokenCard />}
      {!paramToken && <TokenNotFoundCard />}
      {!isValid && paramToken && !isLoading && <ForgotTokenExpiredCard />}
      {isValid && !isLoading && paramToken && (
        <>
          <h2 className="text-3xl font-bold text-center mb-6">
            Set your Password
          </h2>
          <Formik<SetupPasswordFormValues>
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
                {isSubmitting && <Spinner className="w-full" color="warning" />}
              </Form>
            )}
          </Formik>
        </>
      )}
    </>
  );
};
export default SetupPasswordPage;
