"use client";
import { Dispatch, FC, SetStateAction, useCallback, } from "react";
import AsyncSelect from "react-select/async";
import debounce from "lodash.debounce";
import { FieldProps } from "formik";
import useSelectProductCategory from "@/hooks/category/useSelectProductCategory";
import { Session } from "next-auth";
import { CategoryResponse } from "@/types/category";

interface CategorySearchFieldProps extends FieldProps {
  session: Session | null;
  selectedCategories: CategoryResponse[];
  setSelectedCategories: Dispatch<SetStateAction<CategoryResponse[]>>;
}

const CategorySearchField: FC<CategorySearchFieldProps> = ({
  form,
  field,
  session,
  selectedCategories,
  setSelectedCategories,
}) => {
  const { error, categories, refetch, setSearch } = useSelectProductCategory(
    session?.accessToken as string
  );

  const warehouseOptions = [
    ...(categories?.map((c) => ({ label: c.name, value: c.id })) || []),
  ];

  const handleSearch = useCallback(
    debounce(async (inputValue: string, callback) => {
      setSearch(inputValue);
      await refetch();
      if (categories) {
        const filteredOptions = categories
          .filter((c) => c.name.toLowerCase().includes(inputValue.toLowerCase()))
          .map((c) => ({ label: c.name, value: c.id }));
  
        callback(filteredOptions);
      }
    }, 500),
    [refetch, categories, session]
  );

  const handleChange = (selectedOption: { value: number; label: string } | null) => {
    if (selectedOption) {
      setSelectedCategories([...selectedCategories, 
        {id: selectedOption.value, name: selectedOption.label}])
      form.setFieldValue(field.name, selectedOption.value);
    }
  };

  if (error) {
    return <div>Can&apos;t fetch category</div>;
  }

  const hasError = form.touched[field.name] && form.errors[field.name];

  return (
    <>
      <AsyncSelect
        instanceId="assigned-warehouse-select"
        defaultOptions={warehouseOptions}
        loadOptions={(inputValue) =>
          new Promise((resolve) => {
            handleSearch(inputValue, resolve);
          })
        }
        onChange={handleChange}
        placeholder="All Category"
        classNames={{
          control: () =>
            `shadow appearance-none rounded text-gray-700 leading-tight focus:outline-none w-full`,
          menu: () => "shadow-md rounded bg-white",
          option: ({ isFocused }) =>
            `cursor-pointer ${isFocused ? "bg-gray-200" : "bg-white"}`,
        }}
      />
      {hasError && (
        <p className="text-red-500 text-sm mt-1">
          {form.errors[field.name] as string}
        </p>
      )}
    </>
  )
};

export default CategorySearchField;
