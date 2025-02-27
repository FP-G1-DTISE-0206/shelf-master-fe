"use client";
import { PaginationResponse } from "@/types/pagination";
import { ProductMutationResponse } from "@/types/mutation";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

export interface MutationPaginationRequest {
  start: number;
  length: number;
  search: string;
  field: string;
  order: string;
  mutationTypeId: number;
}

const fetchProductMutations = async (
  accessToken: string,
  warehouseId: number,
  params: MutationPaginationRequest
): Promise<PaginationResponse<ProductMutationResponse>> => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/product-mutation/${warehouseId}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params,
    }
  );
  return data.data as PaginationResponse<ProductMutationResponse>;
};

const useMutation = (accessToken: string, warehouseId: number) => {
  const [params, setParams] = useState<MutationPaginationRequest>({
    start: 0,
    length: 10,
    search: "",
    field: "createdAt",
    order: "desc",
    mutationTypeId: 0,
  });
  const {
    isLoading,
    error,
    data: mutations,
    refetch,
  } = useQuery({
    queryKey: ["fetchProductMutations", accessToken, params],
    queryFn: async () => fetchProductMutations(accessToken, warehouseId, params),
    staleTime: 60 * 1000,
    gcTime: 60 * 1000,
  });
  return {
    isLoading,
    error,
    mutations,
    refetch,
    params,
    setParams,
  };
};

export default useMutation;
