import { PaginationRequest, PaginationResponse } from "@/types/pagination";
import { ProductResponse } from "@/types/product";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

export interface SimpleProductReq extends PaginationRequest {
  categories: number[];
}

const fetchSimpleProducts = async (
  params: SimpleProductReq
): Promise<PaginationResponse<ProductResponse>> => {
  const { categories, ...restParams } = params;
  const queryString = new URLSearchParams(
    Object.entries(restParams).reduce((acc, [key, value]) => {
      acc[key] = value.toString();
      return acc;
    }, {} as Record<string, string>)
  ).toString();
  const categoriesQuery = categories.map(cat => `category=${cat}`).join("&");
  const finalQuery = queryString + (categoriesQuery ? `&${categoriesQuery}` : "");

  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/product?${finalQuery}`
  );
  return data.data as PaginationResponse<ProductResponse>;
};

const useSimpleProduct = () => {
  const [params, setParams] = useState<SimpleProductReq>({
    start: 0,
    length: 12,
    search: "",
    field: "name",
    order: "asc",
    categories: []
  });

  const {
    isLoading,
    error,
    data,
    refetch,
  } = useQuery({
    queryKey: ["fetchSimpleProducts", params],
    queryFn: () =>
      fetchSimpleProducts(params),
  });

  return {
    isLoading,
    error,
    products: data?.data as ProductResponse[],
    totalData: data?.recordsFiltered,
    refetch,
    params,
    setParams
  };
};

export default useSimpleProduct;