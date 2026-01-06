export const StatCard = ({ label, value, color }: { label: string, value: number, color: string }) => (
    <div className={`bg-white rounded-3xl p-6 border-l-4 ${color} shadow-sm flex flex-col`}>
        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{label}</span>
        <span className="text-3xl font-black text-slate-800 tracking-tight">{value}</span>
    </div>
);