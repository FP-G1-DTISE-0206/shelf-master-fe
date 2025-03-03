import { FC, useEffect } from 'react'
import { Card, Button } from "flowbite-react";
import { Session } from "next-auth";
import { AssignedWarehouse } from "@/types/product";
import useBestSellers from '@/hooks/report/useBestSellers';
import Link from 'next/link';

interface BestSellersProps {
  session: Session | null;
  warehouse: AssignedWarehouse;
}

const BestSellers: FC<BestSellersProps> = ({
  session,
  warehouse,
}) => {
  const {params, setParams, populars} = useBestSellers(session?.accessToken as string)
  useEffect(() => {
    setParams({ ...params, warehouseId: warehouse.id })
  }, [warehouse])

  const currencyFormatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    currencySign: 'accounting',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });

  return (
    <>
      <Card className="w-full md:w-1/3">
        <h2 className="text-lg font-bold mb-4">Best Sellers</h2>
        <ul className="min-h-72">
          {populars?.map((product) => (
            <li key={product.id} className="flex justify-between items-center mb-3">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-200 rounded-lg mr-4"></div>
                <div>
                  <p className="font-bold">{product.name}</p>
                  <p className="text-sm text-gray-500">
                    {currencyFormatter.format(product.price)}
                  </p>
                </div>
              </div>
              <span className="font-bold">{product.quantity}&nbsp;sales</span>
            </li>
          ))}
        </ul>
        <Button as={Link} href="/report"
          className="w-full bg-blue-500 text-white py-2 rounded-lg mt-4">
          Report
        </Button>
      </Card>
    </>
  )
}

export default BestSellers;