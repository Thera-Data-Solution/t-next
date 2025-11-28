import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET /api/kajian
export async function GET() {
  const data = await prisma.jadwalKajian.findMany({
    include: {
      ustadzh: true,
    },
    orderBy: { waktuMulai: "asc" },
  });

  return NextResponse.json({ status: "success", data });
}

// POST /api/kajian
export async function POST(request: Request) {
  const body = await request.json();

  const {
    ustadzhId,
    waktuMulai,
    waktuSelesai,
    kajianJudul,
    KajianGenre,
    KajianUmur,
    lokasiOffline,
    lokasiOnline,
    linkLokasiOnline,
    gambar,
    sumber,
    createdBy,
  } = body;

  const newKajian = await prisma.jadwalKajian.create({
    data: {
      ustadzhId,
      waktuMulai: new Date(waktuMulai),
      waktuSelesai: new Date(waktuSelesai),
      kajianJudul,
      KajianGenre,
      KajianUmur,
      lokasiOffline,
      lokasiOnline,
      linkLokasiOnline,
      gambar,
      sumber,
      createdBy,
      updatedBy: createdBy,
    },
  });

  return NextResponse.json({ status: "success", data: newKajian });
}
