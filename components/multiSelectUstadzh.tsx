"use client";

import { Ustadzh } from "@/generated/prisma/client";
import { useEffect, useState } from "react";

export function MultiSelectUstadzh({ value, onChange }: { value: string[]; onChange: (v: string[]) => void }) {
    const [list, setList] = useState<Ustadzh[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/ustadzh")
            .then((r) => r.json())
            .then((d) => setList(d.data || []))
            .finally(() => setLoading(false));
    }, []);

    const toggle = (id: string) => {
        if (value.includes(id)) onChange(value.filter((x) => x !== id));
        else onChange([...value, id]);
    };

    return (
        <div className="space-y-2 border p-3 rounded max-h-56 overflow-y-auto text-gray-800 dark:text-gray-200 dark:border-slate-600">
            {
                loading ? (
                    <p>Memuat daftar ustadzh...</p>
                ) : list.length === 0 ? (
                    <p>Tidak ada ustadzh tersedia.</p>
                ) : (
                    list.map((u) => (
                        <label key={u.id} className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" checked={value.includes(u.id)} onChange={() => toggle(u.id)} />
                            <span>{u.nama}</span>
                        </label>
                    ))
                )
            }
        </div>
    );
}