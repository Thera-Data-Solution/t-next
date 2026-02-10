import { unstable_cache } from "next/cache";
import { getAllWithPagination, getKajianByMonth } from "../service/kajian";
import CalendarView from "@/components/calendarView";

export default async function Page() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const page = 1;
  const pageSize = 10;


  const cacheKajian = unstable_cache(
    () => getKajianByMonth(year, month),
    [`kajian-${year}-${month}`],
    {
      tags: [`kajian-${year}-${month}`],
      revalidate: 60,
    }
  );

  const cacheKajianWithPagination = unstable_cache(
    () => getAllWithPagination(page, pageSize),
    [`kajian-upcoming-${page}`],
    {
      tags: [`kajian-upcoming-${page}`],
      revalidate: 60,
    }
  );

  const upcomingInitial = await cacheKajianWithPagination();
  const kajian = await cacheKajian();

  return (
    <div className="p-4">
      <CalendarView
        initialUpcoming={upcomingInitial}
        initialKajian={kajian}
        initialYear={year}
        initialMonth={month}
      />
    </div>
  );
}
