"use client";

import * as React from "react";
import {
  Activity,
  BarChart2,
  Clock,
  LayoutDashboard,
  PieChart,
  Sliders,
  TrendingUp,
  User,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

const dashboardData = {
  user: {
    name: "Admin",
    email: "admin@example.com",
    avatar: "/avatars/admin.jpg",
  },
  teams: [
    {
      name: "Eventat Team",
      logo: Activity,
      plan: "Enterprise",
    },
  ],
  navMain: [
    {
      title: "Dashboard Overview",
      url: "/dashboard",
      icon: LayoutDashboard,
      isActive: true,
      items: [],
    },
    {
      title: "Queue Metrics",
      url: "/dashboard/queue-metrics",
      icon: BarChart2,
      items: [
        {
          title: "Current Queue",
          url: "/dashboard/queue-metrics/current-queue",
        },
        {
          title: "Queue Trends",
          url: "/dashboard/queue-metrics/trends",
        },
      ],
    },
    {
      title: "Performance Analytics",
      url: "/dashboard/performance",
      icon: TrendingUp,
      items: [
        {
          title: "Service Time",
          url: "/dashboard/performance/service-time",
        },
        {
          title: "Wait Time",
          url: "/dashboard/performance/wait-time",
        },
      ],
    },
    {
      title: "Visualizations",
      url: "/dashboard/visualizations",
      icon: PieChart,
      items: [
        {
          title: "Charts",
          url: "/dashboard/visualizations/charts",
        },
        {
          title: "Heatmaps",
          url: "/dashboard/visualizations/heatmaps",
        },
      ],
    },
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: Sliders,
      items: [
        {
          title: "System Settings",
          url: "/dashboard/settings/system",
        },
        {
          title: "Alerts",
          url: "/dashboard/settings/alerts",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={dashboardData.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={dashboardData.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={dashboardData.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
