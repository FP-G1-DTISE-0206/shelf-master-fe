"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { PopularProductResponse } from "@/types/report";
import { DashboardRequest } from "./useSalesCards";

const fetchPopularProducts = async (
  accessToken: string,
  params: DashboardRequest
): Promise<PopularProductResponse[]> => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/report/popular?date=${params.date}`
    + ((params.warehouseId != 0) ? `&id=${params.warehouseId}` : ``),
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return data.data as PopularProductResponse[];
};

const useBestSellers = (accessToken: string) => {
  const [params, setParams] = useState<DashboardRequest>({
    date: new Date().toISOString().split("T")[0],
    warehouseId: 0,
  });
  const {
    isLoading,
    error,
    data: populars,
    refetch,
  } = useQuery({
    queryKey: ["fetchPopularProducts", accessToken, params],
    queryFn: async () => fetchPopularProducts(accessToken, params),
    staleTime: 60 * 1000,
    gcTime: 60 * 1000,
  });
  return {
    isLoading,
    error,
    refetch,
    populars,
    params,
    setParams,
  };
};

export default useBestSellers;
