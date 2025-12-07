"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { data: session, status } = useSession();
    const router = useRouter();
    if (status === "loading") {
        return <div className="dark:text-white">Loading...</div>;
    }
    if (session?.user?.role !== "Admin") {
        router.replace("/");
        return <div>Access Denied. You are not an admin.</div>;
    }
    return (
        <div className="h-full w-full bg-gray-50 dark:bg-gray-900">
            <div className="flex items-center justify-start bg-gray-200 dark:bg-gray-800">
                <button
                    onClick={() => window.history.back()}
                    className="m-4 flex items-center text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition"
                >
                    ← Kembali
                </button>
            </div>
            {children}
        </div>
    );
}