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
  Button
} from "flowbite-react";

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
      let newDate = new Date(date.getTime() - offset).toISOString().split("T")[0];
      const diffInTime = new Date(params.endDate).getTime() - new Date(newDate).getTime();
      const diffInDays = diffInTime / (1000 * 60 * 60 * 24);
      console.log(diffInDays)
      if(diffInDays > 31) {
        showToast(`Range date can't be more than 31 days`, "error");
        return;
      } else if(diffInDays < 0) {
        showToast(`Range date can't be less than 1 days`, "error");
        return;
      }
      setParams({ ...params, startDate:  newDate});
    }
  };
  
  const onEndDateChange = (date: Date | null) => {
    if (date != null) {
      const offset = date.getTimezoneOffset() * 60000;
      let newDate = new Date(date.getTime() - offset).toISOString().split("T")[0];
      const diffInTime = new Date(newDate).getTime() - new Date(params.startDate).getTime();
      const diffInDays = diffInTime / (1000 * 60 * 60 * 24);
      if(diffInDays > 31) {
        showToast(`Range date can't be more than 31 days`, "error");
        return;
      } else if(diffInDays < 0) {
        showToast(`Range date can't be less than 1 days`, "error");
        return;
      }
      setParams({ ...params, startDate:  newDate});
    }
  };
  
  useEffect(() => {
    if(warehouse.id != 0) {
      setParams({ ...params, warehouseId: warehouse.id })
    } else {
      setParams({ ...params, warehouseId: null })
    }
  }, [warehouse])

  useEffect(() => {
    if(product.id != 0) {
      setParams({ ...params, productId: product.id })
    } else {
      setParams({ ...params, productId: null })
    }
  }, [product])

  const handleDownload = () => {
    if(reports && reports?.data.length > 0) {
      downloadReport({ creationData: params })
    } else {
      showToast("Can't download empty report", "error");
    }
  }

  return (
    <>
      <div className="flex justify-between max-lg:flex-col max-lg:items-start">
        <div className="flex flex-wrap gap-2 items-center max-md:flex-col max-md:items-start mb-2">
        <div className="flex gap-2 items-center">
            <Label htmlFor="from" className="font-medium">From: </Label>
            <Datepicker name="from" className="max-w-44"
              value={new Date(params.startDate)} onChange={(e)=>onStartDateChange(e)} />
          </div>
          <div className="flex gap-2 items-center">
            <Label htmlFor="to" className="font-medium">To: </Label>
            <Datepicker name="to" className="max-w-44"
              value={new Date(params.endDate)} onChange={(e)=>onEndDateChange(e)} />
          </div>
          <div className="flex gap-2 items-center">
            <Label htmlFor="product" className="font-medium">Product: </Label>
            <ProductSelect session={session} product={product} setProduct={setProduct} />
          </div>
          <Button onClick={handleDownload}>Download</Button>
        </div>
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