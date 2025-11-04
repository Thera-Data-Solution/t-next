"use client";

import Image from "next/image";
import { Settings, LogOut, User } from "lucide-react";

export default function ProfilePage() {
    const user = {
        name: "Kevin Krisma",
        email: "kevin@example.com",
        avatar: "https://api.dicebear.com/9.x/lorelei-neutral/svg?seed=Sara",
    };

    const menuItems = [
        { name: "Edit Profil", icon: User, action: () => alert("Edit Profil") },
        { name: "Pengaturan", icon: Settings, action: () => alert("Pengaturan") },
        { name: "Keluar", icon: LogOut, action: () => alert("Logout") },
    ];

    return (
        <div className="p-6">
            <div className="flex flex-col items-center text-center mb-6">
                <Image
                    src={user.avatar}
                    alt={user.name}
                    width={96}
                    height={96}
                    unoptimized
                    className="rounded-full border-4 border-blue-500 shadow-md mb-3"
                />
                <h1 className="text-xl font-semibold dark:text-white">{user.name}</h1>
                <p className="text-sm text-muted-foreground dark:text-white">{user.email}</p>
            </div>

            <div className="space-y-3">
                {menuItems.map(({ name, icon: Icon, action }, i) => (
                    <div
                        key={i}
                        onClick={action}
                        className="flex items-center justify-between p-4 rounded-xl border shadow-sm dark:bg-slate-800 dark:text-white hover:bg-slate-400/10 transition cursor-pointer"
                    >
                        <div className="flex items-center space-x-3">
                            <Icon className="w-5 h-5 text-blue-500" />
                            <span className="font-medium">{name}</span>
                        </div>
                        <span className="text-gray-400">›</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
