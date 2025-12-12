"use client";
import AddCategory from "@/components/categories/AddCategory";
import UpdateCategory from "@/components/categories/UpdateCategory";

export default function CategoriesPage() {
  return (
    <div className="flex flex-col items-center justify-center p-6 gap-6 ml-2">
      <AddCategory />
      <UpdateCategory />
    </div>
  );
}
