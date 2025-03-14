"use client";
import { useToast } from "@/providers/ToastProvider";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { Spinner } from "flowbite-react";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC } from "react";
import * as Yup from "yup";
type SignupFormValues = {
  email: string;
};
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
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
    <>
      <h2 className="text-3xl font-bold text-center mb-6">Create an Account</h2>
      <Formik<SignupFormValues>
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
                onClick={() => signIn("google", { callbackUrl: "/" })}
                type="button"
                className="w-full flex items-center justify-center border border-gray-300 py-2 rounded-lg hover:bg-gray-100"
              >
                <FontAwesomeIcon icon={faGoogle} className="w-6 h-6 mr-2" />
                Sign Up with Google
              </button>
            </div>
            <p className="text-center text-gray-600 mt-4">
              Already have an account?{" "}
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

export default RegisterPage;
