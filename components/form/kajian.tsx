"use client";

import { useState } from "react";
import { createJadwalKajian, updateJadwalKajian } from "../../app/admin/kajian/action";
import { Genre, JadwalKajian, Umur, Ustadzh } from "@prisma/client";


function toDatetimeLocal(date?: Date | string) {
    if (!date) return "";
    const d = new Date(date);
    return new Date(d.getTime() - d.getTimezoneOffset() * 60000)
        .toISOString()
        .slice(0, 16);
}

type kajianProps = {
    id: string;
    ustadzhList?: Ustadzh[];
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
}


export default function FormModal({ data, ustadzh, onClose }: { data?: kajianProps; ustadzh: Ustadzh[]; onClose: () => void }) {
    const [form, setForm] = useState({
        kajianJudul: data?.kajianJudul ?? "",
        waktuMulai: toDatetimeLocal(data?.waktuMulai),
        waktuSelesai: toDatetimeLocal(data?.waktuSelesai),
        ustadzhIds: data?.ustadzhList?.map((u: Ustadzh) => u.id) ?? [],
    });


    async function submit() {
        const payload = {
            kajianJudul: form.kajianJudul,
            waktuMulai: new Date(form.waktuMulai),
            waktuSelesai: new Date(form.waktuSelesai),
            KajianGenre: "All" as Genre,
            KajianUmur: "All" as Umur,
            ustadzhIds: form.ustadzhIds,
            createdBy: "admin",
            updatedBy: "admin",
        };

        if (data) {
            await updateJadwalKajian(data.id, payload);
        } else {
            await createJadwalKajian(payload);
        }

        onClose();
    }

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-lg rounded-lg p-6 space-y-4">
                <h2 className="text-lg font-semibold">
                    {data ? "Edit Jadwal" : "Tambah Jadwal"}
                </h2>

                <input
                    className="w-full border p-2 rounded"
                    placeholder="Judul Kajian"
                    value={form.kajianJudul}
                    onChange={e => setForm({ ...form, kajianJudul: e.target.value })}
                />

                <input
                    type="datetime-local"
                    className="w-full border p-2 rounded"
                    value={form.waktuMulai}
                    onChange={e => setForm({ ...form, waktuMulai: e.target.value })}
                />

                <input
                    type="datetime-local"
                    className="w-full border p-2 rounded"
                    value={form.waktuSelesai}
                    onChange={e => setForm({ ...form, waktuSelesai: e.target.value })}
                />

                <select
                    multiple
                    className="w-full border p-2 rounded h-32"
                    value={form.ustadzhIds}
                    onChange={e =>
                        setForm({
                            ...form,
                            ustadzhIds: Array.from(e.target.selectedOptions).map(o => o.value),
                        })
                    }
                >
                    {ustadzh.map((u: Ustadzh) => (
                        <option key={u.id} value={u.id}>
                            {u.nama}
                        </option>
                    ))}
                </select>

                <div className="flex justify-end gap-2">
                    <button onClick={onClose} className="px-4 py-2 border rounded">
                        Batal
                    </button>
                    <button
                        onClick={submit}
                        className="px-4 py-2 bg-blue-600 text-white rounded"
                    >
                        Simpan
                    </button>
                </div>
            </div>
        </div>
    );
}
