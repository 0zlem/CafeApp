"use client";
import AddTable from "@/components/tables/AddTable";
import DeleteTable from "@/components/tables/DeleteTable";
import TableQr from "@/components/tables/TablesQr";
import UpdateTable from "@/components/tables/UpdateTable";

export default function TablePage() {
  return (
    <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center p-4 sm:p-6 gap-4 sm:gap-6">
      <AddTable />
      <UpdateTable />
      <DeleteTable />
      <TableQr />
    </div>
  );
}
