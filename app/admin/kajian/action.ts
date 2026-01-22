"use server";

import prisma from "@/lib/prisma";
import { Genre, Umur } from "@prisma/client";

export async function getAllJadwalKajian() {

    return prisma.jadwalKajian.findMany({
        include: {
            ustadzhList: true,
        },
        orderBy: {
            waktuMulai: "asc",
        },
    });
}

export async function getAllUstadzh() {
    return prisma.ustadzh.findMany({
        orderBy: { nama: "asc" },
    });
}

export async function createJadwalKajian(data: {
    kajianJudul: string;
    waktuMulai: Date;
    waktuSelesai: Date;
    KajianGenre: Genre;
    KajianUmur: Umur;
    lokasiOffline?: string;
    lokasiOnline?: string;
    linkLokasiOnline?: string;
    sumber?: string;
    createdBy: string;
    ustadzhIds: string[];
}) {
    await prisma.jadwalKajian.create({
        data: {
            kajianJudul: data.kajianJudul,
            waktuMulai: data.waktuMulai,
            waktuSelesai: data.waktuSelesai,
            KajianGenre: data.KajianGenre,
            KajianUmur: data.KajianUmur,
            lokasiOffline: data.lokasiOffline,
            lokasiOnline: data.lokasiOnline,
            linkLokasiOnline: data.linkLokasiOnline,
            sumber: data.sumber,
            createdBy: data.createdBy,
            updatedBy: data.createdBy,
            ustadzhList: {
                connect: data.ustadzhIds.map(id => ({ id })),
            },
        },
    });
}

export async function updateJadwalKajian(
    id: string,
    data: {
        kajianJudul: string;
        waktuMulai: Date;
        waktuSelesai: Date;
        KajianGenre: Genre;
        KajianUmur: Umur;
        lokasiOffline?: string;
        lokasiOnline?: string;
        linkLokasiOnline?: string;
        sumber?: string;
        updatedBy: string;
        ustadzhIds: string[];
    }
) {
    await prisma.jadwalKajian.update({
        where: { id },
        data: {
            kajianJudul: data.kajianJudul,
            waktuMulai: data.waktuMulai,
            waktuSelesai: data.waktuSelesai,
            KajianGenre: data.KajianGenre,
            KajianUmur: data.KajianUmur,
            lokasiOffline: data.lokasiOffline,
            lokasiOnline: data.lokasiOnline,
            linkLokasiOnline: data.linkLokasiOnline,
            sumber: data.sumber,
            updatedBy: data.updatedBy,
            ustadzhList: {
                set: [],
                connect: data.ustadzhIds.map(id => ({ id })),
            },
        },
    });
}

export async function deleteJadwalKajian(id: string) {
    await prisma.jadwalKajian.delete({
        where: { id },
    });
}
