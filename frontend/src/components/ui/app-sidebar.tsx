import {
  ChartColumnStacked,
  Home,
  PackageSearch,
  Search,
  Settings,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavUser } from "./nav-user";
import Link from "next/link";

const data = {
  items: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Home,
    },
    {
      title: "Categories",
      url: "/categories",
      icon: ChartColumnStacked,
    },
    {
      title: "Products",
      url: "/products",
      icon: PackageSearch,
    },
    {
      title: "Search",
      url: "#",
      icon: Search,
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings,
    },
  ],
};
export function AppSidebar() {
  return (
    <Sidebar variant="sidebar" collapsible="icon">
      <SidebarContent className="bg-[#fff6cc]">
        <SidebarGroup>
          <SidebarGroupLabel className="m-8 flex justify-center">
            <Link href={"/dashboard"}>
              {" "}
              <img
                src="/logo1.png"
                alt="/logo.png"
                width={50}
                height={50}
                className="shrink-0"
              />
            </Link>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {data.items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    className="bg-[#483C32] hover:bg-[#fcf8e7] text-[#fcf8e7] font-bold mt-2 min-h-10"
                    asChild
                  >
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="bg-[#fff6cc]">
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
