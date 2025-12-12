import React from "react";

export default function StockAlerts() {
  const lowStock = [
    { name: "Espresso Çekirdeği", stock: 3 },
    { name: "Süt", stock: 2 },
  ];
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-2">Stok Uyarıları</h2>
      {lowStock.length === 0 ? (
        <p>Stok durumu iyi</p>
      ) : (
        <ul>
          {lowStock.map((item) => (
            <li key={item.name} className="text-red-500">
              {item.name}: {item.stock} adet kaldı
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
