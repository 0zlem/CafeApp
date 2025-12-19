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
import { getTopProducts } from "@/services/DashboardService";

export interface TopProduct {
  productId: string;
  productName: string;
  quantitySold: number;
}

export default function PopularProducts() {
  const [data, setData] = useState<TopProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopProducts = async () => {
      try {
        const res = await getTopProducts();
        setData(res);
      } catch (err) {
        console.error("Error fetching top products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTopProducts();
  }, []);

  if (loading) return <p>Loading top products...</p>;
  if (!data.length) return <p>No top products found.</p>;

  return (
    <div className="p-4 bg-[#fff6cc] rounded-lg shadow-lg w-full h-[350px]">
      <h2 className="font-bold text-lg mb-4 text-center">
        Top Selling Products
      </h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ left: 50, right: 20 }}
        >
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <XAxis type="number" tickLine={false} />
          <Tooltip />
          <Bar
            dataKey="quantitySold"
            fill="var(--color-primary)"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
