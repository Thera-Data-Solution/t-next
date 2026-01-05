import TasbihSection from "./client";

export default function Page() {
    return (
        <div className="flex flex-col min-h-screen max-w-md mx-auto relative overflow-hidden">

            <main className="flex-1 overflow-y-auto px-4 pb-28 pt-4">
                <TasbihSection />
            </main>
        </div>
    )
}