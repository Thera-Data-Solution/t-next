import HomeScreen from "@/components/screen/homePage";
import { Metadata } from "next";
import { getKajian } from "../service/kajian";
import { Suspense } from "react";
import CalendarViewSkeleton from "@/components/screen/homePageSkeleton";

export const metadata: Metadata = {
  title: 'Scheduler'
}

export default async function Page() {
  const kajian = getKajian();
  return (
    <Suspense fallback={<CalendarViewSkeleton />}>
      <HomeScreen kajian={kajian} />
    </Suspense>
  )
}