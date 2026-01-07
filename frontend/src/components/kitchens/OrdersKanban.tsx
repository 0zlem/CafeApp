import {
  getActiveOrders,
  KitchenOrder,
  setOrderPreparing,
  setOrderReady,
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

export default function OrdersKanban() {
  const [orders, setOrders] = useState<KitchenOrder[]>([]);
  const [loading, setLoading] = useState(true);

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

  const handleMoveToPreparing = async (orderId: string) => {
    try {
      const result = await setOrderPreparing(orderId);
      console.log("setOrderPreparing result:", result);

      await fetchOrders();
    } catch (err) {
      console.error(err);
      alert("Sipariş hazırlanıyor durumuna alınamadı");
    }
  };

  const handleMoveToReady = async (orderId: string) => {
    try {
      const result = await setOrderReady(orderId);
      console.log("setOrderReady result:", result);

      await fetchOrders();
    } catch (err) {
      console.error(err);
      alert("Sipariş hazır durumuna alınamadı");
    }
  };

  const newOrders = orders.filter((o) => o.status === 0);
  const preparingOrders = orders.filter((o) => o.status === 1);
  const readyOrders = orders.filter((o) => o.status === 2);

  if (loading && orders.length === 0) {
    return (
      <div className="p-6 text-muted-foreground">Loading kitchen orders...</div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-6 p-6">
      {/* NEW ORDERS */}
      <div className="bg-muted/40 rounded-3xl p-4">
        <h2 className="mb-4 font-semibold text-lg">
          New Orders{" "}
          <span className="text-muted-foreground text-sm">
            ({newOrders.length})
          </span>
        </h2>

        <div className="space-y-4">
          {newOrders.map((order) => (
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
                      Move to Preparing
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
                        onClick={() => handleMoveToPreparing(order.id)}
                      >
                        Hazırla
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* PREPARING */}
      <div className="bg-muted/40 rounded-3xl p-4">
        <h2 className="mb-4 font-semibold text-lg">
          Preparing{" "}
          <span className="text-muted-foreground text-sm">
            ({preparingOrders.length})
          </span>
        </h2>

        <div className="space-y-4">
          {preparingOrders.map((order) => (
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

                <Button
                  className="w-full rounded-xl bg-[#483c32] cursor-pointer"
                  onClick={() => handleMoveToReady(order.id)}
                >
                  Mark as Ready
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* READY */}
      <div className="bg-muted/40 rounded-3xl p-4">
        <h2 className="mb-4 font-semibold text-lg">
          Ready{" "}
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
                        </span>{" "}
                        {item.productName}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
