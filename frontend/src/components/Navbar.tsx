"use client";
import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "./ui/button";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCartOutlined";
import { IoMdAdd, IoMdRemove } from "react-icons/io";
import { useCart } from "./CardContext";
import { useRouter } from "next/navigation";
import { getCategories } from "@/services/CategoryService";

export default function Navbar() {
  const [categories, setCategories] = useState<any[]>([]);
  const { cart, addToCart, removeFromCart, totalPrice } = useCart();
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  const router = useRouter();

  useEffect(() => {
    getCategories().then((data) => setCategories(data));
  }, []);

  const addOrders = async () => {
    if (totalQuantity != 0) {
      router.push("/orders");
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-2 p-3">
      <div className="w-full flex justify-between items-center px-2">
        <Link href={"/"}>
          {" "}
          <img
            src="/logo1.png"
            alt="/logo.png"
            width={70}
            height={70}
            className="shrink-0"
          />
        </Link>

        <Menubar className="hidden md:flex bg-[#483c32] text-white h-14 gap-4 px-4 rounded-xl">
          {categories.map((cat) => (
            <MenubarMenu key={cat.id}>
              <MenubarTrigger className="hover:bg-[#fefae0] hover:text-black h-10 font-bold text-md">
                <Link href={`/category/${cat.id}`}>{cat.name}</Link>
              </MenubarTrigger>
            </MenubarMenu>
          ))}
        </Menubar>

        <Drawer>
          <DrawerTrigger className="flex items-center gap-3 bg-[#483c32] text-white font-bold text-md h-10 px-4 rounded-2xl shadow-lg relative cursor-pointer">
            <div className="relative">
              <ShoppingCartIcon className="text-white" />

              <span className="absolute -top-1 -right-2 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {totalQuantity}
              </span>
            </div>
          </DrawerTrigger>

          <DrawerContent className="p-4">
            <DrawerHeader className="pb-2">
              <DrawerTitle className="text-xl font-bold">Orders</DrawerTitle>
            </DrawerHeader>

            <div className="space-y-4 max-h-72 overflow-y-auto pr-2">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 bg-[#fff6cc] p-3 rounded-xl shadow"
                >
                  <img
                    src={item.imageUrl}
                    className="w-14 h-14 rounded-xl object-cover"
                  />

                  <div className="flex-1">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm">{item.price} ₺</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      onClick={() => removeFromCart(item.id)}
                      className="w-7 h-7 rounded-full bg-[#483c32] flex items-center justify-center"
                    >
                      <IoMdRemove />
                    </Button>
                    <span>{item.quantity}</span>
                    <Button
                      onClick={() =>
                        addToCart({
                          id: item.id,
                          name: item.name,
                          price: item.price,
                          imageUrl: item.imageUrl,
                        })
                      }
                      className="w-7 h-7 rounded-full bg-[#483c32] flex items-center justify-center"
                    >
                      <IoMdAdd />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between text-lg font-bold mb-4 px-1">
              <span>Total:</span>
              <span>{totalPrice} ₺</span>
            </div>

            <DrawerFooter className="mt-6">
              <span>
                Once the order is created, you can pay later at the checkout.
                Enjoy!
              </span>
              <Link href="/orders" className="w-full">
                <Button
                  type="button"
                  className="w-full bg-yellow-400 text-black hover:bg-yellow-300 font-bold py-6 text-lg rounded-2xl cursor-pointer"
                >
                  Proceed to Checkout
                </Button>
              </Link>

              <DrawerClose asChild>
                <Button variant="outline" className="w-full cursor-pointer">
                  Cancel
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>

      <div className="md:hidden w-full overflow-x-auto flex gap-4 p-2 bg-[#483c32] text-white rounded-xl scrollbar-none">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/category/${cat.id}`}
            className="whitespace-nowrap py-2 px-4 bg-[#5c4e45] rounded-lg font-semibold hover:bg-[#fefae0] hover:text-black"
          >
            {cat.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
