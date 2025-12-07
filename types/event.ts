import { Ustadzh } from "@prisma/client";

export interface KajianData {
  id: string;
  ustadzhId: string;
  waktuMulai: string;
  waktuSelesai: string;
  kajianJudul: string;
  KajianGenre: string;
  KajianUmur: string;
  lokasiOffline: string | null;
  linkLokasiOnline: string | null;
  lokasiOnline: string | null;
  gambar: string;
  sumber: string;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
  ustadzhList: Ustadzh[];
}

export interface ApiResponse {
  status: string;
  data: KajianData;
}

export type EventList = KajianData[];