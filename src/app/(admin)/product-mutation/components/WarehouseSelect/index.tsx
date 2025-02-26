"use client"
import { FC, Dispatch, SetStateAction, useEffect, useRef, useState, useCallback } from "react";
import AsyncSelect from "react-select/async";
import useAssignedWarehouse from "@/hooks/mutation/useAssignedWarehouse";
import { Session } from "next-auth";
import { AssignedWarehouse } from "@/types/product";
import debounce from "lodash.debounce";

interface WarehouseSelectProps {
  session: Session | null;
  warehouse: AssignedWarehouse;
  setWarehouse: Dispatch<SetStateAction<AssignedWarehouse>>;
  isAllowedAll: boolean;
}

const WarehouseSelect: FC<WarehouseSelectProps> = ({
  session,
  warehouse,
  setWarehouse,
  isAllowedAll,
}) => {
  const [search, setSearch] = useState("");
  const { error, warehouses, refetch } = useAssignedWarehouse(
    session?.accessToken as string
  );

  const isFirstLoad = useRef(true);

  useEffect(() => {
    if (isFirstLoad.current && warehouses && warehouses.length > 0) {
      setWarehouse(warehouses[0]);
      isFirstLoad.current = false;
    }
  }, [warehouses, setWarehouse]);

  const handleSearch = useCallback(
    debounce(async (inputValue: string, callback) => {
      setSearch(inputValue);
      await refetch();
      if (warehouses) {
        const filteredOptions = warehouses
          .filter((wh) => wh.name.toLowerCase().includes(inputValue.toLowerCase()))
          .map((wh) => ({ label: wh.name, value: wh.id }));
  
        if (isAllowedAll && session?.user.roles.includes("SUPER_ADMIN")) {
          filteredOptions.unshift({ label: "All", value: 0 });
        }
  
        callback(filteredOptions);
      }
    }, 500),
    [refetch, warehouses, isAllowedAll, session]
  );

  const handleChange = (selectedOption: { value: number; label: string } | null) => {
    if (selectedOption) {
      setWarehouse({ id: selectedOption.value, name: selectedOption.label });
    }
  };

  if (error) {
    return <div>Can't fetch your assigned warehouse</div>;
  }

  const warehouseOptions = [
    ...(isAllowedAll && session?.user.roles.includes("SUPER_ADMIN") ? [{ label: "All", value: 0 }] : []),
    ...(warehouses?.map((wh) => ({ label: wh.name, value: wh.id })) || []),
  ];

  return (
    <AsyncSelect
      cacheOptions
      instanceId="assigned-warehouse-select"
      defaultOptions={warehouseOptions}
      loadOptions={(inputValue) =>
        new Promise((resolve) => {
          handleSearch(inputValue, resolve);
        })
      }
      onChange={handleChange}
      value={warehouse.id ? { label: warehouse.name, value: warehouse.id } : null}
      placeholder="All warehouse"
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
