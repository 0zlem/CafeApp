"use client";

import AddProduct from "@/components/products/AddProduct";

export default function ProductsPage() {
  return (
    <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center p-4 sm:p-6 gap-4 sm:gap-6">
      <AddProduct />
    </div>
  );
}
