import { FC, useEffect } from 'react'
import { Session } from "next-auth";
import { AssignedWarehouse } from "@/types/product";
import StockReportTable from '../StockReportTable';
import useStockReport from '@/hooks/report/useStockReport';
import { useToast } from "@/providers/ToastProvider";
import {
  Datepicker,
  Pagination,
  Label
} from "flowbite-react";

interface StockReportProps {
  session: Session | null;
  warehouse: AssignedWarehouse;
}

const StockReport: FC<StockReportProps> = ({
  session,
  warehouse,
}) => {
  const { 
    setParams, params, isLoading, error, reports 
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
        return;
      } else if(diffInDays < 0) {
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

  return (
    <>
      <div className="flex justify-between max-lg:flex-col max-lg:items-start">
        <div className="flex gap-2 items-center max-md:flex-col max-md:items-start mb-2">
          <Label htmlFor="from" className="font-medium">From: </Label>
          <Datepicker name="from" value={new Date(params.startDate)} onChange={(e)=>onStartDateChange(e)} />
          <Label htmlFor="to" className="font-medium">To: </Label>
          <Datepicker name="to" value={new Date(params.endDate)} onChange={(e)=>onEndDateChange(e)} />
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