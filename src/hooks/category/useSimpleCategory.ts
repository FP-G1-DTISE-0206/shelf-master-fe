import { PaginationRequest, PaginationResponse } from "@/types/pagination";
import { CategoryResponse } from "@/types/category";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

const fetchSimpleCategories = async (
  params: PaginationRequest
): Promise<PaginationResponse<CategoryResponse>> => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/category`,
    {
      headers: {},
      params,
    }
  );
  return data.data as PaginationResponse<CategoryResponse>;
};

const useSimpleCategory = () => {
  const [params, setParams] = useState<PaginationRequest>({
    start: 0,
    length: 10,
    search: "",
    field: "id",
    order: "asc"
  });

  const {
    isLoading,
    error,
    data,
    refetch,
  } = useQuery({
    queryKey: ["fetchSimpleCategories", params],
    queryFn: () =>
      fetchSimpleCategories(params),
  });

  return {
    isLoading,
    error,
    categories: data?.data as CategoryResponse[],
    totalData: data?.recordsFiltered,
    refetch,
    params,
    setParams
  };
};

export default useSimpleCategory;