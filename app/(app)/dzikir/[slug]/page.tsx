import { getDzikirByCategory } from "@/app/service/dzikir";
import { ArrowLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

export default async function Page({params}: {params: Promise<{slug: string}>}) {
    const {slug} = await params;
    const selected = await getDzikirByCategory(slug);

    if (!selected) {
        return <div className="p-6 text-center text-slate-500">Kategori dzikir tidak ditemukan.</div>;
    }
    return (
        <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="flex items-center gap-2 mb-6">
                <Link href="/dzikir" className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                    <ArrowLeft size={20} className="text-slate-600" />
                </Link>
                <h2 className="text-xl font-bold text-slate-800">{selected?.title}</h2>
            </div>
            <div className="space-y-3 mx-10 grid grid-cols-1">
                {selected?.groups.length > 0 ? selected?.groups.map((item, idx) => (
                    <Link
                        href={`/dzikir/${slug}/${item.order}`}
                        key={item.id}
                        // onClick={() => handleItemClick(idx)}
                        className="w-full flex items-center p-4 bg-white border border-slate-100 rounded-xl hover:bg-emerald-50/30 hover:border-emerald-200 transition-all text-left group"
                    >
                        <div className="w-8 h-8 flex items-center justify-center bg-slate-100 text-slate-500 text-xs font-bold rounded-lg group-hover:bg-emerald-100 group-hover:text-emerald-600 transition-colors">
                            {idx + 1}
                        </div>
                        <span className="ml-3 font-medium text-slate-700">{item.title}</span>
                        <ChevronRight className="ml-auto text-slate-300" size={16} />
                    </Link>
                )): <div className="p-6 text-center text-slate-500">Belum ada dzikir pada kategori ini.</div>}
            </div>
        </div>
    )
}