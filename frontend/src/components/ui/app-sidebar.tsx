"use client";
import {
  ChartColumnStacked,
  ChefHat,
  HandPlatter,
  Home,
  PackageSearch,
  Table,
  UserCog,
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
import { useEffect, useState } from "react";

type Role = "Admin" | "Mutfak" | "Garson";

const data = {
  items: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Home,
      roles: ["Admin"],
    },
    {
      title: "Orders",
      url: "/ordersKitchen",
      icon: ChefHat,
      roles: ["Mutfak"],
    },
    {
      title: "Orders",
      url: "/ordersWaiter",
      icon: HandPlatter,
      roles: ["Garson"],
    },
    {
      title: "Categories",
      url: "/categories",
      icon: ChartColumnStacked,
      roles: ["Admin"],
    },
    {
      title: "Products",
      url: "/products",
      icon: PackageSearch,
      roles: ["Admin"],
    },
    {
      title: "Tables",
      url: "/tables",
      icon: Table,
      roles: ["Admin"],
    },
    {
      title: "Users",
      url: "/users",
      icon: UserCog,
      roles: ["Admin"],
    },
  ],
};
export function AppSidebar() {
  const [userRole, setUserRole] = useState<Role | null>(null);

  useEffect(() => {
    const role = localStorage.getItem("role") as Role;
    setUserRole(role);
    console.log("role", role);
  }, []);

  if (!userRole) return null;

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
              {data.items
                .filter((item) => userRole && item.roles.includes(userRole))
                .map((item) => (
                  <SidebarMenuItem key={item.url}>
                    <SidebarMenuButton
                      className="bg-[#483C32] hover:bg-[#fcf8e7] text-[#fcf8e7] font-bold mt-2 min-h-10"
                      asChild
                    >
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
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
