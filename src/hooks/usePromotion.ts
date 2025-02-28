"use client";
import { PaginationRequest, PaginationResponse } from "@/types/pagination";
import { PromotionResponse } from "@/types/promotion";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

const fetchPromotion = async (
  accessToken: string,
  params: PaginationRequest
): Promise<PaginationResponse<PromotionResponse>> => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/promotion`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params,
    }
  );
  return data.data as PaginationResponse<PromotionResponse>;
};

const usePromotion = (accessToken: string) => {
  const [params, setParams] = useState<PaginationRequest>({
    start: 0,
    length: 10,
    search: "",
    field: "id",
    order: "desc",
  });
  const {
    isLoading,
    error,
    data: promotion,
    refetch,
  } = useQuery({
    queryKey: ["fetchPromotion", accessToken, params],
    queryFn: async () => fetchPromotion(accessToken, params),
    staleTime: 60 * 1000,
    gcTime: 60 * 1000,
  });
  return {
    isLoading,
    error,
    promotion,
    refetch,
    params,
    setParams,
  };
};

const fetchSimplePromotion = async (): Promise<PromotionResponse[]> => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/promotion/simple`
  );
  return data.data as PromotionResponse[];
};

export const useSimplePromotion = () => {
  const {
    isLoading,
    error,
    data: promotion,
    refetch,
  } = useQuery({
    queryKey: ["fetchSimplePromotion"],
    queryFn: async () => fetchSimplePromotion(),
    staleTime: 60 * 1000,
    gcTime: 60 * 1000,
  });
  return {
    isLoading,
    error,
    promotion,
    refetch,
  };
};

export default usePromotion;
