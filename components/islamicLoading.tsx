export default function IslamicLoading() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-slate-50">
      <div className="relative w-24 h-24 mb-6">
        <div className="absolute inset-0 rounded-full border-4 border-emerald-200 animate-pulse"></div>
        <div className="absolute inset-3 rounded-full border-4 border-emerald-400"></div>
      </div>
      <p className="text-emerald-700 text-lg font-semibold animate-pulse">
        سُبْحَانَ ٱللَّٰهِ
      </p>
      <p className="text-sm text-emerald-500 mt-1">
        Mohon bersabar...
      </p>
    </div>
  );
}
