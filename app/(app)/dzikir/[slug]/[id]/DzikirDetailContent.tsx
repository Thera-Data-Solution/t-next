"use client"

import IslamicLoading from "@/components/islamicLoading";
import { ArrowLeft, ArrowRight, LayoutGrid } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export interface IGroups {
  order: number
  id: string
  title: string
  items: Item[]
}

export interface Item {
  id: string
  arabic: string
  transliteration: string
  translation: string
  count: number
  order: number
  dzikirId: string
  createdAt: string
  updatedAt: string
}


export default function DzikirDetailContent({
  slug,
  id,
}: {
  slug: string;
  id: string;
}) {
  const [title, setTitle] = useState<string>("");
  const [groups, setGroups] = useState<IGroups[]>([]);
  const [categoryInfo, setCategoryInfo] = useState(0);
  const [loading, setLoading] = useState(true);


  const currentOrder = parseInt(id);

  useEffect(() => {
    const fetchItem = async () => {
      const resItem = await fetch(`/api/dzikir/${slug}/${currentOrder}`)
      if (resItem.ok) {
        const { category: json1 } = await resItem.json();
        setTitle(json1.title);
        setGroups(json1.groups);
        setCategoryInfo(json1._count.groups || 0)
        console.log('HEREEEEEEEEE', json1._count.groups)
        setLoading(false)
      }
    };

    fetchItem();
  }, [currentOrder, slug]);

  if (loading) return (
    <IslamicLoading />
  )


  if (!loading && groups.length === 0) {
    return (
      <div className="animate-in fade-in zoom-in-95 duration-500 pb-24">
        <div className="flex items-center justify-between mb-6 sticky top-0 bg-gray-100 dark:bg-slate-800 dark:text-slate-300 backdrop-blur-md py-2 z-30 px-2 rounded-xl">
          <Link
            href={`/dzikir/${slug}`}
            className="p-2 hover:bg-white rounded-full shadow-sm"
          >
            <ArrowLeft size={20} />
          </Link>
          <div className="text-center flex-1">
            <h2 className="text-xs font-bold text-emerald-600 uppercase tracking-widest">
              {title}
            </h2>
          </div>
        </div>

        <div className="p-6 text-center text-slate-500">
          Dzikir belum memiliki bacaan.
        </div>
      </div>
    );
  }

  const totalGroups = categoryInfo;
  const hasPrev = currentOrder > 0;
  const hasNext = currentOrder < totalGroups - 1;

  return (
    <div className="animate-in fade-in zoom-in-95 duration-500 pb-24">
      <div className="flex items-center justify-between mb-6 sticky top-0 bg-gray-100 dark:bg-slate-800 dark:text-slate-300 backdrop backdrop-blur-md py-2 z-30 px-2 rounded-xl">
        <Link
          href={`/dzikir/${slug}`}
          className="p-2 hover:bg-white rounded-full shadow-sm"
        >
          <ArrowLeft size={20} />
        </Link>
        <div className="text-center flex-1">
          <h2 className="text-xs font-bold text-emerald-600 uppercase tracking-widest">
            {title}
          </h2>
          <p className="text-sm font-bold line-clamp-1">
            {groups[0].title}
          </p>
        </div>
        <div className="w-10" />
      </div>
      <div className="space-y-6 mx-6">
        {groups[0].items.map((reading) => (
          <div
            key={reading.id}
            className="bg-white dark:bg-slate-800 dark:text-slate-300 rounded-3xl p-6 border shadow-sm"
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
      <div className="fixed bottom-24 left-1/2 -translate-x-1/2 w-[85%] max-w-[320px] bg-white dark:bg-slate-800 dark:text-slate-300 border shadow-2xl rounded-full px-4 py-2 flex justify-between items-center z-40">
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
