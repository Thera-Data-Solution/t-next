import { ICONS } from "@/constant/admin";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SidebarContent() {
    const navItems = [
        { label: 'Dashboard', icon: <ICONS.Dashboard />, path: '/admin' },
        { label: 'Ustadzh', icon: <ICONS.Articles />, path: '/admin/ustadzh' },
        { label: 'Kajian', icon: <ICONS.Calendar />, path: '/admin/kajian' },
        { label: 'Manage Users', icon: <ICONS.Users />, path: '/admin' },
    ];
    const pathName = usePathname();
    return (
        <div className="flex flex-col h-full bg-emerald-950 text-white">
            <div className="p-6 border-b border-emerald-900/50 flex items-center gap-3">
                <div className="bg-amber-500 p-2 rounded-lg shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 20v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" /><path d="M2 20v-4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v4" /><path d="M12 18V7l-2 2" /><path d="M6 14v-4a6 6 0 1 1 12 0v4" /><rect width="20" height="4" x="2" y="18" rx="1" /></svg>
                </div>
                <div>
                    <h1 className="font-islamic text-xl font-bold tracking-tight text-amber-100">Nurul Admin</h1>
                    <p className="text-[10px] uppercase tracking-widest text-emerald-400 font-semibold">CMS Panel v2.0</p>
                </div>
            </div>

            <nav className="flex-1 py-6 px-4 space-y-1">
                {navItems.map((item) => (
                    <Link
                        key={item.path}
                        href={item.path}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${pathName === item.path
                            ? 'bg-emerald-800 text-amber-100 shadow-md'
                            : 'text-emerald-300 hover:bg-emerald-900/50 hover:text-white'
                            }`}
                    >
                        <span className={`${pathName === item.path ? 'text-amber-400' : 'group-hover:text-amber-400'}`}>
                            {item.icon}
                        </span>
                        <span className="font-medium text-sm">{item.label}</span>
                    </Link>
                ))}
            </nav>

            <div className="p-4 border-t border-emerald-900/50">
                <div className="bg-emerald-900/30 rounded-2xl p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-700 flex items-center justify-center font-bold text-amber-200 border border-emerald-600">
                        UA
                    </div>
                    <div className="overflow-hidden">
                        <p className="text-sm font-bold truncate">Ustadz Admin</p>
                        <p className="text-[10px] text-emerald-400 truncate">Super Administrator</p>
                    </div>
                </div>
            </div>
        </div>
    )
}