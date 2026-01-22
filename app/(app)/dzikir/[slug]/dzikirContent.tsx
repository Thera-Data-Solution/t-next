import { getDzikirByCategory } from "@/app/service/dzikir";
import { ArrowLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

export default async function DzikirContent({
  slug,
}: {
  slug: string;
}) {
  const selected = await getDzikirByCategory(slug);

  if (!selected) {
    return (
      <div className="p-6 text-center text-slate-500">
        Kategori dzikir tidak ditemukan.
      </div>
    );
  }

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="flex items-center gap-2 mb-6">
        <Link href="/dzikir" className="p-2 hover:bg-slate-100 rounded-full">
          <ArrowLeft size={20} className="text-gray-900 dark:text-gray-100" />
        </Link>
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">{selected.title}</h2>
      </div>

      <div className="space-y-3 mx-10 grid grid-cols-1">
        {selected.groups.length > 0 ? (
          selected.groups.map((item, idx) => (
            <Link
              key={item.id}
              href={`/dzikir/${slug}/${item.order}`}
              className="flex items-center p-4 bg-white dark:bg-slate-800 border rounded-xl dark:text-slate-200"
            >
              <div className="w-8 h-8 flex items-center justify-center">
                {idx + 1}
              </div>
              <span className="ml-3">{item.title}</span>
              <ChevronRight className="ml-auto" size={16} />
            </Link>
          ))
        ) : (
          <div className="p-6 text-center text-slate-500">
            Belum ada dzikir pada kategori ini.
          </div>
        )}
      </div>
    </div>
  );
}
