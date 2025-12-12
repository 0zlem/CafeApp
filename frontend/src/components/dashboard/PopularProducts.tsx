import React from "react";

export default function PopularProducts() {
  const products = [
    { name: "Latte", sold: 25 },
    { name: "Cappuccino", sold: 18 },
    { name: "Mocha", sold: 12 },
  ];
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-2">Popüler Ürünler</h2>
      <ul className="space-y-1">
        {products.map((p) => (
          <li key={p.name} className="flex justify-between">
            <span>{p.name}</span>
            <span className="font-bold">{p.sold} adet</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
