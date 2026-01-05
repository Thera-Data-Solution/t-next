"use client";

import { Settings, User, LogOut, Info, HelpCircle, BookOpenText, LayoutGrid } from "lucide-react";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { MenuSection } from "./menuSection";
import { MenuItem } from "@/types/menu";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const role = session?.user?.role;
  const isModerator = role === "Moderator" || role === "Admin";
  const isAdmin = role === "Admin";


  const baseMenuItems: MenuItem[] = [
    { name: "Edit Profil", icon: User, action: () => alert("Edit Profil") },
    { name: "Pengaturan", icon: Settings, action: () => alert("Pengaturan") },
    { name: "Bantuan", icon: HelpCircle, action: () => alert("Pusat Bantuan") },
    { name: "Tentang Aplikasi", icon: Info, action: () => alert("Versi 1.0.0") },
  ];

  const moderatorMenuItems: MenuItem[] = [
    { name: "Tambah Ustadzh", icon: Settings, action: () => router.push("/admin/ustadzh") },
    { name: "Tambah Kajian", icon: BookOpenText, action: () => router.push("/admin/kajian") },
    { name: "Tambah Dzikir", icon: Info, action: () => alert("Tambah Dzikir") },
    { name: "Kategori Dzikir", icon: LayoutGrid, action: () => alert("Kategori Dzikir") },
  ];

  const adminMenuItems: MenuItem[] = [
    { name: "Kelola Pengguna", icon: User, action: () => alert("Kelola Pengguna") },
  ];


  return (
    <div className="p-6 flex flex-col items-center">
      {status === "loading" && (
        <div className="max-w-md w-full bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 animate-pulse">
          <div className="flex flex-col items-center mb-6">
            <div className="w-20 h-20 rounded-full bg-gray-300 dark:bg-slate-700" />
            <div className="mt-4 h-4 w-32 bg-gray-300 dark:bg-slate-700 rounded" />
            <div className="mt-2 h-3 w-40 bg-gray-300 dark:bg-slate-700 rounded" />
          </div>

          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="w-full h-14 rounded-xl border shadow-sm bg-gray-200 dark:bg-slate-700"
              />
            ))}
          </div>
        </div>
      )}
      {
        !session ? (
          <div className="max-w-md w-full bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 text-center">
            <div className="flex flex-col items-center mb-6">
              <Image
                src="https://avatar.iran.liara.run/public/45"
                alt="Dummy Avatar"
                width={80}
                height={80}
                className="rounded-full border dark:border-slate-600"
              />
              <h1 className="mt-4 text-xl font-semibold text-gray-800 dark:text-white">
                Pengguna Tamu
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-300">
                guest@example.com
              </p>
            </div>

            <div className="mt-6">
              <button className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition font-semibold" onClick={() => signIn("github")}>
                Masuk Sekarang
              </button>
            </div>
          </div>
        ) : (
          <div className="max-w-md w-full bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6">
            <div className="flex flex-col items-center text-center mb-6">
              <Image
                src={session?.user?.image as string}
                alt="Dummy Avatar"
                width={80}
                height={80}
                className="rounded-full border dark:border-slate-600"
              />
              <h1 className="text-xl font-semibold dark:text-white mt-2">
                {session?.user?.name}
              </h1>
              <p className="text-sm text-muted-foreground dark:text-gray-300">
                {session?.user?.email}
              </p>
            </div>


            <div className="space-y-4">
              <MenuSection title="Akun" items={baseMenuItems} />

              {isModerator && (
                <MenuSection title="Moderator" items={moderatorMenuItems} />
              )}

              {isAdmin && (
                <MenuSection title="Administrator" items={adminMenuItems} />
              )}

              {/* Logout section */}
              <div>
                <button
                  onClick={() => signOut()}
                  className="w-full flex items-center justify-between p-4 rounded-xl border
                 shadow-sm hover:bg-red-500/10 transition dark:bg-slate-800"
                >
                  <div className="flex items-center space-x-3">
                    <LogOut className="w-5 h-5 text-red-500" />
                    <span className="font-medium">Logout</span>
                  </div>
                  <span className="text-gray-400">›</span>
                </button>
              </div>
            </div>

          </div>
        )
      }
    </div>
  );
}
