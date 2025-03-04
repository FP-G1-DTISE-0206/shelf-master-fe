"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { GraphResponse } from "@/types/report";
import { DashboardRequest } from "./useSalesCards";

const fetchYearGraph = async (
  accessToken: string,
  params: DashboardRequest
): Promise<GraphResponse[]> => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/report/year-graph?date=${params.date}`
    + ((params.warehouseId != 0) ? `&id=${params.warehouseId}` : ``),
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return data.data as GraphResponse[];
};

const useYearGraph = (accessToken: string) => {
  const [params, setParams] = useState<DashboardRequest>({
    date: new Date().toISOString().split("T")[0],
    warehouseId: 0,
  });
  const {
    isLoading,
    error,
    data: yearGraph,
    refetch,
  } = useQuery({
    queryKey: ["fetchYearGraph", accessToken, params],
    queryFn: async () => fetchYearGraph(accessToken, params),
    staleTime: 60 * 1000,
    gcTime: 60 * 1000,
  });
  return {
    yearIsLoading: isLoading,
    yeearGraphError: error,
    refetchYear: refetch,
    yearGraph,
    yearParams: params,
    setYearParams: setParams,
  };
};

export default useYearGraph;
