import { OrderStatus } from "@/enums/OrderStatus";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import OrderStatusTimeline from "./OrderStatusTimeline";

export default function CustomerOrderView({
  order,
}: {
  order: {
    id: string;
    status: OrderStatus;
    totalAmount: number;
    items: {
      productName: string;
      quantity: number;
      price: number;
    }[];
  };
}) {
  return (
    <div className="p-4 rounded-xl border shadow-sm space-y-4">
      <h2 className="font-bold text-xl">Sipariş Durumu</h2>

      <OrderStatusTimeline status={order.status} />
      <Card>
        <CardHeader>
          <CardTitle>Sipariş İçeriği</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {order.items.map((item: any, i: any) => (
              <div key={i} className="flex justify-between text-sm">
                <span>
                  {item.productName} x {item.quantity}
                </span>
                <span>₺{item.price * item.quantity}</span>
              </div>
            ))}
          </div>
          <div className="mt-5">
            <hr />
            <p className="text-sm font-bold">
              Toplam Tutar: ₺{order.totalAmount}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
