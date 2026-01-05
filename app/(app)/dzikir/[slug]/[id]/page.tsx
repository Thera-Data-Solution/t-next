import { getDzikirCategoryInfo, getDzikirDetail } from "@/app/service/dzikir";
import { ArrowLeft, ArrowRight, LayoutGrid } from "lucide-react";
import Link from "next/link";

export default async function Page({ params }: { params: Promise<{ id: string, slug: string }> }) {
  const { id, slug } = await params;
  const currentOrder = parseInt(id);

  const [item, categoryInfo] = await Promise.all([
    getDzikirDetail(slug, currentOrder),
    getDzikirCategoryInfo(slug)
  ]);

  if (!item || !categoryInfo) {
    return <div className="p-6 text-center text-slate-500">Dzikir tidak ditemukan.</div>;
  }

  const totalGroups = categoryInfo._count.groups;
  const hasPrev = currentOrder > 0;
  const hasNext = currentOrder < (totalGroups - 1);

  if (!item) {
    return <div className="p-6 text-center text-slate-500">Dzikir tidak ditemukan.</div>;
  }

  if (item.groups.length === 0) {
    return (
      <div className="animate-in fade-in zoom-in-95 duration-500 pb-24">
        <div className="flex items-center justify-between mb-6 sticky top-0 bg-[#f8fafc]/80 backdrop-blur-md py-2 z-30 px-2 rounded-xl">
          <Link href={`/dzikir/${slug}`} className="p-2 hover:bg-white rounded-full transition-colors shadow-sm">
            <ArrowLeft size={20} className="text-slate-600" />
          </Link>
          <div className="text-center flex-1">
            <h2 className="text-xs font-bold text-emerald-600 uppercase tracking-widest">{item?.title}</h2>
          </div>
        </div>
        <div className="p-6 text-center text-slate-500">Dzikir belum memiliki bacaan.</div>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in zoom-in-95 duration-500 pb-24">
      <div className="flex items-center justify-between mb-6 sticky top-0 bg-[#f8fafc]/80 backdrop-blur-md py-2 z-30 px-2 rounded-xl">
        <Link href={`/dzikir/${slug}`} className="p-2 hover:bg-white rounded-full transition-colors shadow-sm">
          <ArrowLeft size={20} className="text-slate-600" />
        </Link>
        <div className="text-center flex-1">
          <h2 className="text-xs font-bold text-emerald-600 uppercase tracking-widest">{item?.title}</h2>
          <p className="text-sm font-bold text-slate-800 line-clamp-1">{item?.groups[0]?.title}</p>
        </div>
        <div className="w-10"></div>
      </div>
      <div className="space-y-6 mx-6">
        {item.groups[0].items.map((reading, idx) => (
          <div key={reading.id} className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 px-4 py-1.5 bg-emerald-50 text-emerald-600 text-[10px] font-bold rounded-bl-2xl">
              BACAAN {idx + 1}
            </div>

            <div className="arabic text-3xl leading-[2.2] text-center text-slate-900 mb-8 pt-4 selection:bg-emerald-100">
              {reading.arabic}
            </div>

            <div className="space-y-4 border-t border-slate-50 pt-6">
              <div>
                <p className="text-[10px] font-bold text-emerald-600 uppercase mb-1 tracking-wider">Latin</p>
                <p className="text-slate-600 italic leading-relaxed text-sm">{reading.transliteration}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-emerald-600 uppercase mb-1 tracking-wider">Arti</p>
                <p className="text-slate-600 leading-relaxed text-sm">{reading.translation}</p>
              </div>
            </div>

            <div className="mt-8 flex flex-col items-center">
              <div className="w-14 h-14 rounded-full border-2 border-emerald-100 flex items-center justify-center bg-emerald-50/30">
                <span className="text-xl font-bold text-emerald-600">{reading.count}x</span>
              </div>
              <p className="text-[10px] text-slate-400 mt-2 font-bold uppercase tracking-tight">Ulangi {reading.count} kali</p>
            </div>
          </div>
        ))}
      </div>

      <div className="fixed bottom-24 left-1/2 -translate-x-1/2 w-[85%] max-w-[320px] bg-white border border-slate-200 shadow-2xl rounded-full px-4 py-2 flex justify-between items-center z-40">
        {hasPrev ? (
          <Link
            href={`/dzikir/${slug}/${currentOrder - 1}`}
            className="p-3 text-slate-400 hover:text-emerald-600 transition-colors"
          >
            <ArrowLeft size={20} />
          </Link>
        ) : (
          <button disabled className="p-3 text-slate-200 cursor-not-allowed">
            <ArrowLeft size={20} />
          </button>
        )}

        <div className="h-4 w-[1px] bg-slate-100"></div>

        <Link
          href={`/dzikir/${slug}`}
          className="flex items-center gap-2 px-4 py-2 text-slate-500 hover:text-emerald-600 transition-colors"
        >
          <LayoutGrid size={18} />
          <span className="text-[10px] font-bold uppercase">Menu</span>
        </Link>

        <div className="h-4 w-[1px] bg-slate-100"></div>

        {
          hasNext ? (
            <Link
              href={`/dzikir/${slug}/${currentOrder + 1}`}
              className="p-3 text-slate-400 hover:text-emerald-600 disabled:opacity-20 transition-colors"
            >
              <ArrowRight size={20} />
            </Link>
          ) : (
            <button disabled className="p-3 text-slate-200 cursor-not-allowed">
              <ArrowRight size={20} />
            </button>
          )
        }

      </div>
    </div>
  );
}