"use client";
import AddCategory from "@/components/categories/AddCategory";
import DeleteCategory from "@/components/categories/DeleteCategory";
import UpdateCategory from "@/components/categories/UpdateCategory";

export default function CategoriesPage() {
  return (
    <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center p-4 sm:p-6 gap-4 sm:gap-6">
      <AddCategory />
      <UpdateCategory />
      <DeleteCategory />
    </div>
  );
}
