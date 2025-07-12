import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  LayoutDashboard,
  Users,
  Shield,
  MessageSquare,
  BarChart3,
  ArrowLeft,
  Bell,
  Settings,
} from "lucide-react";
import { useAdminAuth } from "@/hooks/useAdminAuthHook";

const AdminLayout = () => {
  const location = useLocation();
  const { adminUser } = useAdminAuth();

  const navigationItems = [
    { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
    { name: "User Management", path: "/admin/users", icon: Users },
    { name: "Content Moderation", path: "/admin/moderation", icon: Shield },
    { name: "Swap Monitoring", path: "/admin/swaps", icon: MessageSquare },
    { name: "Communications", path: "/admin/communications", icon: Bell },
    { name: "Reports & Analytics", path: "/admin/reports", icon: BarChart3 },
  ];

  const isActivePath = (path: string) => {
    if (path === "/admin") {
      return location.pathname === "/admin";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-accent/30">
      {/* Admin Header */}
      <header className="glass sticky top-0 z-50 border-b border-border/50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="hover:bg-accent/50"
              >
                <Link to="/" className="flex items-center space-x-2">
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to SkillSwap</span>
                </Link>
              </Button>
              <div className="h-6 w-px bg-border" />
              <div>
                <h1 className="text-xl font-medium">Admin Portal</h1>
                <p className="text-sm text-muted-foreground">
                  SkillSwap Management
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                Admin
              </Badge>
              <span className="text-sm text-muted-foreground">
                {adminUser?.name}
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 min-h-[calc(100vh-80px)] glass border-r border-border/50">
          <nav className="p-6">
            <div className="space-y-2">
              {navigationItems.map((item) => (
                <Button
                  key={item.path}
                  variant="ghost"
                  asChild
                  className={`w-full justify-start ${
                    isActivePath(item.path)
                      ? "bg-primary/10 text-primary hover:bg-primary/15"
                      : "hover:bg-accent/50"
                  }`}
                >
                  <Link to={item.path} className="flex items-center space-x-3">
                    <item.icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </Link>
                </Button>
              ))}
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
