"use client"
import { FC, Dispatch, SetStateAction, useCallback } from "react";
import AsyncSelect from "react-select/async";
import useSelectProductCategory from "@/hooks/category/useSelectProductCategory";
import { Session } from "next-auth";
import { CategoryResponse } from "@/types/category";
import debounce from "lodash.debounce";

interface CategorySelectProps {
  session: Session | null;
  category: CategoryResponse;
  setCategory: Dispatch<SetStateAction<CategoryResponse>>;
}

const CategorySelect: FC<CategorySelectProps> = ({
  session,
  category,
  setCategory,
}) => {
  const { error, categories, refetch, setSearch } = useSelectProductCategory(
    session?.accessToken as string
  );

  const warehouseOptions = [
    ...[{ label: "All Category", value: 0 }],
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
  
        filteredOptions.unshift({ label: "All Category", value: 0 });
  
        callback(filteredOptions);
      }
    }, 500),
    [refetch, categories, session]
  );

  const handleChange = (selectedOption: { value: number; label: string } | null) => {
    if (selectedOption) {
      setCategory({ 
        id: selectedOption.value, name: selectedOption.label, });
    }
  };

  if (error) {
    return <div>Can&apos;t fetch category</div>;
  }

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
      value={category ? { label: category.name, value: category.id } : null}
      placeholder="All Category"
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

export default CategorySelect;
