import PopularProducts from "@/components/dashboard/PopularProducts";
import SalesCard from "@/components/dashboard/SalesCard";
import StockAlerts from "@/components/dashboard/StockAlerts";

export default function DashboardPage() {
  return (
    <div className="w-full max-w-full p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="flex flex-col gap-6">
        <SalesCard />
        <PopularProducts />
        <StockAlerts />
      </div>
    </div>
  );
}
