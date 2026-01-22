import { Suspense } from "react";
import DzikirContent from "./dzikirContent";

import prisma from "@/lib/prisma";

export async function generateStaticParams() {
    const categories = await prisma.dzikirCategory.findMany({
        select: { slug: true },
    });

    return categories.map((c) => ({
        slug: c.slug,
    }));
}

export default async function Page({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    return (
        <Suspense
            fallback={
                <div className="p-6 text-center text-slate-400">
                    Memuat dzikir...
                </div>
            }
        >
            <DzikirContent slug={slug} />
        </Suspense>
    );
}
