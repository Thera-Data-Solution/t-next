"use client";

import { useState } from "react";
import {
  deleteJadwalKajian,
} from "./action";
import FormModal from "@/components/form/kajian";
import { JadwalKajian, Ustadzh } from "@/generated/prisma/client";
import { Pencil, PlusCircle, Trash } from "lucide-react";

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
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded absolute bottom-10 right-10"
      >
        <PlusCircle />
      </button>

      <div className="space-y-3">
        {data.map((item) => (
          <div
            key={item.id}
            className="rounded-xl p-4 flex justify-between items-center bg-emerald-100/80 shadow-xl"
          >
            <div>
              <p className="font-medium text-slate-700">{item.kajianJudul}</p>
              <p className="text-sm text-gray-500">
                {new Date(item.waktuMulai).toLocaleString()}
              </p>
            </div>

            <div className="flex gap-2">
              <button
                className="px-3 py-1 rounded bg-indigo-400 text-white text-xs"
                onClick={() => {
                  setEditing(item);
                  setOpen(true);
                }}
              >
                <Pencil size={10} />
              </button>
              <button
                className="px-3 py-1 bg-rose-700 font-bold text-white text-xs rounded"
                onClick={() => deleteJadwalKajian(item.id)}
              >
                <Trash size={10} />
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
