"use client";

import { useEffect, useState } from "react";
import { LineChart, Line, CartesianGrid, XAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from "@/components/ui/chart";

import { toast } from "sonner";
import { getSalesOverview, SalesOverview } from "@/services/DashboardService";

const chartConfig: ChartConfig = {
  totalOrders: { label: "Total Orders", color: "var(--color-primary)" },
  totalRevenue: { label: "Revenue", color: "var(--color-secondary)" },
};

export default function SalesCard() {
  const [data, setData] = useState<SalesOverview[]>([]);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const sales = await getSalesOverview();

        setData(
          sales.map((s) => ({
            ...s,
            date: new Date(s.date).toLocaleDateString("tr-TR"),
          }))
        );
      } catch (err) {
        console.error(err);
        toast.error("Satış verileri yüklenirken hata oluştu!");
      }
    };
    fetchSales();
  }, []);

  return (
    <div className="bg-gray-300">
      <ChartContainer config={chartConfig}>
        <LineChart data={data} margin={{ left: 12, right: 12 }}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
          />
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          <Line
            dataKey="totalOrders"
            type="monotone"
            stroke="#1E40AF"
            strokeWidth={2}
            dot={{ r: 3 }}
          />
          <Line
            dataKey="totalRevenue"
            type="monotone"
            stroke="#F97316"
            strokeWidth={2}
            dot={{ r: 3 }}
          />
        </LineChart>
      </ChartContainer>
    </div>
  );
}
