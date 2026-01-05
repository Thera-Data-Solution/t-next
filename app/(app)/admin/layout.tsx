"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import React from "react";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { data: session, status } = useSession();
    const router = useRouter();

    if (status === "loading") {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                <p className="text-sm text-gray-500 dark:text-gray-400 animate-pulse">
                    Memuat halaman...
                </p>
            </div>
        );
    }

    if (session?.user?.role !== "Admin") {
        router.replace("/");
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Header */}
            <header className="sticky top-0 z-30 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2 px-4 py-3">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-1 text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition"
                    >
                        <ArrowLeft size={18} />
                        <span>Kembali</span>
                    </button>
                </div>
            </header>

            {/* Content */}
            <main className="px-4 pb-24 pt-4 sm:px-6 max-w-5xl mx-auto">
                {children}
            </main>
        </div>
    );
}
