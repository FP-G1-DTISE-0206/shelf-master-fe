"use client"
import { FC, useEffect } from "react";
import { Pagination } from "flowbite-react";
import ProductCard from "@/app/components/ProductCard";
import CustomSpinner from "@/components/CustomSpinner";
import FilterComponent from "./components/Filter";
import useSimpleProduct from "@/hooks/product/useSimpleProduct";
import { useSearchSortPaginationStore } from "@/store/useSearchSortPaginationStore";

const SearchPage: FC = () => {
  const { 
    params, setParams, products, isLoading, totalData, error, 
  } = useSimpleProduct();
  const { search } = useSearchSortPaginationStore();

  const handlePageChange = (page: number) => {
    setParams({ ...params, start: (page - 1) * params.length });
  };

  useEffect(() => {
    if (search) {
      setParams({ ...params, search: search });
    }
  }, [search]);

  return (
    <div className="p-6 bg-gray-100">
      <div className="flex flex-col md:flex-row gap-6">
        <FilterComponent productParams={params} setProductParams={setParams} />

        <div className="w-full md:w-3/4 grid grid-cols-1 md:grid-cols-3 gap-6">
          {
            isLoading && (
              <div className="flex min-h-60 align-middle justify-center">
                <CustomSpinner />
              </div>
            )
          }
          {
            error && (<div className="align-middle justify-center">Error: {error.message}</div>)
          }
          {
            (!isLoading && products?.length < 1) && (<div className="align-middle justify-center">No products</div>)
          }
          {!isLoading && products?.length > 0 && products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
      {
        !isLoading && products?.length > 0 && totalData && ( 
          <div className="flex overflow-x-auto sm:justify-end">
            <Pagination
              currentPage={params.start / params.length + 1}
              totalPages={
                totalData
                  ? Math.ceil(totalData / params.length)
                  : 1
              }
              onPageChange={handlePageChange}
              showIcons
            />
          </div>
        )
      }
    </div>
  );
};

export default SearchPage;
