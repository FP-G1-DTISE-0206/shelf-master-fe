import { FC, useEffect } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxOpen } from "@fortawesome/free-solid-svg-icons";
import { Card, Spinner } from "flowbite-react";
import { Session } from "next-auth";
import { AssignedWarehouse } from "@/types/product";
import useSalesCards from '@/hooks/report/useSalesCards';

interface SalesCardsProps {
  session: Session | null;
  warehouse: AssignedWarehouse;
}

const SalesCards: FC<SalesCardsProps> = ({
  session,
  warehouse,
}) => {
  const { isLoading, error, params, setParams, cards } = useSalesCards(session?.accessToken as string);

  const currencyFormatter = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      currencySign: 'accounting',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
  });

  useEffect(() => {
    setParams({ ...params, warehouseId: warehouse.id })
  }, [warehouse])

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
        {isLoading && 
         (<>
          <Card key={0}><Spinner/></Card>
          <Card key={1}><Spinner/></Card>
          <Card key={2}><Spinner/></Card>
         </>)
        }
        {!isLoading && error && (<>{error.message}</>)}
        {!isLoading && cards?.map((card, index) => (
          <Card key={index}>
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold">
                  {currencyFormatter.format(card.income == null ? 0 : card.income)}
                </h2>
                <p className="text-sm text-gray-500">
                  { index == 0 ? "This Week Orders" : index == 1 ? "This Month Orders" : "This Year Orders" }
                </p>
              </div>
              <FontAwesomeIcon icon={faBoxOpen} className="text-blue-500 text-2xl w-5" />
            </div>
            <p className="text-sm text-gray-500 mt-2">
              { (card.percentage == null || card.percentage >= 100) && (
                <span className="text-green-500 font-bold">100% ↑</span>
              )}
              { card.percentage != null && card.percentage >= 0 && card.percentage < 100 && (
                <span className="text-green-500 font-bold">{card.percentage?.toFixed(2) ?? "0.00"}% ↑</span>
              )}
              { card.percentage != null && card.percentage < 0 && card.percentage >= -100 && (
                <span className="text-red-500 font-bold">{card.percentage?.toFixed(2) ?? "0.00"}% ↓</span>
              )}
              { card.percentage != null && card.percentage < -100 && (
                <span className="text-red-500 font-bold">-100% ↓</span>
              )}
              <span>&nbsp;Compared to Last&nbsp;{index === 0 ? "Week" : index === 1 ? "Month" : "Year"}</span>
            </p>
          </Card>
        ))}
      </div>
    </>
  )
}

export default SalesCards;