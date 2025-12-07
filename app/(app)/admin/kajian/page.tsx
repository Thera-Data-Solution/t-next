"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MultiSelectUstadzh } from "@/components/multiSelectUstadzh"; 
import { Loader2 } from 'lucide-react';

export default function CreateJadwalKajianPage() {
    const router = useRouter();

    const [ustadzhSelected, setUstadzhSelected] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const body = Object.fromEntries(formData.entries());

        const res = await fetch("/api/kajian", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ...body,
                ustadzhIds: ustadzhSelected,
            }),
        });

        setLoading(false);

        if (!res.ok) {
            alert("Gagal menambahkan jadwal kajian");
            return;
        }

        alert("Jadwal kajian berhasil ditambahkan");
        router.push("/");
    };

    const inputStyle = 
        "w-full p-3 border border-gray-300 rounded-lg " +
        "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 " +
        "transition duration-150 ease-in-out dark:bg-gray-700 dark:border-gray-600 dark:text-white";

    const labelStyle = "block mb-2 font-semibold text-gray-700 dark:text-gray-200";

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4">
            <div className="w-full max-w-xl bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-8 space-y-6">
                <header className="text-center">
                    <h1 className="text-3xl font-extrabold text-blue-600 dark:text-blue-400">
                        Tambah Jadwal Kajian 🕌
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">Isi detail kajian di bawah ini.</p>
                </header>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className={labelStyle}>Genre</label>
                        <select name="KajianGenre" className={inputStyle}>
                            <option value="All">Semua (All)</option>
                            <option value="Ikhwan">Ikhwan (Laki-laki)</option>
                            <option value="Akhwat">Akhwat (Perempuan)</option>
                        </select>
                    </div>

                    <div>
                        <label className={labelStyle}>Kategori Umur</label>
                        <select name="KajianUmur" className={inputStyle}>
                            <option value="All">Semua (All)</option>
                            <option value="Dewasa">Dewasa</option>
                            <option value="Anak">Anak</option>
                        </select>
                    </div>

                    <div>
                        <label className={labelStyle}>Judul Kajian <span className="text-red-500">*</span></label>
                        <input name="kajianJudul" className={inputStyle} required placeholder="Masukkan judul kajian..." />
                    </div>

                    <div>
                        <label className={labelStyle}>Lokasi Offline</label>
                        <input name="lokasiOffline" className={inputStyle} placeholder="Contoh: Masjid Agung Al-Falah" />
                    </div>

                    <div>
                        <label className={labelStyle}>Link Lokasi Online</label>
                        <input name="linkLokasiOnline" className={inputStyle} placeholder="Contoh: https://meet.google.com/xyz" />
                    </div>

                    <div>
                        <label className={labelStyle}>Platform Online</label>
                        <input name="lokasiOnline" className={inputStyle} placeholder="Contoh: Zoom, Google Meet, YouTube" />
                    </div>
                    
                    <div>
                        <label className={labelStyle}>Gambar (URL Poster)</label>
                        <input name="gambar" className={inputStyle} placeholder="URL gambar/poster kajian" />
                    </div>

                    <div>
                        <label className={labelStyle}>Sumber Informasi</label>
                        <input name="sumber" className={inputStyle} placeholder="Contoh: Instagram @kajianislami" />
                    </div>

                    <div>
                        <label className={labelStyle}>Waktu Mulai <span className="text-red-500">*</span></label>
                        <input 
                            type="datetime-local" 
                            name="waktuMulai" 
                            className={inputStyle} 
                            required
                        />
                    </div>

                    <div>
                        <label className={labelStyle}>Waktu Selesai <span className="text-red-500">*</span></label>
                        <input 
                            type="datetime-local" 
                            name="waktuSelesai" 
                            className={inputStyle} 
                            required
                        />
                    </div>

                    <div>
                        <label className={labelStyle}>Pilih Ustadzh</label>
                        <MultiSelectUstadzh
                            value={ustadzhSelected}
                            onChange={setUstadzhSelected}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`
                            w-full flex justify-center items-center py-3 px-4 rounded-lg text-lg font-bold 
                            transition duration-300 ease-in-out 
                            ${loading 
                                ? 'bg-blue-400 cursor-not-allowed text-white' 
                                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg'
                            }
                        `}
                    >
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-5 w-5 animate-spin" /> 
                                Menyimpan...
                            </>
                        ) : (
                            "Simpan Jadwal Kajian"
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}