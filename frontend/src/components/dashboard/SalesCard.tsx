import React from "react";

export default function SalesCard() {
  const totalSales = 1250;
  const monthlySales = 4520;
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-2">Toplam Satış</h2>
      <p className="text-2xl font-bold">{totalSales} ₺</p>
      <p className="text-gray-500 mt-1">Bu ay: {monthlySales} ₺</p>
    </div>
  );
}
