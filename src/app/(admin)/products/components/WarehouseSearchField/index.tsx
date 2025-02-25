"use client";
import { FC, useCallback, useEffect, useState } from "react";
import AsyncSelect from "react-select/async";
import debounce from "lodash.debounce";
import { FieldProps } from "formik";
import useWarehouses from "@/hooks/useWarehouse";
import { Session } from "next-auth";

interface WarehouseSearchFieldProps extends FieldProps {
  session: Session | null;
  excludeWarehouse?: number;
}

const WarehouseSearchField: FC<WarehouseSearchFieldProps> = ({
  field,
  form,
  session,
  excludeWarehouse
}) => {
  const [mounted, setMounted] = useState(false);
  const { params, setParams, isLoading, error, warehouses, refetch } = useWarehouses(
    session?.accessToken as string
  );
  
  const handleChange = (selectedOption: { value: number; label: string } | null) => {
    if (selectedOption) {
      form.setFieldValue(field.name, selectedOption.value);
    }
  };

  if (error) {
    return <div>Can't fetch warehouse</div>;
  }

  const debouncedFetch = useCallback(
    debounce((inputValue: string, callback) => {
      setParams({ ...params, search: inputValue });
      refetch().then(() => {
        if (warehouses?.data) {
          callback(
            warehouses.data
              .filter((w) => w.id !== excludeWarehouse)
              .map((w) => ({ label: w.name, value: w.id }))
          );
        }
      });
    }, 500),
    [params, refetch, warehouses]
  );

  const hasError = form.touched[field.name] && form.errors[field.name];

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted)
  return (
    <AsyncSelect
      isDisabled
      placeholder="Loading..."
      classNames={{
        control: () =>
          `shadow appearance-none rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none w-full ${
            hasError ? "border border-red-500" : ""
          }`,
        menu: () => "shadow-md rounded bg-white",
        option: ({ isFocused }) =>
          `px-3 py-2 cursor-pointer ${
            isFocused ? "bg-gray-200" : "bg-white"
          }`,
      }}
    />
  );
  
  const warehouseOptions = warehouses?.data
    ?.filter((w) => w.id !== excludeWarehouse)
    .map((w) => ({ label: w.name, value: w.id })) || [];

  return (
    <>
      <AsyncSelect
        cacheOptions
        instanceId="warehouse-select"
        defaultOptions={warehouseOptions}
        loadOptions={debouncedFetch}
        onChange={handleChange}
        onBlur={() => form.setFieldTouched(field.name, true)}
        placeholder="Search warehouse"
        classNames={{
          control: () =>
            `shadow appearance-none rounded text-gray-700 leading-tight focus:outline-none w-full ${
              hasError ? "border border-red-500" : ""
            }`,
          menu: () => "shadow-md rounded bg-white",
          option: ({ isFocused }) =>
            `cursor-pointer ${
              isFocused ? "bg-gray-200" : "bg-white"
            }`,
        }}
      />
      {hasError && (
        <p className="text-red-500 text-sm mt-1">
          {form.errors[field.name] as string}
        </p>
      )}
    </>
  );
};
export default WarehouseSearchField;
