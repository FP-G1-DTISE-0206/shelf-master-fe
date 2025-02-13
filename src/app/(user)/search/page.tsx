"use client"
import { FC, useState } from "react";
import { Button, Checkbox, Label, Select } from "flowbite-react";
import SearchProductCard from "./SearchProductCard";
import useProduct from "@/hooks/product/useProduct";
import useProductCategory from "@/hooks/category/useProductCategory";
import { useSession } from "next-auth/react";
import CustomSpinner from "@/components/CustomSpinner";
import { useSearchSortPaginationStore } from "@/store/useSearchSortPaginationStore";

const SearchPage: FC = () => {
  const { data: session } = useSession();
  const { 
    page, length, 
    setPage, setField, setOrder, setFilters, 
  } = useSearchSortPaginationStore();
  const accessToken = session?.accessToken ?? "";
  const { categories } = useProductCategory(accessToken);
  const {
    error: productError,
    isLoading: isProductLoading,
    products,
    totalData,
  } = useProduct(accessToken);

  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [filter, setfilter] = useState<string>("");

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleCheckboxChange = (
    categoryId: number, 
    setCategoryState: React.Dispatch<React.SetStateAction<number[]>>
  ) => {
    setCategoryState((prev) => 
      prev.includes(categoryId) 
        ? prev.filter(c => c !== categoryId) 
        : [...prev, categoryId]
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
            { categories?.length > 0 ? categories.map((filter) => (
                <Label key={filter.id} className="flex items-center space-x-2">
                  <Checkbox 
                    checked={selectedCategories.includes(filter.id)}
                    onChange={() => handleCheckboxChange(filter.id, setSelectedCategories)}
                  />
                  <span>{filter.name}</span>
                </Label>)) : ("No categories found")}
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-md font-semibold mb-2">Order By:</h3>
            <Select className="w-full" id="countries" defaultValue={""}
              onChange={(e)=>setfilter(e.target.value)}>
              <option value="" disabled>All</option>
              <option value="price,asc">Lower Price</option>
              <option value="price,desc">Higher Price</option>
              <option value="name,asc">Name (A-Z)</option>
              <option value="name,desc">Name (Z-A)</option>
            </Select>
          </div>
          <div className="mt-4 flex justify-start">
            <Button onClick={()=>{
              if(filter) {
                setField(filter.split(",")[0]);
                setOrder(filter.split(",")[1]);
              }
              setFilters(selectedCategories);
            }}>
              Apply
            </Button>
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
