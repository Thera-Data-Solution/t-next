"use client";
import React, { useState } from 'react';
import SidebarContent from '@/components/sidebarContent';
import { ICONS } from '@/constant/admin';
import { useTitleStore } from '@/store/title/_store';

interface LayoutProps {
    children: React.ReactNode;
}

const ClientLayout: React.FC<LayoutProps> = ({ children }) => {
    const { title } = useTitleStore();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);


    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:block w-72 h-screen sticky top-0 shadow-2xl z-30">
                <SidebarContent />
            </aside>

            {/* Mobile Drawer */}
            <div className={`fixed inset-0 z-50 transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsSidebarOpen(false)} />
                <aside className={`absolute left-0 top-0 bottom-0 w-80 bg-emerald-950 transition-transform duration-300 ease-out shadow-2xl ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                    <SidebarContent />
                    <button
                        onClick={() => setIsSidebarOpen(false)}
                        className="absolute top-6 right-[-50px] bg-emerald-950 text-white p-2 rounded-r-lg"
                    >
                        <ICONS.Close />
                    </button>
                </aside>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Header bar (Mobile only or for actions) */}
                <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-6 sticky top-0 z-20">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsSidebarOpen(true)}
                            className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                        >
                            <ICONS.Menu />
                        </button>
                        <h2 className="text-lg font-bold text-slate-800 font-islamic lg:text-xl">{title}</h2>
                    </div>

                    <div className="flex items-center gap-3">
                        <button className="p-2 text-slate-400 hover:text-emerald-700 hover:bg-emerald-50 rounded-full transition-all">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" /></svg>
                        </button>
                        <div className="h-8 w-px bg-slate-200 mx-1 hidden sm:block"></div>
                        <div className="hidden sm:flex items-center gap-2">
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-tighter">Active Project:</span>
                            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded">Nurul Al-Falah</span>
                        </div>
                    </div>
                </header>

                <main className="flex-1 p-4 lg:p-8 islamic-pattern">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default ClientLayout;
