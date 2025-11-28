export interface KajianData {
  id: string;
  ustadzhId: string;
  waktuMulai: string; // ISO Date string
  waktuSelesai: string; // ISO Date string
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
  ustadzh: {
    nama: string
  }
}

export interface ApiResponse {
  status: string;
  data: KajianData;
}

// Helper type for our internal use (list of events)
export type EventList = KajianData[];