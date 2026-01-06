import { getAllJadwalKajian, getAllUstadzh } from "./action";
import JadwalKajianClient from "./jadwal-client";

export default async function Page() {
  const data = await getAllJadwalKajian();
  const ustadzh = await getAllUstadzh();

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Jadwal Kajian</h1>

      <JadwalKajianClient data={data} ustadzh={ustadzh} />
    </div>
  );
}
