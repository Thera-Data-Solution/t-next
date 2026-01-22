import { getDzikirCategoryInfo, getDzikirDetail } from "@/app/service/dzikir";
import { ArrowLeft, ArrowRight, LayoutGrid } from "lucide-react";
import Link from "next/link";

export default async function DzikirDetailContent({
  slug,
  id,
}: {
  slug: string;
  id: string;
}) {
  const currentOrder = parseInt(id);

  const [item, categoryInfo] = await Promise.all([
    getDzikirDetail(slug, currentOrder),
    getDzikirCategoryInfo(slug),
  ]);

  if (!item || !categoryInfo) {
    return (
      <div className="p-6 text-center text-slate-500">
        Dzikir tidak ditemukan.
      </div>
    );
  }

  if (item.groups.length === 0) {
    return (
      <div className="animate-in fade-in zoom-in-95 duration-500 pb-24">
        <div className="flex items-center justify-between mb-6 sticky top-0 bg-[#f8fafc]/80 backdrop-blur-md py-2 z-30 px-2 rounded-xl">
          <Link
            href={`/dzikir/${slug}`}
            className="p-2 hover:bg-white rounded-full shadow-sm"
          >
            <ArrowLeft size={20} />
          </Link>
          <div className="text-center flex-1">
            <h2 className="text-xs font-bold text-emerald-600 uppercase tracking-widest">
              {item.title}
            </h2>
          </div>
        </div>

        <div className="p-6 text-center text-slate-500">
          Dzikir belum memiliki bacaan.
        </div>
      </div>
    );
  }

  const totalGroups = categoryInfo._count.groups;
  const hasPrev = currentOrder > 0;
  const hasNext = currentOrder < totalGroups - 1;

  return (
    <div className="animate-in fade-in zoom-in-95 duration-500 pb-24">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6 sticky top-0 bg-[#f8fafc]/80 backdrop-blur-md py-2 z-30 px-2 rounded-xl">
        <Link
          href={`/dzikir/${slug}`}
          className="p-2 hover:bg-white rounded-full shadow-sm"
        >
          <ArrowLeft size={20} />
        </Link>
        <div className="text-center flex-1">
          <h2 className="text-xs font-bold text-emerald-600 uppercase tracking-widest">
            {item.title}
          </h2>
          <p className="text-sm font-bold line-clamp-1">
            {item.groups[0].title}
          </p>
        </div>
        <div className="w-10" />
      </div>

      {/* CONTENT */}
      <div className="space-y-6 mx-6">
        {item.groups[0].items.map((reading) => (
          <div
            key={reading.id}
            className="bg-white rounded-3xl p-6 border shadow-sm"
          >
            <div className="text-center text-3xl mb-6">
              {reading.arabic}
            </div>

            <div className="space-y-3">
              <p className="italic text-sm">{reading.transliteration}</p>
              <p className="text-sm">{reading.translation}</p>
            </div>

            <div className="mt-6 text-center font-bold">
              {reading.count}x
            </div>
          </div>
        ))}
      </div>

      {/* NAVIGATION */}
      <div className="fixed bottom-24 left-1/2 -translate-x-1/2 w-[85%] max-w-[320px] bg-white border shadow-2xl rounded-full px-4 py-2 flex justify-between items-center z-40">
        {hasPrev ? (
          <Link href={`/dzikir/${slug}/${currentOrder - 1}`}>
            <ArrowLeft size={20} />
          </Link>
        ) : (
          <span className="opacity-20">
            <ArrowLeft size={20} />
          </span>
        )}

        <Link
          href={`/dzikir/${slug}`}
          className="flex items-center gap-2 text-xs font-bold uppercase"
        >
          <LayoutGrid size={18} />
          Menu
        </Link>

        {hasNext ? (
          <Link href={`/dzikir/${slug}/${currentOrder + 1}`}>
            <ArrowRight size={20} />
          </Link>
        ) : (
          <span className="opacity-20">
            <ArrowRight size={20} />
          </span>
        )}
      </div>
    </div>
  );
}
