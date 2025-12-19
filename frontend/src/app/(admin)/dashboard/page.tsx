import PopularProducts from "@/components/dashboard/PopularProducts";
import SalesCard from "@/components/dashboard/SalesCard";
import StockAlerts from "@/components/dashboard/StockAlerts";

export default function DashboardPage() {
  return (
    <div className="flex flex-col sm:flex-row flex-wrap justify-center p-4 sm:p-6 gap-4 sm:gap-6">
      <h1 className="text-3xl font-bold mb-6t">Dashboard</h1>
      <SalesCard />
      <StockAlerts />
      <PopularProducts />
    </div>
  );
}
