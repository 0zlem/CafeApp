"use client";

import { useEffect, useState } from "react";
import CustomerOrderView from "@/components/orders/CustomerOrderView";
import { getActiveOrdersByTable } from "@/services/OrderService";

export default function OrdersPage() {
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    const tableId = localStorage.getItem("tableId");
    if (!tableId) return;

    const fetchOrder = () => {
      getActiveOrdersByTable(tableId)
        .then(setOrder)
        .catch(() => setOrder(null));
    };

    fetchOrder();

    const interval = setInterval(fetchOrder, 3000);
    return () => clearInterval(interval);
  }, []);

  if (!order) {
    return (
      <div className="p-6 text-center text-gray-500">
        Aktif sipariş bulunamadı 🍽️
      </div>
    );
  }

  return (
    <div className="p-4">
      <CustomerOrderView order={order} />
    </div>
  );
}
