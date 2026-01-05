import { MenuSectionProps } from "@/types/menu";

export const MenuSection: React.FC<MenuSectionProps> = ({ title, items }) => {
    if (items.length === 0) return null;

    return (
        <div className="space-y-2">
            <p className="px-2 text-xs uppercase tracking-wide text-gray-400">
                {title}
            </p>

            {items.map(({ name, icon: Icon, action }) => (
                <button
                    key={name}
                    onClick={action}
                    className="w-full flex items-center justify-between p-4 rounded-xl border
                     shadow-sm dark:bg-slate-800 dark:text-white
                     hover:bg-blue-500/10 transition"
                >
                    <div className="flex items-center space-x-3">
                        <Icon className="w-5 h-5 text-blue-500" />
                        <span className="font-medium">{name}</span>
                    </div>
                    <span className="text-gray-400">›</span>
                </button>
            ))}

            <hr className="my-4 border-gray-200 dark:border-slate-700" />
        </div>
    );
};
