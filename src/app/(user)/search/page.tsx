"use client";
import { FC, useEffect } from "react";
import { Pagination } from "flowbite-react";
import ProductCard from "@/app/components/ProductCard";
import CustomSpinner from "@/components/CustomSpinner";
import FilterComponent from "./components/Filter";
import useSimpleProduct from "@/hooks/product/useSimpleProduct";
import { useSearchSortPaginationStore } from "@/store/useSearchSortPaginationStore";

const SearchPage: FC = () => {
  const { params, setParams, products, isLoading, totalData, error } =
    useSimpleProduct();
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
    <div>
      <div className="flex flex-col lg:flex-row gap-6">
        <FilterComponent productParams={params} setProductParams={setParams} />

        <div className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-6">
          {isLoading && (
            <div className="flex min-h-60 align-middle justify-center">
              <CustomSpinner />
            </div>
          )}
          {error && (
            <div className="align-middle justify-center">
              Error: {error.message}
            </div>
          )}
          {!isLoading && products?.length < 1 && (
            <div className="align-middle justify-center">No products</div>
          )}
          {!isLoading &&
            products?.length > 0 &&
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
      </div>
      {!isLoading && products?.length > 0 && totalData && (
        <div className="flex overflow-x-auto sm:justify-end mt-2">
          <Pagination
            currentPage={params.start / params.length + 1}
            totalPages={totalData ? Math.ceil(totalData / params.length) : 1}
            onPageChange={handlePageChange}
            showIcons
          />
        </div>
      )}
    </div>
  );
};

export default SearchPage;
