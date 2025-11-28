import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  _: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const data = await prisma.jadwalKajian.findUnique({
    where: { id },
    include: { ustadzh: true },
  });

  if (!data) {
    return NextResponse.json(
      { status: "error", message: "Not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({ status: "success", data });
}

export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
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
    updatedBy,
  } = body;

  const updated = await prisma.jadwalKajian.update({
    where: { id },
    data: {
      ustadzhId,
      waktuMulai: waktuMulai ? new Date(waktuMulai) : undefined,
      waktuSelesai: waktuSelesai ? new Date(waktuSelesai) : undefined,
      kajianJudul,
      KajianGenre,
      KajianUmur,
      lokasiOffline,
      lokasiOnline,
      linkLokasiOnline,
      gambar,
      sumber,
      updatedBy,
    },
  });

  return NextResponse.json({ status: "success", data: updated });
}

export async function DELETE(
  _: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  await prisma.jadwalKajian.delete({
    where: { id },
  });

  return NextResponse.json({ status: "success", message: "Kajian deleted" });
}
