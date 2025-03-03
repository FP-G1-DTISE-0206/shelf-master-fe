"use client"
import React, { useState } from "react";
import { AssignedWarehouse } from "@/types/product";
import { useSession } from "next-auth/react";
import WarehouseSelect from "../product-mutation/components/WarehouseSelect";
import SalesCards from "./components/SalesCards";
import SalesGraphs from "./components/SalesGraphs";
import BestSellers from "./components/BestSellers";

const Dashboard = () => {
  const [warehouse, setWarehouse] = useState<AssignedWarehouse>({ id: 0, name: "All" });
  const { data: session } = useSession();

  return (
    <>
      <div className="w-full flex bg-gray-100 text-black">
        <div className="w-full p-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <div className="flex items-center gap-4">
              <WarehouseSelect isAllowedAll={true}
                session={session} warehouse={warehouse} setWarehouse={setWarehouse} />
            </div>
          </div>

          <SalesCards session={session} warehouse={warehouse} />

          <div className="w-full flex flex-col md:flex-row gap-2 mt-6">
            <SalesGraphs session={session} warehouse={warehouse} />
            <BestSellers session={session} warehouse={warehouse} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
