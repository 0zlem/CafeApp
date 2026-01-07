"use client";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { toast } from "sonner";
import { getSalesOverview, SalesOverview } from "@/services/DashboardService";

export default function SalesCard() {
  const [data, setData] = useState<SalesOverview[]>([]);

  useEffect(() => {
    getSalesOverview()
      .then((sales) =>
        setData(
          sales.map((s) => ({
            ...s,
            date: new Date(s.date).toLocaleDateString("tr-TR"),
          }))
        )
      )
      .catch(() => toast.error("Satış verileri yüklenemedi"));
  }, []);

  return (
    <div className="bg-[#fff6cc] rounded-xl shadow-lg p-4 h-[360px] flex flex-col">
      <h2 className="font-bold text-lg mb-2 text-center">Sales Overview</h2>

      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis dataKey="date" tickLine={false} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="totalOrders"
              stroke="#1E40AF"
              strokeWidth={2}
              dot={{ r: 3 }}
            />
            <Line
              type="monotone"
              dataKey="totalRevenue"
              stroke="#F97316"
              strokeWidth={2}
              dot={{ r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
