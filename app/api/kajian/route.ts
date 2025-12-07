import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET /api/kajian
export async function GET() {
  const data = await prisma.jadwalKajian.findMany({
    include: {
      ustadzhList: true,
    },
    orderBy: { waktuMulai: "asc" },
  });

  return NextResponse.json({ status: "success", data });
}

// POST /api/kajian
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      kajianJudul,
      waktuMulai,
      waktuSelesai,
      ustadzhIds,
      createdBy = "admin",
      updatedBy = "admin",
      KajianGenre,
      KajianUmur,
      lokasiOffline,
      linkLokasiOnline,
      lokasiOnline,
      gambar,
      sumber,
    } = body;

    const result = await prisma.jadwalKajian.create({
      data: {
        kajianJudul,
        waktuMulai: new Date(waktuMulai),
        waktuSelesai: new Date(waktuSelesai),
        createdBy,
        updatedBy,
        ustadzhList: {
          connect: ustadzhIds.map((id: string) => ({ id })),
        },
        KajianGenre,
        KajianUmur,
        lokasiOffline,
        linkLokasiOnline,
        lokasiOnline,
        gambar,
        sumber,
      },
    });

    return NextResponse.json(result);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
