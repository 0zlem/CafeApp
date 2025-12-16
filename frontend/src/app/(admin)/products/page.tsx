"use client";

import AddProduct from "@/components/products/AddProduct";
import DeleteProduct from "@/components/products/DeleteProduct";
import UpdateProduct from "@/components/products/UpdateProduct";

export default function ProductsPage() {
  return (
    <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center p-4 sm:p-6 gap-4 sm:gap-6">
      <AddProduct />
      <UpdateProduct />
      <DeleteProduct />
    </div>
  );
}
