import Link from "next/link";
import { FC } from "react";

const TokenExpiredCard: FC = () => {
  return (
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
  );
};
export default TokenExpiredCard;
