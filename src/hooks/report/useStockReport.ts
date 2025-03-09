import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { StockReportResponse, StockReportRequest } from "@/types/report";
import { PaginationResponse } from "@/types/pagination";
import { useToast } from "@/providers/ToastProvider";

interface StockReportPagination extends StockReportRequest {
  start: number;
  length: number;
}

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const fetchReportPreview = async (
  accessToken: string,
  params: StockReportPagination
): Promise<PaginationResponse<StockReportResponse>> => {
  const { data } = await axios.get(`${API_URL}/report/stock-preview`, {
    headers: { Authorization: `Bearer ${accessToken}` },
    params,
  });
  return data.data as PaginationResponse<StockReportResponse>;
};

const fetchFullReport = async (accessToken: string, creationData: StockReportRequest) => {
  const { data } = await axios.post(`${API_URL}/report/stock`, creationData, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return data.data as StockReportResponse[];
};

const generateExcelReport = async (data: StockReportResponse[]) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Stock Report");

  worksheet.columns = [
    { header: "Mutation ID", key: "id", width: 10 },
    { header: "Origin", key: "originName", width: 20 },
    { header: "Destination", key: "destinationName", width: 20 },
    { header: "Product ID", key: "productId", width: 15 },
    { header: "Product Name", key: "productName", width: 25 },
    { header: "Quantity", key: "absQuantity", width: 10 },
    { header: "Requester", key: "requesterName", width: 20 },
    { header: "Processor", key: "processorName", width: 20 },
    { header: "Remark", key: "remark", width: 30 },
    { header: "Processed Date", key: "processedAt", width: 20 },
  ] as ExcelJS.Column[];

  const groupedData: Record<string, { productId: number; productName: string; totalQuantity: number }> = {};

  data.forEach((item) => {
    const key = `${item.productId}-${item.productName}`;
    if (!groupedData[key]) {
      groupedData[key] = {
        productId: item.productId,
        productName: item.productName,
        totalQuantity: 0,
      };
    }
    groupedData[key].totalQuantity += item.quantity;
  });

  data.forEach((item) => worksheet.addRow(item));

  Object.values(groupedData).forEach(({ productId, productName, totalQuantity }) => {
    worksheet.addRow({
      id: "TOTAL",
      originName: "",
      destinationName: "",
      productId,
      productName,
      absQuantity: totalQuantity,
      requesterName: "",
      processorName: "",
      remark: "",
      processedAt: "",
    });
  });

  worksheet.eachRow((row) => {
    if (row.getCell(1).value === "TOTAL") {
      row.font = { bold: true };
    }
  });

  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  saveAs(blob, "Stock_Report.xlsx");
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

  const { isLoading, error, data: reports, refetch } = useQuery({
    queryKey: ["fetchReportPreview", accessToken, params],
    queryFn: () => fetchReportPreview(accessToken, params),
    staleTime: 60 * 1000,
    gcTime: 60 * 1000,
  });

  const { mutate: downloadReport } = useMutation({
    mutationFn: ({ creationData }: { creationData: StockReportRequest }) =>
      fetchFullReport(accessToken, creationData),
    onSuccess: async (data) => {
      await generateExcelReport(data);
      showToast("Stock Report downloaded successfully", "success");
    },
    onError: (error: unknown) => {
      const message =
        (error as { response?: { data?: { message?: string } } })?.response?.data?.message ??
        (error instanceof Error ? error.message : "An unknown error occurred");
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

export default useStockReport;
