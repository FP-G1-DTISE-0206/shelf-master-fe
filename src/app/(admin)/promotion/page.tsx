import { FC } from "react";
import PromotionTable from "./components/PromotionTable";

const PromotionPage: FC = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="font-semibold text-2xl">Promotion Management</div>
      <PromotionTable />
    </div>
  );
};
export default PromotionPage;
