import AddTable from "@/components/tables/AddTable";
import UpdateTable from "@/components/tables/UpdateTable";

export default function TablePage() {
  return (
    <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center p-4 sm:p-6 gap-4 sm:gap-6">
      <AddTable />
      <UpdateTable />
    </div>
  );
}
