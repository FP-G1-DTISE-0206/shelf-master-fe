"use client"
import { FC, useCallback, useState } from "react";
import { Button, Checkbox, Label } from "flowbite-react";
import SearchProductCard from "./SearchProductCard";
import useProduct from "@/hooks/product/useProduct";
import { useSession } from "next-auth/react";
import CustomSpinner from "@/components/CustomSpinner";
import { useSearchSortPaginationStore } from "@/store/useSearchSortPaginationStore";

const SearchPage: FC = () => {
  const { data: session } = useSession();
  const { 
    page, length, field, order, 
    setPage, setSearch, setField, setOrder, 
  } = useSearchSortPaginationStore();
  const {
    error: productError,
    isLoading: isProductLoading,
    products,
    totalData,
  } = useProduct(session?.accessToken as string);

  const [selectedFilters1, setSelectedFilters1] = useState<string[]>([]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleCheckboxChange = (
    filter: string, 
    setFilterState: React.Dispatch<React.SetStateAction<string[]>>, 
    selectedFilters: string[]
  ) => {
    setFilterState((prev) => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter) 
        : [...prev, filter]
    );
  };

  return (
    <div className="p-6 bg-gray-100">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/4 bg-white p-4 rounded-lg shadow-md">
          <h2 className="font-bold text-lg mb-4">Filters</h2>
          <div>
            <h3 className="text-md font-semibold mb-2">Category</h3>
            <div className="grid grid-cols-2 gap-2">
              {["Option A", "Option B", "Option C"].map((filter) => (
                <Label key={filter} className="flex items-center space-x-2">
                  <Checkbox 
                    checked={selectedFilters1.includes(filter)}
                    onChange={() => handleCheckboxChange(filter, setSelectedFilters1, selectedFilters1)}
                  />
                  <span>{filter}</span>
                </Label>
              ))}
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-md font-semibold mb-2">Order By:</h3>
            <div className="grid grid-cols-2 gap-2">
              -
            </div>
          </div>
        </div>

        <div className="w-full md:w-3/4 grid grid-cols-1 md:grid-cols-3 gap-6">
          {
            isProductLoading && (
              <div className="flex min-h-60 align-middle justify-center">
                <CustomSpinner />
              </div>
            )
          }
          {
            productError && (<div className="align-middle justify-center">Error: {productError.message}</div>)
          }
          {
            (!products || !totalData) && (<div className="align-middle justify-center">No products</div>)
          }
          {!isProductLoading && products.map((product) => (
            <SearchProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
      {
        !isProductLoading && products.length > 0 && totalData && (
          <div className="w-full flex justify-end mt-4">
            <Button disabled={page === 1} onClick={() => handlePageChange(page - 1)} 
              color="transparent"
              className="mr-2">
              Previous
            </Button>
            <span className="my-auto">{`Page ${page}`}</span>
            <Button disabled={totalData < length} 
              color="transparent"
              onClick={() => handlePageChange(page + 1)} className="ml-2">
              Next
            </Button>
          </div>
        )
      }
    </div>
  );
};

export default SearchPage;
