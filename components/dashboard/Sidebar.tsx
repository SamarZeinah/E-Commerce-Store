
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Settings,
  LogOut,
  ChevronLeft,
} from "lucide-react";
import { useAuth } from "@/Context/AuthContext";

const menuItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Products",
    href: "/dashboard/products",
    icon: Package,
  },
  {
    name: "Orders",
    href: "/dashboard/orders",
    icon: ShoppingCart,
  },
  {
    name: "Users",
    href: "/dashboard/users",
    icon: Users,
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();

  useEffect(() => {
  const mediaQuery = window.matchMedia("(max-width: 1023px)");

  // الحالة الأولية حسب حجم الشاشة
  setIsOpen(!mediaQuery.matches);

  const handleChange = (event: MediaQueryListEvent) => {
    // حصل انتقال فعلي بين Desktop و Mobile
    setIsOpen(!event.matches);
  };

  mediaQuery.addEventListener("change", handleChange);

  return () => {
    mediaQuery.removeEventListener("change", handleChange);
  };
}, []);


  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <aside
      className={`relative flex min-h-screen shrink-0 flex-col border-r border-slate-200 bg-white shadow-sm transition-all duration-300 ${
        isOpen ? "w-64" : "w-20"
      }`}
    >
      {/* Header */}
      <div
        className={`relative flex h-20 shrink-0 items-center border-b border-slate-200 ${
          isOpen ? "px-4" : "justify-center"
        }`}
      >
        {isOpen ? (
          <>
            <Link
              href="/Dashboard"
              className="flex items-center gap-3"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white">
                <Package size={22} />
              </div>

              <div className="leading-tight">
                <h1 className="font-bold text-slate-800">
                  E-Commerce
                </h1>
              </div>
            </Link>

            {/* Close */}
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close sidebar"
              title="Close sidebar"
              className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 cursor-pointer items-center justify-center rounded-md border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:bg-slate-50 hover:text-indigo-600"
            >
              <ChevronLeft size={16} />
            </button>
          </>
        ) : (
          /* Logo = Open */
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            aria-label="Open sidebar"
            title="Open sidebar"
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl bg-indigo-600 text-white transition hover:bg-indigo-700"
          >
            <Package size={22} />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 px-3 py-6">
        {menuItems.map((item) => {
          const Icon = item.icon;

          const isActive =
            pathname === item.href ||
            (item.href !== "/dashboard" &&
              pathname.startsWith(`${item.href}/`));

          return (
            <Link
              key={item.href}
              href={item.href}
              title={!isOpen ? item.name : undefined}
              className={`group flex items-center rounded-xl py-3 transition-all duration-200 ${
                isOpen
                  ? "gap-3 px-3"
                  : "justify-center px-0"
              } ${
                isActive
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-slate-500 hover:bg-slate-50 hover:text-indigo-600"
              }`}
            >
              <Icon
                size={21}
                className={`shrink-0 transition-colors ${
                  isActive
                    ? "text-indigo-600"
                    : "text-slate-500 group-hover:text-indigo-600"
                }`}
              />

              {isOpen && (
                <span className="text-sm font-medium">
                  {item.name}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="shrink-0 border-t border-slate-200 p-3">
        <button
          type="button"
          onClick={handleLogout}
          title={!isOpen ? "Logout" : undefined}
          aria-label="Logout"
          className={`group flex w-full items-center rounded-xl py-3 text-red-500 transition hover:bg-red-50 ${
            isOpen
              ? "gap-3 px-3"
              : "justify-center px-0"
          }`}
        >
          <LogOut
            size={21}
            className="shrink-0 transition-colors group-hover:text-red-600"
          />

          {isOpen && (
            <span className="text-sm font-medium">
              Logout
            </span>
          )}
        </button>
      </div>
    </aside>
  );
}
