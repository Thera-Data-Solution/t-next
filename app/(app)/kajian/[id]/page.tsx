import { Suspense } from "react";
import { prisma } from "@/lib/prisma";
import KajianContent from "./KajianContent";

export async function generateStaticParams() {
  const kajian = await prisma.jadwalKajian.findMany({
    select: { id: true },
  });

  return kajian.map((k) => ({
    id: k.id,
  }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <Suspense fallback={<div>Memuat kajian...</div>}>
      <KajianContent id={id} />
    </Suspense>
  );
}
