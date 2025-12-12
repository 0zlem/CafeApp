import DashboardStats from "@/components/dashboard/DashboardStats";
import PopularProducts from "@/components/dashboard/PopularProducts";
import RecentOrders from "@/components/dashboard/RecentOrders";
import SalesCard from "@/components/dashboard/SalesCard";
import StockAlerts from "@/components/dashboard/StockAlerts";

export default function DashboardPage() {
  return (
    <div className="flex flex-col items-center justify-center p-6 gap-6 ml-24">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl">
        <SalesCard />
        <DashboardStats />
        <StockAlerts />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full max-w-7xl mt-6">
        <PopularProducts />
        <RecentOrders />
      </div>
    </div>
  );
}
