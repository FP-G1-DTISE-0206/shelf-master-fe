import Link from "next/link";
import { FC } from "react";

const ForgotTokenExpiredCard: FC = () => {
  return (
    <div className="bg-white shadow-lg rounded-xl p-6 text-center border border-red-500">
      <h2 className="text-xl font-semibold text-red-600">
        Link is Invalid or Expired
      </h2>
      <p className="text-gray-600 mt-2">
        Your reset link has expired. Please request a new one.
      </p>
      <Link
        href="/forgot-password"
        className="text-shelf-orange hover:underline"
      >
        Forgot Password
      </Link>
    </div>
  );
};
export default ForgotTokenExpiredCard;
