"use client";

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { getStockOverview } from "@/services/DashboardService";

export default function StockAlerts() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    getStockOverview().then(setData);
  }, []);

  const lowStock = data.filter((x) => x.isLowStock);

  return (
    <div className="bg-[#fff6cc] rounded-xl shadow-lg  h-[680px] flex flex-col">
      <h2 className="font-bold text-lg mb-2 text-center">Stock Overview</h2>

      {lowStock.length > 0 && (
        <div className="mb-4 text-sm text-red-600">
          {lowStock.map((i) => (
            <div key={i.productId}>
              ⚠ {i.productName} ({i.stock})
            </div>
          ))}
        </div>
      )}

      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 10, right: 20, left: 120, bottom: 10 }}
          >
            <CartesianGrid horizontal={false} strokeDasharray="3 3" />

            <YAxis
              dataKey="productName"
              type="category"
              width={110}
              tickLine={true}
              axisLine={true}
            />

            <XAxis type="number" tickLine={true} axisLine={false} />

            <Tooltip />

            <Bar
              className="p-10"
              dataKey="stock"
              barSize={18}
              radius={[0, 6, 10, 0]}
              fill="#09053D"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
