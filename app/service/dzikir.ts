import prisma from "@/lib/prisma";

export async function getDzikirCategories() {
  return prisma.dzikirCategory.findMany({
    orderBy: { createdAt: "asc" },
  });
}

export async function getDzikirByCategory(slug: string) {
  return prisma.dzikirCategory.findUnique({
    where: { slug },
    include: {
      groups: {
        select: {
          order: true,
          id: true,
          title: true,
        },
        orderBy: { order: "asc" },
      },
    },
  });
}

export async function getDzikirDetail(slug: string, order: number) {
  return prisma.dzikirCategory.findFirst({
    where: {
      slug,
      groups: {
        some: {
          order,
        },
      },
    },
    include: {
      groups: {
        where: {
          order,
        },
        select: {
          order: true,
          id: true,
          title: true,
          items: {
            orderBy: { order: "asc" },
          },
        },
      },
    },
  });
}

export async function getDzikirCategoryInfo(slug: string) {
  return prisma.dzikirCategory.findUnique({
    where: { slug },
    include: {
      _count: {
        select: { groups: true },
      },
    },
  });
}
