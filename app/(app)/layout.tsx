"use client";

import { ReactNode } from "react";
import { Home, CalendarDays, User } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";

export default function Layout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (path: string) => pathname === path;

  const navItems = [
    { name: "Home", icon: Home, path: "/dzikir" },
    { name: "Calendar", icon: CalendarDays, path: "/" },
    { name: "Profile", icon: User, path: "/profile" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <div className="flex-1 pb-16">{children}</div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-3 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-md rounded-2xl border backdrop-blur-md shadow-lg bg-white/80 dark:bg-gray-900/80 border-gray-200 dark:border-gray-700">
        <ul className="flex justify-around py-3 text-sm font-medium">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <li
                key={item.name}
                onClick={() => router.push(item.path)}
                className={clsx(
                  "flex flex-col items-center space-y-1 transition-colors cursor-pointer",
                  active
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-gray-500 dark:text-gray-300 hover:text-blue-500"
                )}
              >
                <Icon className="w-5 h-5" />
                <span>{item.name}</span>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
