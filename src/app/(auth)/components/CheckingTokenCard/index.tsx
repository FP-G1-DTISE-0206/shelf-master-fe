import CustomSpinner from "@/components/CustomSpinner";
import { FC } from "react";

const CheckingTokenCard: FC = () => {
  return (
    <div className="bg-white shadow-lg rounded-xl p-6 text-center border border-shelf-orange flex flex-col gap-4">
      <h2 className="text-xl font-semibold text-shelf-orange">
        Checking token...
      </h2>
      <CustomSpinner />
    </div>
  );
};
export default CheckingTokenCard;
