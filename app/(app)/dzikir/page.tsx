"use client";

import { Sun, Moon, Heart, BookOpen } from "lucide-react";

export default function DzikirPage() {
    const dzikirOptions = [
        {
            title: "Dzikir Pagi",
            desc: "Amalan dzikir setelah subuh hingga matahari terbit.",
            icon: Sun,
            color: "from-orange-400 to-yellow-300",
        },
        {
            title: "Dzikir Petang",
            desc: "Dzikir sore menjelang matahari terbenam.",
            icon: Moon,
            color: "from-blue-500 to-indigo-400",
        },
        {
            title: "Dzikir Setelah Shalat",
            desc: "Bacaan dzikir sesudah shalat wajib.",
            icon: Heart,
            color: "from-emerald-500 to-green-400",
        },
        {
            title: "Dzikir Harian",
            desc: "Dzikir umum yang bisa dibaca kapan saja.",
            icon: BookOpen,
            color: "from-pink-500 to-rose-400",
        },
    ];

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6 text-center dark:text-white">Pilih Dzikir</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {dzikirOptions.map(({ title, desc, icon: Icon, color }, i) => (
                    <div
                        key={i}
                        className={`p-5 rounded-2xl shadow-md border cursor-pointer bg-gradient-to-br ${color} text-white hover:scale-[1.02] transition-transform`}
                    >
                        <div className="flex items-center space-x-3 mb-3">
                            <Icon className="w-6 h-6" />
                            <h2 className="font-semibold text-lg">{title}</h2>
                        </div>
                        <p className="text-sm opacity-90 leading-snug">{desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
