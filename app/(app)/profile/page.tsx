"use client";

import Image from "next/image";
import { Settings, LogOut, User } from "lucide-react";
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/nextjs";

export default function ProfilePage() {
    const { user } = useUser();

    console.log(user)

    const menuItems = [
        { name: "Edit Profil", icon: User, action: () => alert("Edit Profil") },
        { name: "Pengaturan", icon: Settings, action: () => alert("Pengaturan") },
        { name: "Keluar", icon: LogOut, action: () => alert("Logout") },
    ];

    return (
        <div className="p-6">
            <SignedOut>
                <div className="w-full">
                    <div className="text-center mx-auto bg-white dark:slate-100/20 rounded py-2 dark:hover:bg-slate-400 cursor-pointer">
                        <SignInButton />
                    </div>
                </div>
            </SignedOut>
            <SignedIn>
                <div className="flex flex-col items-center text-center mb-6">
                    <UserButton />
                     <h1 className="text-xl font-semibold dark:text-white">{user?.fullName}</h1>
                    <p className="text-sm text-muted-foreground dark:text-white">{user?.primaryEmailAddress?.emailAddress}</p> 
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
            </SignedIn>
        </div>
    );
}
