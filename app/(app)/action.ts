"use server";

import { revalidateTag } from "next/cache";
import { getAllWithPagination, getKajianByMonth } from "../service/kajian";

export async function refetchKajian(year: number, month: number) {
    const tag = `kajian-${year}-${month}`;
    revalidateTag(tag, "max");

    return getKajianByMonth(year, month);
}

export async function refetchUpcoming(page: number, pageSize = 10) {
  const tag = `upcoming-${page}`;
  revalidateTag(tag, 'max');
  return getAllWithPagination(page, pageSize);
}