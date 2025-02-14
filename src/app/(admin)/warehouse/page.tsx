import { FC } from "react";
import WarehouseTable from "./components/WarehouseTable";

const WarehousePage: FC = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="font-semibold text-2xl">Warehouse Management</div>
      <WarehouseTable />
      {/* <div className="bg-shelf-white rounded-lg p-5">
        <div className="flex justify-between">
          <div className="font-semibold text-xl">Admin</div>
          <div className="flex gap-2 items-center">
            <div>Sort by:</div>
            <Dropdown color="light" label="ID" dismissOnClick={false}>
              <DropdownItem>ID</DropdownItem>
              <DropdownItem>Name</DropdownItem>
            </Dropdown>
            <button className="px-4 py-2 bg-shelf-white border rounded-lg">
              <FontAwesomeIcon icon={faSortAlphaAsc} />
            </button>
            <TextInput placeholder="Search Warehouse" autoComplete="off" />
            <button className="bg-shelf-black px-4 py-2 text-shelf-white rounded-lg flex gap-2 items-center">
              <FontAwesomeIcon icon={faPlus} />
              Add New Warehouse
            </button>
          </div>
        </div>
        <hr className="border-t border-gray-300 my-4" />
        <WarehouseTable />
      </div> */}
    </div>
  );
};
export default WarehousePage;
