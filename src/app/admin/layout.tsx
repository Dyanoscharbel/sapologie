"use client";

import type { Metadata } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoutButton from "./_components/logout-button";
import { LayoutDashboard, Users, ChevronRight, Menu, X, Crown, Settings, Trophy } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navigationItems = [
  {
    href: "/admin",
    label: "Tableau de bord",
    icon: LayoutDashboard,
    description: "Vue d'ensemble",
  },
  {
    href: "/admin/users",
    label: "Utilisateurs",
    icon: Users,
    description: "Gestion des comptes",
  },
  {
    href: "/admin/competitions",
    label: "Compétitions",
    icon: Trophy,
    description: "Gestion des concours",
  },
  {
    href: "/admin/settings",
    label: "Paramètres",
    icon: Settings,
    description: "Mon profil",
  },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-pink-50/20">
      {/* Mobile Header */}
      <header className="lg:hidden sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-border/50">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label={sidebarOpen ? "Fermer le menu" : "Ouvrir le menu"}
              className="lg:hidden"
            >
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            <div className="flex items-center gap-2">
              <Crown className="h-5 w-5 text-primary" aria-hidden="true" />
              <h1 className="text-lg font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                Administration
              </h1>
            </div>
          </div>
          <LogoutButton />
        </div>
      </header>

      <div className="flex">
        {/* Sidebar - Desktop & Mobile Overlay */}
        <aside
          className={cn(
            "fixed lg:sticky top-0 left-0 z-30 h-screen w-72 bg-white/95 backdrop-blur-xl border-r border-border/50 transition-transform duration-300 ease-out",
            "flex flex-col shadow-xl lg:shadow-none",
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          )}
        >
          {/* Sidebar Header */}
          <div className="p-6 border-b border-border/50 hidden lg:block">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <Crown className="h-8 w-8 text-primary transition-transform group-hover:scale-110" aria-hidden="true" />
                <div className="absolute inset-0 bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
              </div>
              <div>
                <h1 className="text-lg font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                  Administration
                </h1>
                <p className="text-xs text-muted-foreground">Le Royaume de la Sapologie</p>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto" aria-label="Navigation admin">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
              const Icon = item.icon;
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={cn(
                    "group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                    isActive
                      ? "bg-gradient-to-r from-primary to-purple-600 text-white shadow-lg shadow-primary/25"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground hover:shadow-md"
                  )}
                >
                  <Icon 
                    className={cn(
                      "h-5 w-5 transition-transform",
                      isActive ? "text-white" : "text-muted-foreground group-hover:text-primary",
                      "group-hover:scale-110"
                    )} 
                    aria-hidden="true" 
                  />
                  <div className="flex-1">
                    <p className={cn("font-medium text-sm", isActive && "text-white")}>
                      {item.label}
                    </p>
                    <p className={cn("text-xs", isActive ? "text-white/80" : "text-muted-foreground")}>
                      {item.description}
                    </p>
                  </div>
                  {isActive && (
                    <ChevronRight className="h-4 w-4 text-white" aria-hidden="true" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-border/50 hidden lg:block">
            <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-gradient-to-r from-primary/10 to-purple-600/10">
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">Admin</p>
                <p className="text-xs text-muted-foreground">Connecté</p>
              </div>
              <LogoutButton />
            </div>
          </div>
        </aside>

        {/* Mobile Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-20 lg:hidden animate-fade-in"
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* Main Content */}
        <main className="flex-1 min-h-screen">
          {/* Desktop Header */}
          <header className="hidden lg:block sticky top-0 z-10 bg-white/60 backdrop-blur-xl border-b border-border/50">
            <div className="px-8 py-4 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-foreground">
                  {navigationItems.find(item => 
                    pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href))
                  )?.label || "Administration"}
                </h2>
                <p className="text-sm text-muted-foreground mt-0.5">
                  {navigationItems.find(item => 
                    pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href))
                  )?.description || "Bienvenue"}
                </p>
              </div>
              <Link 
                href="/"
                className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group"
              >
                <Crown className="h-4 w-4 group-hover:scale-110 transition-transform" aria-hidden="true" />
                Retour au site
              </Link>
            </div>
          </header>

          {/* Page Content */}
          <div className="p-4 lg:p-8 animate-fade-in-up">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
