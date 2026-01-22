"use client";

import { useState } from "react";
import {
  deleteJadwalKajian,
} from "./action";
import FormModal from "@/components/form/kajian";
import { JadwalKajian, Ustadzh } from "@prisma/client";

type JadwalKajianWithUstadzh = JadwalKajian & {
  ustadzhList: Ustadzh[];
};

export default function JadwalKajianClient({
  data,
  ustadzh,
}: {
  data: JadwalKajianWithUstadzh[];
  ustadzh: Ustadzh[];
}) {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<JadwalKajianWithUstadzh>();

  return (
    <>
      <button
        onClick={() => {
          setEditing(undefined);
          setOpen(true);
        }}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Tambah Jadwal
      </button>

      <div className="space-y-3">
        {data.map((item) => (
          <div
            key={item.id}
            className="border rounded p-4 flex justify-between items-center"
          >
            <div>
              <p className="font-medium">{item.kajianJudul}</p>
              <p className="text-sm text-gray-500">
                {new Date(item.waktuMulai).toLocaleString()}
              </p>
            </div>

            <div className="flex gap-2">
              <button
                className="px-3 py-1 border rounded"
                onClick={() => {
                  setEditing(item);
                  setOpen(true);
                }}
              >
                Edit
              </button>
              <button
                className="px-3 py-1 border border-red-500 text-red-500 rounded"
                onClick={() => deleteJadwalKajian(item.id)}
              >
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>

      {open && (
        <FormModal
          ustadzh={ustadzh}
          data={editing}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}
