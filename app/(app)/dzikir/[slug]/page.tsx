import { Suspense } from "react";
import DzikirContent from "./dzikirContent";
import { Metadata } from "next";


export const metadata: Metadata = {
    title: "Pilih Dzikir",
    description: "Kumpulan dzikir harian untuk memperkuat iman dan ketakwaan.",
};

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
