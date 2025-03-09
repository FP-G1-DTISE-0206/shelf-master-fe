import { FC, useEffect, useState } from 'react'
import { Session } from "next-auth";
import { AssignedWarehouse, ProductResponse } from "@/types/product";
import { CategoryResponse } from '@/types/category';
import SalesReportTable from '../SalesReportTable';
import useSalesReport from '@/hooks/report/useSalesReport';
import { useToast } from "@/providers/ToastProvider";
import ProductSelect from '../ProductSelect';
import CategorySelect from '../CategorySelect';
import {
  Datepicker,
  Pagination,
  Label,
} from "flowbite-react";
import { cn } from '@/utils';

interface SalesReportProps {
  session: Session | null;
  warehouse: AssignedWarehouse;
}

const SalesReport: FC<SalesReportProps> = ({
  session,
  warehouse,
}) => {
  const [ product, setProduct ] = useState<ProductResponse>({
    id: 0, name:"All Product", price: 0, quantity: 0, image: { id: 0, imageUrl: ""}
  })
  const [ category, setCategory ] = useState<CategoryResponse>({ id: 0, name:"All Category", })
  const { 
    setParams, params, isLoading, error, reports, downloadReport, 
  } = useSalesReport(session?.accessToken as string)
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
          endDate: adjustedEndDate.toISOString().split("T")[0]});
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
      const newDate = new Date(date.getTime() - offset).toISOString().split("T")[0];
      const diffInTime = new Date(newDate).getTime() - new Date(params.startDate).getTime();
      const diffInDays = diffInTime / (1000 * 60 * 60 * 24);
      if(diffInDays > 31) {
        showToast(`Range date can't be more than 31 days`, "error");
        const adjustedStartDate = new Date(newDate);
        adjustedStartDate.setDate(adjustedStartDate.getDate() - 31);
        setParams({ ...params, startDate: adjustedStartDate.toISOString().split("T")[0], 
          endDate: newDate });
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
  
  useEffect(() => {
    if(category.id != 0) {
      setParams({ ...params, categoryId: category.id })
    } else {
      setParams({ ...params, categoryId: null })
    }
  }, [category])

  const handleDownload = () => {
    if(reports && reports?.data.length > 0) {
      downloadReport({ creationData: params })
    } else {
      showToast("Can't download empty report", "error");
    }
  }

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 items-center mb-4">
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
          <div>
            <Label htmlFor="category" className="font-medium">Category: </Label>
            <CategorySelect session={session} category={category} setCategory={setCategory} />
          </div>
          <button className={cn("bg-shelf-blue w-15 text-white py-2 px-5 md:mt-5", 
            "rounded-lg h-10 flex items-center justify-center")} type="button" 
              onClick={handleDownload}>Download</button>
      </div>
      <div className="overflow-x-auto">
        <SalesReportTable reports={reports} isLoading={isLoading} error={error} />
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

export default SalesReport;