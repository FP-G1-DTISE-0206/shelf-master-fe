import { FC, Dispatch, SetStateAction, useEffect, useRef } from "react";
import AsyncSelect from "react-select/async";
import useAssignedWarehouse from "@/hooks/mutation/useAssignedWarehouse";
import { Session } from "next-auth";
import { AssignedWarehouse } from "@/types/product";

interface WarehouseSelectProps {
  session: Session | null;
  warehouse: AssignedWarehouse;
  setWarehouse: Dispatch<SetStateAction<AssignedWarehouse>>;
}

const WarehouseSelect: FC<WarehouseSelectProps> = ({
  session,
  warehouse,
  setWarehouse,
}) => {
  const { isLoading, error, warehouses, refetch } = useAssignedWarehouse(
    session?.accessToken as string
  );

  const isFirstLoad = useRef(true);

  useEffect(() => {
    if (isFirstLoad.current && warehouses && warehouses.length > 0) {
      setWarehouse(warehouses[0]);
      isFirstLoad.current = false;
    }
  }, [warehouses, setWarehouse]);

  const handleChange = (selectedOption: { value: number; label: string } | null) => {
    if (selectedOption) {
      setWarehouse({ id: selectedOption.value, name: selectedOption.label });
    }
  };

  if (error) {
    return <div>Can't fetch your assigned warehouse</div>;
  }

  return (
    <AsyncSelect
      cacheOptions
      defaultOptions={warehouses?.map((wh) => ({
        label: wh.name,
        value: wh.id,
      }))}
      loadOptions={(inputValue, callback) => {
        callback(
          warehouses
            ?.filter((wh) =>
              wh.name.toLowerCase().includes(inputValue.toLowerCase())
            )
            .map((wh) => ({
              label: wh.name,
              value: wh.id,
            })) || []
        );
      }}
      isLoading={isLoading}
      onChange={handleChange}
      value={warehouse.id ? { label: warehouse.name, value: warehouse.id } : null}
      placeholder="Search for warehouse"
      classNames={{
        control: () =>
          `shadow appearance-none rounded text-gray-700 leading-tight focus:outline-none w-full`,
        menu: () => "shadow-md rounded bg-white",
        option: ({ isFocused }) =>
          `cursor-pointer ${isFocused ? "bg-gray-200" : "bg-white"}`,
      }}
    />
  );
};

export default WarehouseSelect;
