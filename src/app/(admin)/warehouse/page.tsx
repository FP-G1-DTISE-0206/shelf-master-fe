import { FC } from "react";
import WarehouseTable from "./components/WarehouseTable";
import AdminTable from "./components/AdminTable";

const WarehousePage: FC = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="font-semibold text-2xl">Warehouse Management</div>
      <WarehouseTable />
      <AdminTable />
    </div>
  );
};
export default WarehousePage;
