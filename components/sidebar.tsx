"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  LayoutDashboard,
  Settings,
  PaintBucket,
  CreditCard,
  Users,
  LogOut,
  ChevronLeft,
  ChevronRight,
  ImageIcon,
} from "lucide-react";
import { useMobile } from "@/hooks/use-mobile";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();
  const isMobile = useMobile();
  const [collapsed, setCollapsed] = useState(isMobile);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div
      className={cn(
        "relative flex flex-col border-r bg-background transition-all duration-300",
        collapsed ? "w-16" : "w-64",
        className
      )}
    >
      <div className="flex py-4 items-center px-4 h-[74px] border-b header_sadow">
        {!collapsed && (
          <Link href="/dashboard" className="flex items-center  ">
            <span className="font-bold  text-xl">Admin Panel</span>
          </Link>
        )}
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="absolute -right-3 top-[6rem] h-6 w-6 rounded-full border bg-background"
        onClick={toggleSidebar}
      >
        {collapsed ? (
          <ChevronRight className="h-3 w-3" />
        ) : (
          <ChevronLeft className="h-3 w-3" />
        )}
        <span className="sr-only">Toggle Sidebar</span>
      </Button>
      <ScrollArea className="flex-1">
        <nav className="flex flex-col gap-4 p-4">
          <Link href="/dashboard">
            <Button
              variant={pathname === "/dashboard" ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start",
                collapsed && "justify-center px-2"
              )}
            >
              <LayoutDashboard className="h-5 w-5" />
              {!collapsed && <span className="ml-2">Dashboard</span>}
            </Button>
          </Link>
          <Link href="/dashboard/appearance">
            <Button
              variant={
                pathname === "/dashboard/appearance" ? "secondary" : "ghost"
              }
              className={cn(
                "w-full justify-start",
                collapsed && "justify-center px-2"
              )}
            >
              <PaintBucket className="h-5 w-5" />
              {!collapsed && <span className="ml-2">Appearance</span>}
            </Button>
          </Link>
          <Link href="/dashboard/branding">
            <Button
              variant={
                pathname === "/dashboard/branding" ? "secondary" : "ghost"
              }
              className={cn(
                "w-full justify-start",
                collapsed && "justify-center px-2"
              )}
            >
              <ImageIcon className="h-5 w-5" />
              {!collapsed && <span className="ml-2">Branding</span>}
            </Button>
          </Link>
          <Link href="/dashboard/payments">
            <Button
              variant={
                pathname === "/dashboard/payments" ? "secondary" : "ghost"
              }
              className={cn(
                "w-full justify-start",
                collapsed && "justify-center px-2"
              )}
            >
              <CreditCard className="h-5 w-5" />
              {!collapsed && <span className="ml-2">Payments</span>}
            </Button>
          </Link>
          <Link href="/dashboard/users">
            <Button
              variant={pathname === "/dashboard/users" ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start",
                collapsed && "justify-center px-2"
              )}
            >
              <Users className="h-5 w-5" />
              {!collapsed && <span className="ml-2">Users</span>}
            </Button>
          </Link>
          <Link href="/dashboard/settings">
            <Button
              variant={
                pathname === "/dashboard/settings" ? "secondary" : "ghost"
              }
              className={cn(
                "w-full justify-start",
                collapsed && "justify-center px-2"
              )}
            >
              <Settings className="h-5 w-5" />
              {!collapsed && <span className="ml-2">Settings</span>}
            </Button>
          </Link>
        </nav>
      </ScrollArea>
      <div className="border-t p-2">
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start",
            collapsed && "justify-center px-2"
          )}
          onClick={() => (window.location.href = "/")}
        >
          <LogOut className="h-5 w-5" />
          {!collapsed && <span className="ml-2">Logout</span>}
        </Button>
      </div>
    </div>
  );
}
