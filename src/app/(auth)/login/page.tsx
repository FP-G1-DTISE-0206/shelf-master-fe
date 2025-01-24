import {
  faFacebook,
  faGoogle,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { FC } from "react";

const LoginPage: FC = () => {
  return (
    <div className="flex items-center justify-center bg-white px-8">
      <div className="w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6">Login</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </div>
          <div className="flex justify-between items-center">
            <button
              type="submit"
              className="bg-shelf-black text-white py-2 px-6 rounded-lg hover:bg-blue-700"
            >
              Sign In
            </button>
            <a href="#" className="text-blue-500 hover:underline">
              Forgot Password?
            </a>
          </div>

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
              Continue with Google
            </button>

            <button
              type="button"
              className="w-full flex items-center justify-center border border-gray-300 py-2 rounded-lg hover:bg-gray-100"
            >
              <FontAwesomeIcon icon={faFacebook} className="w-6 h-6 mr-2" />
              Continue with Facebook
            </button>

            <button
              type="button"
              className="w-full flex items-center justify-center border border-gray-300 py-2 rounded-lg hover:bg-gray-100"
            >
              <FontAwesomeIcon icon={faTwitter} className="w-6 h-6 mr-2" />
              Continue with X (Twitter)
            </button>
          </div>

          <p className="text-center text-gray-600 mt-4">
            Don't have an account?{" "}
            <a href="#" className="text-blue-500">
              Sign Up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};
export default LoginPage;
