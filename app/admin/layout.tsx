import ClientLayout from "./ClieantLayout";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <ClientLayout>
            {children}
        </ClientLayout>
    )
}