import {
  getActiveOrders,
  KitchenOrder,
  setOrderPaid,
  setOrderPreparing,
  setOrderReady,
  setOrderServed,
} from "@/services/OrderService";
import { useEffect, useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { toast } from "sonner";

export default function OrdersKanban() {
  const [orders, setOrders] = useState<KitchenOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastPayment, setLastPayment] = useState<{
    tableName: string;
    totalAmount: number;
    paymentType: number;
    time: string;
  } | null>(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const data = await getActiveOrders();
      console.log("Fetched orders:", data);
      setOrders(data);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();

    const interval = setInterval(() => {
      fetchOrders();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleMoveToServed = async (orderId: string) => {
    try {
      const result = await setOrderServed(orderId);
      console.log("setOrderServed result:", result);

      await fetchOrders();
    } catch (err) {
      console.error(err);
      alert("Sipariş servis durumuna alınamadı");
    }
  };

  const handleMoveToPaid = async (order: KitchenOrder, paymentType: number) => {
    try {
      await setOrderPaid(order.id, paymentType);
      await fetchOrders();

      setLastPayment({
        tableName: order.tableName,
        totalAmount: order.totalAmount,
        paymentType,
        time: new Date().toLocaleTimeString("tr-TR", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      });

      setTimeout(() => {
        setLastPayment(null);
      }, 7000);
    } catch (err) {
      console.error(err);
      alert("Sipariş ödeme durumuna alınamadı");
    }
  };

  const readyOrders = orders.filter((o) => o.status === 2);
  const servedOrders = orders.filter((o) => o.status === 3);
  const paidOrders = orders.filter((o) => o.status === 5);

  if (loading && orders.length === 0) {
    return (
      <div className="p-6 text-muted-foreground">Loading kitchen orders...</div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-6 p-6">
      {/* Ready ORDERS */}
      <div className="bg-muted/40 rounded-3xl p-4">
        <h2 className="mb-4 font-semibold text-lg">
          Ready Orders{" "}
          <span className="text-muted-foreground text-sm">
            ({readyOrders.length})
          </span>
        </h2>

        <div className="space-y-4">
          {readyOrders.map((order) => (
            <Card key={order.id} className="rounded-2xl bg-[#fff6cc]">
              <CardContent className="p-4 space-y-3">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span className="font-semibold text-primary text-lg">
                    Masa: {order.tableName}
                  </span>
                  <span>Total: {order.totalAmount}₺</span>
                </div>

                <div className="space-y-1">
                  {order.items.map((item, i) => (
                    <div key={i} className="text-sm flex justify-between">
                      <span>
                        <span className="font-semibold px-2">
                          {item.quantity}x
                        </span>
                        {item.productName}
                      </span>
                      <span className="text-muted-foreground px-8">
                        {item.price}₺
                      </span>
                    </div>
                  ))}
                </div>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button className="w-full rounded-xl bg-[#483C32] cursor-pointer">
                      Move to Served
                    </Button>
                  </AlertDialogTrigger>

                  <AlertDialogContent className="max-w-md">
                    <AlertDialogHeader>
                      <AlertDialogTitle className="flex justify-between">
                        <span>Masa: {order.tableName}</span>
                        <span>{order.totalAmount}₺</span>
                      </AlertDialogTitle>

                      <AlertDialogDescription asChild>
                        <div className="space-y-2 mt-4 text-black">
                          {order.items.map((item, i) => (
                            <div
                              key={i}
                              className="flex justify-between text-sm"
                            >
                              <span>
                                <strong>{item.quantity}x</strong>{" "}
                                {item.productName}
                              </span>
                              <span>{item.price}₺</span>
                            </div>
                          ))}
                        </div>
                      </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter>
                      <AlertDialogCancel className="bg-secondary cursor-pointer">
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction
                        className="bg-[#483c32] cursor-pointer"
                        onClick={() => handleMoveToServed(order.id)}
                      >
                        Servis Et
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Served */}
      <div className="bg-muted/40 rounded-3xl p-4">
        <h2 className="mb-4 font-semibold text-lg">
          Served{" "}
          <span className="text-muted-foreground text-sm">
            ({servedOrders.length})
          </span>
        </h2>

        <div className="space-y-4">
          {servedOrders.map((order) => (
            <Card key={order.id} className="rounded-2xl bg-[#fff6cc]">
              <CardContent className="p-4 space-y-3">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span className="font-semibold text-primary text-lg">
                    Masa: {order.tableName}
                  </span>
                  <span>Total: {order.totalAmount}₺</span>
                </div>

                <div className="space-y-1">
                  {order.items.map((item, i) => (
                    <div key={i} className="text-sm flex justify-between">
                      <span>
                        <span className="font-semibold px-2">
                          {item.quantity}x
                        </span>{" "}
                        {item.productName}
                      </span>
                      <span className="text-muted-foreground px-8">
                        {item.price}₺
                      </span>
                    </div>
                  ))}
                </div>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button className="w-full rounded-xl bg-[#483c32] cursor-pointer">
                      Ödeme Al
                    </Button>
                  </AlertDialogTrigger>

                  <AlertDialogContent className="max-w-sm">
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Masa: {order.tableName}
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        Ödeme tipini seç
                      </AlertDialogDescription>
                    </AlertDialogHeader>

                    <div className="flex gap-3 mt-4">
                      <Button
                        className="flex-1 bg-green-800 cursor-pointer"
                        onClick={() => handleMoveToPaid(order, 0)}
                      >
                        💵 Nakit
                      </Button>

                      <Button
                        className="flex-1 bg-blue-800 cursor-pointer"
                        onClick={() => handleMoveToPaid(order, 1)}
                      >
                        💳 Kart
                      </Button>
                    </div>

                    <AlertDialogFooter>
                      <AlertDialogCancel>İptal</AlertDialogCancel>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Paid */}
      {lastPayment && (
        <div className="fixed bottom-6 right-6 z-50 ">
          <Card className="rounded-2xl shadow-xl w-64 bg-[#fff6cc] text-center">
            <CardContent className="p-2 space-y-1 ">
              <div className="font-semibold text-xl">
                Masa: {lastPayment.tableName}
              </div>

              <div>Tutar: {lastPayment.totalAmount}₺</div>

              <div>
                Ödeme: {lastPayment.paymentType === 0 ? "Nakit" : "Kart"}
              </div>

              <div className="text-muted-foreground ">
                Saat: {lastPayment.time}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
