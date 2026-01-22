import ClientLayout from "./ClieantLayout";

export const dynamic = "error";
export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <ClientLayout>
            {children}
        </ClientLayout>
    )
}