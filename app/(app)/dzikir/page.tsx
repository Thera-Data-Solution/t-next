import { Metadata } from "next";
import ClientPage from "./client";

export const metadata: Metadata = {
    title: "Dzikir",
    description: "Kumpulan dzikir harian untuk memperkuat iman dan ketakwaan.",
};

export default async function Page() {
    return <ClientPage />;
}