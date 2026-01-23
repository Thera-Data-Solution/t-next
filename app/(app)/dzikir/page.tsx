import { Metadata } from "next";
import { getDzikirCategories } from "../../service/dzikir";
import ClientPage from "./client";
import { unstable_cache } from "next/cache";

export const metadata: Metadata = {
    title: "Dzikir",
    description: "Kumpulan dzikir harian untuk memperkuat iman dan ketakwaan.",
};

const getCacheDzikirCategories = unstable_cache(
    async () => getDzikirCategories(),
    ['dzikir-categories']
)

export default async function Page() {
    const data = await getCacheDzikirCategories();
    return <ClientPage data={data} />;
}