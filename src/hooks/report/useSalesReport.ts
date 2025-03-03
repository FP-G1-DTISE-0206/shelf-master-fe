import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { SalesReportResponse, SalesReportRequest } from "@/types/report";
import { PaginationResponse } from "@/types/pagination";
import { useToast } from "@/providers/ToastProvider";

interface SalesReportPagination extends SalesReportRequest {
  start: number;
  length: number;
}

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const fetchReportPreview = async (
  accessToken: string,
  params: SalesReportPagination
): Promise<PaginationResponse<SalesReportResponse>> => {
  const { data } = await axios.get(`${API_URL}/report/sales-preview`, {
    headers: { Authorization: `Bearer ${accessToken}` },
    params,
  });
  return data.data as PaginationResponse<SalesReportResponse>;
};

const fetchFullReport = async (accessToken: string, creationData: SalesReportRequest) => {
  const { data } = await axios.post(`${API_URL}/report/sales`, creationData, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return data.data as SalesReportResponse[];
};

const generateExcelReport = async (data: SalesReportResponse[]) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Sales Report");

  worksheet.columns = [
    { header: "Order ID", key: "orderId", width: 15 },
    { header: "Mutation Order ID", key: "mutationOrderId", width: 20 },
    { header: "Product ID", key: "productId", width: 15 },
    { header: "Product Name", key: "productName", width: 25 },
    { header: "Category", key: "categoryName", width: 20 },
    { header: "Quantity", key: "quantity", width: 10 },
    { header: "Total Price", key: "totalPrice", width: 15 },
    { header: "Created At", key: "createdAt", width: 20 },
  ] as ExcelJS.Column[];

  data.forEach((item) => worksheet.addRow(item));

  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  saveAs(blob, "Sales_Report.xlsx");
};

const useSalesReport = (accessToken: string) => {
  const { showToast } = useToast();
  const [params, setParams] = useState<SalesReportPagination>({
    start: 0,
    length: 10,
    productId: null,
    categoryId: null,
    startDate: new Date().toISOString().split("T")[0],
    endDate: new Date().toISOString().split("T")[0],
    warehouseId: null,
  });

  const { isLoading, error, data: reports, refetch } = useQuery({
    queryKey: ["fetchReportPreview", accessToken, params],
    queryFn: () => fetchReportPreview(accessToken, params),
    staleTime: 60 * 1000,
    gcTime: 60 * 1000,
  });

  const { mutate: downloadReport } = useMutation({
    mutationFn: ({ creationData }: { creationData: SalesReportRequest }) =>
      fetchFullReport(accessToken, creationData),
    onSuccess: async (data) => {
      await generateExcelReport(data);
      showToast("Sales Report downloaded successfully", "success");
    },
    onError: (error: unknown) => {
      const message =
        error instanceof Error
          ? error.message
          : (error as { response?: { data?: { message?: string } } })?.response?.data?.message ??
            "An unknown error occurred";
      showToast(message, "error");
    },
  });

  return {
    isLoading,
    error,
    refetch,
    reports,
    params,
    setParams,
    downloadReport,
  };
};

export default useSalesReport;
