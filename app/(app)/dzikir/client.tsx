"use client";

import { DzikirCategory } from "@/generated/prisma/client";
import { ChevronRight, Loader } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ClientPage() {
    const [dzikirCategories, setDzikirCategories] = useState([])
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        let active = true

        const fetchData = async () => {
            const res = await fetch('/api/dzikir', {
                next: {
                    revalidate: 10
                }
            })
            if (!active) return

            if (res.ok) {
                const { categories } = await res.json()
                setDzikirCategories(categories)
                setLoading(false)
            }
        }

        fetchData()

        return () => {
            active = false
        }
    }, [])

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6 text-center dark:text-white">Pilih Dzikir</h1>

            <div className="grid grid-cols-1 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {
                    loading && (
                        <div className="p-6 text-center text-slate-400 flex items-center justify-center gap-3 text-lg">
                            <Loader size={20} className="animate animate-spin" />
                            Memuat dzikir...
                        </div>
                    )
                }
                {dzikirCategories.length > 0 && dzikirCategories.map((item: DzikirCategory) => (
                    <Link
                        href={`/dzikir/${item.slug}`}
                        key={item.id}
                        className="group flex items-center p-4 bg-white dark:bg-slate-800 dark:text-slate-200 border border-slate-100 rounded-2xl shadow-sm hover:shadow-md hover:border-emerald-100 transition-all text-left"
                    >
                        <div className="w-12 h-12 flex items-center justify-center bg-emerald-50 text-2xl rounded-xl group-hover:scale-110 transition-transform">
                            {item.icon}

                        </div>
                        <div className="ml-4 flex-1">
                            <h3 className="font-bold text-slate-800 dark:text-slate-100">{item.title}</h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">{item.description}</p>
                        </div>
                        <ChevronRight className="text-slate-300 group-hover:text-emerald-500 transition-colors" size={20} />
                    </Link>
                ))}
            </div>
        </div>
    );
}
