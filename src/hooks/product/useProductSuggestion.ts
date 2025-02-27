"use client";
import { PaginationResponse } from "@/types/pagination";
import { ProductResponse } from "@/types/product";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

export interface ProductSuggestionPaginationRequest {
  start: number;
  length: number;
  search: string;
  field: string;
  order: string;
  category: number[], 
}

const fetchProductSuggestions = async (
  accessToken: string, 
  params: ProductSuggestionPaginationRequest
): Promise<PaginationResponse<ProductResponse>> => {
  const { category, ...otherParams } = params;
  const queryParams = {
    ...otherParams,
    category: category.length > 0 ? category.join(",") : undefined,
  };

  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/product`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: queryParams,
    }
  );
  return data.data as PaginationResponse<ProductResponse>;
};

const useProductSuggestion = (accessToken: string) => {
  const [params, setParams] = useState<ProductSuggestionPaginationRequest>({
    start: 0,
    length: 5,
    search: "",
    field: "price",
    order: "asc",
    category: [],
  });
  const {
    isLoading,
    error,
    data: products,
    refetch,
  } = useQuery({
    queryKey: ["fetchProductSuggestions", params],
    queryFn: async () => fetchProductSuggestions(accessToken, params),
    staleTime: 60 * 1000,
    gcTime: 60 * 1000,
  });
  return {
    isLoading,
    error,
    products,
    refetch,
    params,
    setParams,
  };
};

export default useProductSuggestion;
