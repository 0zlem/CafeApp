import React from "react";

export default function DashboardStats() {
  const stats = [
    { label: "Sipariş Sayısı", value: 87 },
    { label: "Ortalama Sipariş", value: "45 ₺" },
    { label: "Yeni Müşteri", value: 12 },
  ];
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-2">İstatistikler</h2>
      <div className="flex flex-col gap-2">
        {stats.map((stat) => (
          <div key={stat.label} className="flex justify-between">
            <span>{stat.label}</span>
            <span className="font-bold">{stat.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
