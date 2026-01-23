// service/kajian.ts
import { prisma } from "@/lib/prisma";

export async function getAllWithPagination(page: number, pageSize: number) {
  const safePage = Math.max(1, page);
  const skip = (safePage - 1) * pageSize;
  return prisma.jadwalKajian.findMany({
    include: {
      ustadzhList: true,
    },
    where: {
      waktuMulai: {
        gte: new Date(),
      },
    },
    orderBy: { waktuMulai: "asc" },
    skip,
    take: pageSize,
  });
}

export async function getKajianByMonth(year: number, month: number) {
  const start = new Date(year, month, 1);
  const end = new Date(year, month + 1, 0, 23, 59, 59);

  return prisma.jadwalKajian.findMany({
    where: {
      waktuMulai: {
        gte: start,
        lte: end,
      },
    },
    include: {
      ustadzhList: true,
    },
    orderBy: { waktuMulai: "asc" },
  });
}
