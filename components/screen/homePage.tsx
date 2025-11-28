"use client";

import { useEffect, useState } from "react";
import CalendarView from "@/components/calendarView";

export default function HomeScreen() {
    const [kajian, setKajian] = useState([]);

    useEffect(() => {
        const fetchKajian = async () => {
            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_URL}/api/kajian`
                );
                const json = await res.json();
                setKajian(json.data || []);
            } catch (err) {
                console.error("Error fetching kajian:", err);
            }
        };

        fetchKajian();
    }, []);

    return (
        <div className="h-full w-full">
            <div className="p-4">
                <CalendarView kajian={kajian} />
            </div>
        </div>
    );
}
