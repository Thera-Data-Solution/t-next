import { Suspense } from "react";
import DzikirDetailContent from "./DzikirDetailContent";
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
