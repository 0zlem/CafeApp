import { Card } from "@/components/ui/card";
import { Button } from "./ui/button";
import { MdAddShoppingCart } from "react-icons/md";
import { useCart } from "./CardContext";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  categoryName: string;
}
export interface CartItem {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

export default function MenuCard({
  products,
  category,
}: {
  products: Product[];
  category: string;
}) {
  const { addToCart } = useCart();
  return (
    <div className="grid col-span-2 items-center gap-2">
      <h1 className="text-3xl text-center mt-8 mb-4 bg-[#fff6cc] p-2 shadow-md font-bold text-[#483C32]">
        {category}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
        {products?.map((item) => (
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
              src={`http://localhost:5134${item.imageUrl}`}
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
