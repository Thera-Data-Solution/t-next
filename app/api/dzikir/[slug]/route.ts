import { prisma } from "@/lib/prisma";

export async function GET(
    _: Request,
    context: { params: Promise<{ slug: string }> }
) {
    const { slug } = await context.params;
    const category = await prisma.dzikirCategory.findUnique({
        where: { slug },
        include: {
            _count: {
                select: { groups: true },
            },
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
    return Response.json({ category })

}