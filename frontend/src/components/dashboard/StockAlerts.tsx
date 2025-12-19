"use client";

import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { getStockOverview, StockOverview } from "@/services/DashboardService";

export default function StockAlerts() {
  const [data, setData] = useState<StockOverview[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStock = async () => {
      try {
        const res = await getStockOverview();
        setData(res);
      } catch (err) {
        console.error("Error fetching stock overview:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStock();
  }, []);

  if (loading) return <p>Loading stock data...</p>;
  if (!data.length) return <p>No stock data found.</p>;

  return (
    <div className="p-4 bg-[#fff6cc] rounded-lg shadow-lg w-full h-[350px]">
      <h2 className="font-bold text-lg mb-4 text-center">Stock Overview</h2>

      <ul className="mb-4">
        {data
          .filter((item) => item.isLowStock)
          .map((item) => (
            <li key={item.productId} className="text-red-600">
              Warning: {item.productName} stock is low ({item.stock})
            </li>
          ))}
      </ul>

      <ResponsiveContainer width="100%" height="70%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ left: 50, right: 20 }}
        >
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <XAxis type="number" tickLine={false} />
          <Tooltip />
          <Bar
            dataKey="stock"
            fill="var(--color-primary)"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
