"use client";
import { useToast } from "@/providers/ToastProvider";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Spinner } from "flowbite-react";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import * as Yup from "yup";

type LoginFormValues = {
  email: string;
  password: string;
};

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(4, "Password must be at least 4 characters")
    .required("Password is required"),
});
const LoginPage: FC = () => {
  const router = useRouter();
  const { showToast } = useToast();
  const [error, setError] = useState<string | null>(null);
  const handleSubmit = async (
    values: LoginFormValues,
    formikHelpers: FormikHelpers<LoginFormValues>
  ) => {
    setError(null);
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
      });

      if (result?.error) {
        if (result.error === "CredentialsSignin") {
          setError("Invalid email or password");
        } else {
          setError(
            result?.error || "An unexpected error occurred. Please try again."
          );
        }
      } else if (!result?.error) {
        showToast("Login success", "success");
        formikHelpers.resetForm();
        router.refresh();
      }
    } catch (error) {
      showToast("An unexpected error occurred:" + error, "error");
      setError("An unexpected error occurred. Please try again.");
    } finally {
    }
  };
  return (
    <>
      <h2 className="text-3xl font-bold text-center mb-6">Login</h2>
      <Formik<LoginFormValues>
        initialValues={{ email: "", password: "" }}
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
            <div>
              <label className="block text-gray-700">Password</label>
              <Field
                type="password"
                name="password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            {error && <span className="text-red-500">{error}</span>}
            <div className="flex justify-between items-center">
              <button
                type="submit"
                className="bg-shelf-black text-white py-2 px-6 rounded-lg hover:bg-shelf-orange flex gap-2"
                disabled={isSubmitting}
              >
                Sign In
                {isSubmitting && <Spinner color="warning" />}
              </button>
              <Link
                href="/forgot-password"
                className="text-shelf-orange hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
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
                Continue with Google
              </button>
            </div>
            <p className="text-center text-gray-600 mt-4">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-shelf-orange">
                Sign Up
              </Link>
            </p>
          </Form>
        )}
      </Formik>
    </>
  );
};
export default LoginPage;
