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
import { getTopProducts } from "@/services/DashboardService";

export default function PopularProducts() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    getTopProducts().then(setData);
  }, []);

  return (
    <div className="bg-[#fff6cc] rounded-xl shadow-lg p-4 h-[360px] flex flex-col">
      <h2 className="font-bold text-lg mb-4 text-center">
        Top Selling Products
      </h2>

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
              tickLine={false}
              axisLine={false}
            />

            <XAxis type="number" tickLine={false} axisLine={false} />

            <Tooltip />

            <Bar
              dataKey="quantitySold"
              barSize={18}
              radius={[0, 6, 6, 0]}
              fill="#483C32"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
