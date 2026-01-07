"use client";

import OrdersKanban from "@/components/kitchens/OrdersKanban";

export default function Orders() {
  return (
    <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center p-4 sm:p-6 gap-4 sm:gap-6">
      <OrdersKanban />
    </div>
  );
}
