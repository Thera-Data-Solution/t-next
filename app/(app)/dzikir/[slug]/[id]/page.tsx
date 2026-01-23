import { Suspense } from "react";
import DzikirDetailContent from "./DzikirDetailContent";
import { prisma } from "@/lib/prisma";

/**
 * WAJIB untuk prerender dynamic route
 */
export async function generateStaticParams() {
  const categories = await prisma.dzikirCategory.findMany({
    select: {
      slug: true,
      groups: {
        select: { order: true },
      },
    },
  });

  return categories.flatMap((c) =>
    c.groups.map((g) => ({
      slug: c.slug,
      id: String(g.order),
    }))
  );
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string; id: string }>;
}) {
  const { slug, id } = await params;

  return (
    <Suspense
      fallback={
        <div className="p-6 text-center text-slate-400">
          Memuat dzikir...
        </div>
      }
    >
      <DzikirDetailContent slug={slug} id={id} />
    </Suspense>
  );
}
