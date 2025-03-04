import { FC, useState, useEffect } from 'react'
import { Card, Button } from "flowbite-react";
import { LineChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Session } from "next-auth";
import { AssignedWarehouse } from "@/types/product";
import useMonthGraph from '@/hooks/report/useMonthGraph';
import useYearGraph from '@/hooks/report/useYearGraph';

interface SalesGraphsProps {
  session: Session | null;
  warehouse: AssignedWarehouse;
}

const SalesGraphs: FC<SalesGraphsProps> = ({
  session,
  warehouse,
}) => {
  const [ type, setType ] = useState<string>("Monthly")
  const { params, setParams, graph } = useMonthGraph(session?.accessToken as string)
  const { setYearParams, yearGraph } = useYearGraph(session?.accessToken as string)
  
  useEffect(() => {
    setParams({ ...params, warehouseId: warehouse.id })
    setYearParams({ ...params, warehouseId: warehouse.id })
  }, [warehouse])

  return (
    <>
      <Card className="w-full md:w-2/3 flex">
        <h2 className="text-lg font-bold mb-4">Sale Graph</h2>
        <Button.Group className="flex flex-wrap gap-4 mb-4">
          {["Monthly", "Yearly"].map((tab, idx) => (
            <Button
              key={idx}
              onClick={()=>setType(tab)}
              className={`px-4 py-2 rounded-lg ${
                tab === "Monthly" ? "bg-black text-white" : "bg-gray-600"
              }`}
            >
              {tab}
            </Button>
          ))}
        </Button.Group>
        <div className="rounded-lg">
          <Card className="max-w-lg mx-auto">
            <h2 className="text-xl font-semibold text-gray-800">{type} Sales</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={type == "Monthly" ? graph : yearGraph}>
                <XAxis dataKey="x" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="y" fill="#3b82f6" />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </div>
      </Card>
    </>
  )
}

export default SalesGraphs;