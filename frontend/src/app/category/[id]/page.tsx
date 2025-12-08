"use client";

import { useEffect, useState } from "react";
import { getProductsByCategory } from "@/services/productService";
import MenuCard, { Product } from "@/components/MenuCard";
import { useParams } from "next/navigation";

export default function CategoryPage() {
  const { id } = useParams();
  const [products, setProducts] = useState<Product[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    getProductsByCategory(id as string).then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, [id]);

  return (
    <div>
      <MenuCard products={products} category={products[0]?.categoryName} />
    </div>
  );
}
