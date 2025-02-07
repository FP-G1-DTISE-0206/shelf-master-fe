import { FC } from "react";

const TokenNotFoundCard: FC = () => {
  return (
    <div className="bg-white shadow-lg rounded-xl p-6 text-center border border-red-500">
      <h2 className="text-xl font-semibold text-red-600">Token not found.</h2>
    </div>
  );
};
export default TokenNotFoundCard;
