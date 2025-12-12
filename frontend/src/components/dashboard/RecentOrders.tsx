import React from "react";

export default function RecentOrders() {
  const orders = [
    { id: "001", customer: "Ahmet", total: "35 ₺", status: "Hazırlanıyor" },
    { id: "002", customer: "Ayşe", total: "28 ₺", status: "Teslim Edildi" },
    { id: "003", customer: "Mehmet", total: "42 ₺", status: "Hazırlanıyor" },
  ];
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-2">Son Siparişler</h2>
      <ul className="space-y-1">
        {orders.map((o) => (
          <li key={o.id} className="flex justify-between">
            <span>
              {o.customer} ({o.id})
            </span>
            <span>
              {o.total} -{" "}
              <span
                className={
                  o.status === "Hazırlanıyor"
                    ? "text-yellow-600"
                    : "text-green-600"
                }
              >
                {o.status}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
