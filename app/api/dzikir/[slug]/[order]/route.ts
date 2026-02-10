import { prisma } from "@/lib/prisma";

export async function GET(
    _: Request,
    context: { params: Promise<{ slug: string, order: string }> }
) {
    const { slug, order } = await context.params;
    const category = await prisma.dzikirCategory.findFirst({
        where: {
            slug,
            groups: {
                some: {
                    order: Number(order),
                },
            },
        },
        include: {
            _count: {
                select: { groups: true },
            },
            groups: {
                where: {
                    order: Number(order),
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
    return Response.json({ category })

}