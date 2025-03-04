"use client"
import { FC, Dispatch, SetStateAction, useCallback } from "react";
import AsyncSelect from "react-select/async";
import useSelectProduct from "@/hooks/product/useSelectProduct";
import { Session } from "next-auth";
import { ProductResponse } from "@/types/product";
import debounce from "lodash.debounce";

interface ProductSelectProps {
  session: Session | null;
  product: ProductResponse;
  setProduct: Dispatch<SetStateAction<ProductResponse>>;
}

const ProductSelect: FC<ProductSelectProps> = ({
  session,
  product,
  setProduct,
}) => {
  const { error, products, refetch, setSearch } = useSelectProduct(
    session?.accessToken as string
  );

  const warehouseOptions = [
    ...[{ label: "All Product", value: 0 }],
    ...(products?.map((p) => ({ label: p.name, value: p.id })) || []),
  ];

  const handleSearch = useCallback(
    debounce(async (inputValue: string, callback) => {
      setSearch(inputValue);
      await refetch();
      if (products) {
        const filteredOptions = products
          .filter((p) => p.name.toLowerCase().includes(inputValue.toLowerCase()))
          .map((p) => ({ label: p.name, value: p.id }));
  
        filteredOptions.unshift({ label: "All Product", value: 0 });
  
        callback(filteredOptions);
      }
    }, 500),
    [refetch, products, session]
  );

  const handleChange = (selectedOption: { value: number; label: string } | null) => {
    if (selectedOption) {
      setProduct({ 
        id: selectedOption.value, name: selectedOption.label, price: 0, quantity: 0, image: { id: 0, imageUrl: ""}
      });
    }
  };

  if (error) {
    return <div>Can&apos;t fetch product</div>;
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
      value={product ? { label: product.name, value: product.id } : null}
      placeholder="All Product"
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

export default ProductSelect;
