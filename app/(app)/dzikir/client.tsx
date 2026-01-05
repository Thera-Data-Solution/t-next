"use client";

import { DzikirCategory } from "@prisma/client";
import {ChevronRight } from "lucide-react";
import Link from "next/link";

export default function ClientPage({ data }: { data: DzikirCategory[] }) {

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6 text-center dark:text-white">Pilih Dzikir</h1>

            <div className="grid grid-cols-1 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {data.map((item) => (
                    <Link
                        href={`/dzikir/${item.slug}`}
                        key={item.id}
                        className="group flex items-center p-4 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md hover:border-emerald-100 transition-all text-left"
                    >
                        <div className="w-12 h-12 flex items-center justify-center bg-emerald-50 text-2xl rounded-xl group-hover:scale-110 transition-transform">
                            {item.icon}
                      
                        </div>
                        <div className="ml-4 flex-1">
                            <h3 className="font-bold text-slate-800">{item.title}</h3>
                            <p className="text-xs text-slate-500 line-clamp-1">{item.description}</p>
                        </div>
                        <ChevronRight className="text-slate-300 group-hover:text-emerald-500 transition-colors" size={20} />
                    </Link>
                ))}
            </div>
        </div>
    );
}
