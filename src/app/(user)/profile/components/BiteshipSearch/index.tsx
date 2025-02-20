"use client";
import { AreaOption, BiteshipArea } from "@/types/biteship";
import { FC, useCallback, useEffect, useState } from "react";
import AsyncSelect from "react-select/async";
import debounce from "lodash.debounce";
import axios from "axios";
import { FieldProps } from "formik";

interface SelectFieldProps extends FieldProps {
  setSelectedArea: (area: AreaOption | null) => void;
  selectedArea: AreaOption | null;
}

const BiteshipSearch: FC<SelectFieldProps> = ({
  field,
  form,
  setSelectedArea,
  selectedArea,
}) => {
  const [mounted, setMounted] = useState(false);
  const fetchAreas = async (inputValue: string): Promise<AreaOption[]> => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BITESHIP_URL}/v1/maps/areas`,
        {
          headers: {
            authorization: `Bearer ${process.env.NEXT_PUBLIC_BITESHIP_KEY}`,
          },
          params: {
            countries: "ID",
            input: inputValue,
            type: "single",
          },
        }
      );
      return (
        data?.areas?.map((a: BiteshipArea) => ({
          value: a.id,
          label: a.name,
          ...a,
        })) ?? []
      );
    } catch (error) {
      console.error("Error fetching areas:", error);
      return [];
    }
  };

  const debouncedFetch = useCallback(
    debounce(
      (inputValue: string, callback: (options: AreaOption[]) => void) => {
        fetchAreas(inputValue).then(callback);
      },
      500
    ),
    []
  );

  const handleChange = (selectedOption: AreaOption | null) => {
    console.log("Selected area:", selectedOption);
    form.setFieldValue(field.name, selectedOption ? selectedOption : null);
    setSelectedArea(selectedOption);
  };

  const hasError = form.touched[field.name] && form.errors[field.name];

  const getValue = () => {
    return field.value ? selectedArea : null;
  };
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
  return (
    <>
      <AsyncSelect
        cacheOptions
        defaultOptions
        loadOptions={debouncedFetch}
        onChange={handleChange}
        value={getValue()}
        onBlur={() => form.setFieldTouched(field.name, true)}
        placeholder="Search for an area..."
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
      {hasError && (
        <p className="text-red-500 text-sm mt-1">
          {form.errors[field.name] as string}
        </p>
      )}
    </>
  );
};
export default BiteshipSearch;
