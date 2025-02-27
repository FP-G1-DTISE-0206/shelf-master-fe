"use client";
import { FC, useCallback, useEffect, useState } from "react";
import AsyncSelect from "react-select/async";
import debounce from "lodash.debounce";
import { FieldProps } from "formik";
import useVendor from "@/hooks/product/useVendor";
import { Session } from "next-auth";

interface VendorSearchFieldProps extends FieldProps {
  session: Session | null;
}

const VendorSearchField: FC<VendorSearchFieldProps> = ({
  field,
  form,
  session
}) => {
  const [mounted, setMounted] = useState(false);
  const { params, setParams, isLoading, error, vendors, refetch } = useVendor(
    session?.accessToken as string
  );
  
  const handleChange = (selectedOption: { value: number; label: string } | null) => {
    if (selectedOption) {
      form.setFieldValue(field.name, selectedOption.value);
    }
  };

  const debouncedFetch = useCallback(
    debounce((inputValue: string, callback) => {
      setParams({ ...params, search: inputValue });
      refetch().then(() => {
        if (vendors?.data) {
          callback(vendors.data.map((v) => ({ label: v.name, value: v.id })));
        }
      });
    }, 500),
    [params, refetch, vendors]
  );
  
  const hasError = form.touched[field.name] && form.errors[field.name];

  useEffect(() => {
    setMounted(true);
  }, []);

  if (error) {
    return <div>Can&apos;t fetch warehouse</div>;
  }
  
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

  return (
    <>
      <AsyncSelect
        cacheOptions
        instanceId="vendor-select"
        defaultOptions={vendors?.data.map((v) => ({ label: v.name, value: v.id }))}
        isLoading={isLoading}
        loadOptions={debouncedFetch}
        onChange={handleChange}
        onBlur={() => form.setFieldTouched(field.name, true)}
        placeholder="Search vendor"
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

export default VendorSearchField;
