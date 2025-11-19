"use client";

import { Settings, User, LogOut, Info, HelpCircle } from "lucide-react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import Image from "next/image";

export default function ProfilePage() {
  const { user } = useUser();

  const menuItems = [
    { name: "Edit Profil", icon: User, action: () => alert("Edit Profil") },
    { name: "Pengaturan", icon: Settings, action: () => alert("Pengaturan") },
    { name: "Bantuan", icon: HelpCircle, action: () => alert("Pusat Bantuan") },
    {
      name: "Tentang Aplikasi",
      icon: Info,
      action: () => alert("Versi 1.0.0 - Dibuat oleh Tim Theravick"),
    },
    {
      name: "Logout",
      icon: LogOut,
      component: () => (
        <SignOutButton>
          <button className="w-full flex items-center justify-between p-4 rounded-xl border shadow-sm dark:bg-slate-800 dark:text-white hover:bg-red-500/10 transition cursor-pointer">
            <div className="flex items-center space-x-3">
              <LogOut className="w-5 h-5 text-red-500" />
              <span className="font-medium">Logout</span>
            </div>
            <span className="text-gray-400">›</span>
          </button>
        </SignOutButton>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-slate-900 dark:to-slate-950 p-6 flex flex-col items-center">
      {/* --- BELUM LOGIN (DUMMY) --- */}
      <SignedOut>
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
            <SignInButton>
              <button className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition font-semibold">
                Masuk Sekarang
              </button>
            </SignInButton>
          </div>
        </div>
      </SignedOut>

      {/* --- SUDAH LOGIN --- */}
      <SignedIn>
        <div className="max-w-md w-full bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6">
          <div className="flex flex-col items-center text-center mb-6">
            <UserButton />
            <h1 className="text-xl font-semibold dark:text-white mt-2">
              {user?.fullName}
            </h1>
            <p className="text-sm text-muted-foreground dark:text-gray-300">
              {user?.primaryEmailAddress?.emailAddress}
            </p>
          </div>

          <div className="space-y-3">
            {menuItems.map(({ name, icon: Icon, action, component }, i) =>
              component ? (
                <div key={i}>{component()}</div>
              ) : (
                <div
                  key={i}
                  onClick={action}
                  className="flex items-center justify-between p-4 rounded-xl border shadow-sm dark:bg-slate-800 dark:text-white hover:bg-blue-500/10 transition cursor-pointer"
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="w-5 h-5 text-blue-500" />
                    <span className="font-medium">{name}</span>
                  </div>
                  <span className="text-gray-400">›</span>
                </div>
              )
            )}
          </div>
        </div>
      </SignedIn>
    </div>
  );
}
