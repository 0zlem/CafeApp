"use client";
import { useCart } from "@/components/CardContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getProducts } from "@/services/productService";
import { useEffect, useState } from "react";
import { MdAddShoppingCart } from "react-icons/md";

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts();

      setProducts(data);
    };

    fetchProducts();
  }, []);
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center mt-12">
        {products?.map((item: any) => (
          <Card
            key={item.id}
            className="bg-[#fff6cc] border-none rounded-2xl p-4 w-[350px] shadow-md shadow-[#483C32]
                       flex flex-row! items-center justify-between gap-4"
          >
            <div className="flex flex-col gap-4 w-[60%]">
              <div>
                <h2 className="font-semibold text-xl text-[#483C32]">
                  {item.name}
                </h2>

                <p className="text-md text-[#6a5f55]">{item.description}</p>
              </div>

              <p className="font-semibold text-[#483C32]">{item.price} ₺</p>

              <Button
                onClick={() =>
                  addToCart({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    imageUrl: item.imageUrl,
                  })
                }
                className="w-fit flex items-center gap-2 bg-[#483C32] px-3 py-1 rounded-xl shadow border border-[#e5dcc6] text-white cursor-pointer"
              >
                Add <MdAddShoppingCart />
              </Button>
            </div>

            <img
              src={item.imageUrl}
              alt={item.name}
              width={150}
              height={150}
              className="rounded-xl object-cover shrink-0"
            />
          </Card>
        ))}
      </div>
    </div>
  );
}
