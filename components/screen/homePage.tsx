"use client";

import CalendarView from "@/components/calendarView";
import { KajianData } from "@/types/event";
import { use } from "react";

export default function HomeScreen({ kajian }: { kajian: Promise<KajianData[]> }) {
    const data = use(kajian);
    return (
        <div className="h-full w-full">
            <div className="p-4">
                <CalendarView kajian={data || []} />
            </div>
        </div>
    );
}
