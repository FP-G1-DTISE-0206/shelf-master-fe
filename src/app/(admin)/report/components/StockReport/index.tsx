import { FC, useEffect, useState } from 'react'
import { Session } from "next-auth";
import { AssignedWarehouse, ProductResponse } from "@/types/product";
import StockReportTable from '../StockReportTable';
import useStockReport from '@/hooks/report/useStockReport';
import { useToast } from "@/providers/ToastProvider";
import ProductSelect from '../ProductSelect';
import {
  Datepicker,
  Pagination,
  Label,
} from "flowbite-react";
import { cn } from '@/utils';
import { StockReportRequest } from '@/types/report';

interface StockReportProps {
  session: Session | null;
  warehouse: AssignedWarehouse;
}

const StockReport: FC<StockReportProps> = ({
  session,
  warehouse,
}) => {
  const [ product, setProduct ] = useState<ProductResponse>({
    id: 0, name:"All Product", price: 0, quantity: 0, image: { id: 0, imageUrl: ""}
  })
  const { 
    setParams, params, isLoading, error, reports, downloadReport 
  } = useStockReport(session?.accessToken as string)
  const { showToast } = useToast();

  const onPageChange = (page: number) => {
    setParams({ ...params, start: (page - 1) * params.length });
  };

  const onStartDateChange = (date: Date | null) => {
    if (date != null) {
      const offset = date.getTimezoneOffset() * 60000;
      const newDate = new Date(date.getTime() - offset).toISOString().split("T")[0];
      const diffInTime = new Date(params.endDate).getTime() - new Date(newDate).getTime();
      const diffInDays = diffInTime / (1000 * 60 * 60 * 24);
      console.log(diffInDays)
      if(diffInDays > 31) {
        showToast(`Range date can't be more than 31 days`, "error");
        const adjustedEndDate = new Date(newDate);
        adjustedEndDate.setDate(adjustedEndDate.getDate() + 31);
        setParams({ ...params, startDate: newDate, 
          endDate: adjustedEndDate.toISOString().split("T")[0], start: 0});
        return;
      } else if(diffInDays < 0) {
        showToast(`Range date can't be less than 1 days`, "error");
        return;
      }
      setParams({ ...params, startDate:  newDate, start: 0});
    }
  };
  
  const onEndDateChange = (date: Date | null) => {
    if (date != null) {
      const offset = date.getTimezoneOffset() * 60000;
      const newDate = new Date(date.getTime() - offset).toISOString().split("T")[0];
      const diffInTime = new Date(newDate).getTime() - new Date(params.startDate).getTime();
      const diffInDays = diffInTime / (1000 * 60 * 60 * 24);
      if(diffInDays > 31) {
        showToast(`Range date can't be more than 31 days`, "error");
        const adjustedStartDate = new Date(newDate);
        adjustedStartDate.setDate(adjustedStartDate.getDate() - 31);
        setParams({ ...params, startDate: adjustedStartDate.toISOString().split("T")[0], 
          endDate: newDate, start: 0 });
        return;
      } else if(diffInDays < 0) {
        showToast(`Range date can't be less than 1 days`, "error");
        return;
      }
      setParams({ ...params, startDate:  newDate, start: 0 });
    }
  };
  
  useEffect(() => {
    if(warehouse.id != 0) {
      setParams({ ...params, warehouseId: warehouse.id, start: 0 })
    } else {
      setParams({ ...params, warehouseId: null, start: 0 })
    }
  }, [warehouse])

  useEffect(() => {
    if(product.id != 0) {
      setParams({ ...params, productId: product.id, start: 0 })
    } else {
      setParams({ ...params, productId: null, start: 0 })
    }
  }, [product])

  const handleDownload = () => {
    if(reports && reports?.data.length > 0) {
      downloadReport({ creationData: params as StockReportRequest })
    } else {
      showToast("Can't download empty report", "error");
    }
  }

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-center mb-4">
        <div>
          <Label htmlFor="from" className="font-medium">From: </Label>
          <Datepicker name="from" className="w-full"
            value={new Date(params.startDate)} onChange={(e)=>onStartDateChange(e)} />
        </div>
        <div>
          <Label htmlFor="to" className="font-medium">To: </Label>
          <Datepicker name="to" className="w-full"
            value={new Date(params.endDate)} onChange={(e)=>onEndDateChange(e)} />
        </div>
        <div>
          <Label htmlFor="product" className="font-medium">Product: </Label>
          <ProductSelect session={session} product={product} setProduct={setProduct} />
        </div>
        <button className={cn("bg-shelf-blue w-15 text-white py-2 px-5 mt-5", 
            "rounded-lg h-10 flex items-center justify-center")} type="button" 
            onClick={handleDownload}>Download</button>
      </div>
      <div className="overflow-x-auto">
        <StockReportTable reports={reports} isLoading={isLoading} error={error} />
        <div className="flex overflow-x-auto sm:justify-end">
          <Pagination
            currentPage={params.start / params.length + 1}
            totalPages={
              reports?.recordsFiltered
                ? Math.ceil(reports?.recordsFiltered / params.length)
                : 1
            }
            onPageChange={onPageChange}
            showIcons
          />
        </div>
      </div>
    </>
  )
}

export default StockReport;