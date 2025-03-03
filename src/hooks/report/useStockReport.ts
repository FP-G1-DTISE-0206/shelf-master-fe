"use client";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { PaginationResponse } from "@/types/pagination";
import { useState } from "react";
import { 
  StockReportResponse, 
  StockReportRequest, 
} from "@/types/report";
import { useToast } from "@/providers/ToastProvider";

interface StockReportPagination extends StockReportRequest {
  start: number;
  length: number;
}

const fetchReportPreview = async (
  accessToken: string,
  params: StockReportPagination
): Promise<PaginationResponse<StockReportResponse>> => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/report/stock-preview`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params,
    }
  );
  return data.data as PaginationResponse<StockReportResponse>;
};

const downloadReport = async (accessToken: string, creationData: StockReportRequest) => {
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/product-mutation/stock`,
    creationData,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return data.data as StockReportResponse[];
};

const useStockReport = (accessToken: string) => {
  const { showToast } = useToast();
  const [params, setParams] = useState<StockReportPagination>({
    start: 0,
    length: 10,
    productId: null,
    startDate: new Date().toISOString().split("T")[0],
    endDate: new Date().toISOString().split("T")[0],
    warehouseId: null,
  });
  const {
    isLoading,
    error,
    data: reports,
    refetch,
  } = useQuery({
    queryKey: ["fetchReportPreview", accessToken, params],
    queryFn: async () => fetchReportPreview(accessToken, params),
    staleTime: 60 * 1000,
    gcTime: 60 * 1000,
  });
  const {
    mutate: downloadReportMutate,
  } = useMutation({
    mutationFn: ({ creationData }: { creationData: StockReportRequest }) =>
      downloadReport(accessToken, creationData),
    onSuccess: () => {
      showToast(`Report downloaded`, "success");
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        showToast(error.message, "error");
      } else if (typeof error === "object" && error !== null && "response" in error) {
        const err = error as { response: { data: { message: string } } };
        showToast(err.response.data.message, "error");
      } else {
        showToast("An unknown error occurred", "error");
      }
    },
  });
  return {
    isLoading,
    error,
    refetch,
    reports,
    params,
    setParams,
    downloadReport: downloadReportMutate,
  };
};

export default useStockReport;
