"use client"
import { FC, useState } from "react";
import { AssignedWarehouse } from "@/types/product";
import { useSession } from "next-auth/react";
import WarehouseSelect from '../product-mutation/components/WarehouseSelect';
import { Tabs } from "flowbite-react";
import SalesReport from "./components/SalesReport";
import StockReport from "./components/StockReport";

const ReportPage: FC = () => {
  const [warehouse, setWarehouse] = useState<AssignedWarehouse>({ id: 0, name: "All" });
  const { data: session } = useSession();

  return (
    <>
      <div className="w-full flex bg-gray-100 text-black">
        <div className="w-full p-6">
          <div className="flex justify-end items-center">
            <div className="flex items-center gap-4">
              <WarehouseSelect isAllowedAll={true}
                session={session} warehouse={warehouse} setWarehouse={setWarehouse} />
            </div>
          </div>
          <div className="w-full min-h-[70vh]">
            <Tabs aria-label="Tabs with underline" variant="underline">
              <Tabs.Item active title="Sales Report">
                <SalesReport session={session} warehouse={warehouse} />
              </Tabs.Item>
              <Tabs.Item title="Stock Report">
                <StockReport session={session} warehouse={warehouse} />
              </Tabs.Item>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  )
}

export default ReportPage;