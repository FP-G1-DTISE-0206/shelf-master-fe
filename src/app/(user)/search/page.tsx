"use client";
import { FC, useEffect } from "react";
import { Pagination } from "flowbite-react";
import ProductCard from "@/app/components/ProductCard";
import CustomSpinner from "@/components/CustomSpinner";
import FilterComponent from "./components/Filter";
import useSimpleProduct from "@/hooks/product/useSimpleProduct";
import { useSearchParams } from "next/navigation";
import { useSearchSortPaginationStore } from "@/store/useSearchSortPaginationStore";

const SearchPage: FC = () => {
  const { params, setParams, products, isLoading, totalData, error } =
    useSimpleProduct();

  const { search } = useSearchSortPaginationStore();
  const searchParams = useSearchParams();

  const handlePageChange = (page: number) => {
    setParams({ ...params, start: (page - 1) * params.length });
  };

  useEffect(() => {
    const categoryParam = searchParams.get("categories");
    const fieldParam = searchParams.get("order")?.split(",")[0];
    const orderParam = searchParams.get("order")?.split(",")[1];
    if (categoryParam) {
      const categoryArray = categoryParam.split(",").map(Number);
      setParams((prev) => ({
        ...prev,
        categories: categoryArray,
        search: search,
        field: fieldParam ? fieldParam : "name",
        order: orderParam ? orderParam : "asc",
        start: 0,
      }));
    } else {
      setParams({ ...params, categories: [], 
        field: fieldParam ? fieldParam : "name",
        order: orderParam ? orderParam : "asc",
        search: search, start: 0 });
    }
  }, [searchParams, search]);

  return (
    <div>
      <div className="flex flex-col lg:flex-row gap-6">
        <FilterComponent />
        {isLoading && <CustomSpinner />}
        {error && (
          <div className="align-middle justify-center">
            Error: {error.message}
          </div>
        )}
        {!isLoading && products?.length < 1 && (
          <div className="align-middle justify-center">No products</div>
        )}
        <div className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-6">
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
