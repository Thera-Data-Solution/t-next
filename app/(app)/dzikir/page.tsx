import { Metadata } from "next";
import { getDzikirCategories } from "../../service/dzikir";
import ClientPage from "./client";

export const metadata: Metadata = {
    title: "Dzikir",
    description: "Kumpulan dzikir harian untuk memperkuat iman dan ketakwaan.",
};

export default async function Page() {
    const data = await getDzikirCategories();
    return <ClientPage data={data} />;
}