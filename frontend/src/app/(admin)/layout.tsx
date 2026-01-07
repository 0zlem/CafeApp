import { AppSidebar } from "@/components/ui/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />

        <main className="flex-1 min-w-0">
          <div className="p-4">
            <SidebarTrigger />
          </div>

          <div className="w-full p-6">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
}
