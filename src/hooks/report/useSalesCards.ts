"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { SalesInfoCardResponse } from "@/types/report";

export interface DashboardRequest {
  date: string;
  warehouseId: number;
}

const fetchSalesCards = async (
  accessToken: string,
  params: DashboardRequest
): Promise<SalesInfoCardResponse[]> => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/report/cards?date=${params.date}`
    + ((params.warehouseId != 0) ? `&id=${params.warehouseId}` : ``),
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return data.data as SalesInfoCardResponse[];
};

const useSalesCards = (accessToken: string) => {
  const [params, setParams] = useState<DashboardRequest>({
    date: new Date().toISOString().split("T")[0],
    warehouseId: 0,
  });
  const {
    isLoading,
    error,
    data: cards,
    refetch,
  } = useQuery({
    queryKey: ["fetchSalesCards", accessToken, params],
    queryFn: async () => fetchSalesCards(accessToken, params),
    staleTime: 60 * 1000,
    gcTime: 60 * 1000,
  });
  return {
    isLoading,
    error,
    refetch,
    cards,
    params,
    setParams,
  };
};

export default useSalesCards;
