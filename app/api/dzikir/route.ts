import { prisma } from "@/lib/prisma";

export async function GET() {
    const categories = await prisma.dzikirCategory.findMany({
        orderBy: { createdAt: "asc" },
    });
    return Response.json({ categories })
}