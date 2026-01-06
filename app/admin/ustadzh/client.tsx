'use client';

import { useState, useEffect } from 'react';
import { UstadzhForm } from '@/components/form/ustadzh';
import { Ustadzh } from '@prisma/client';
import { useTitleStore } from '@/store/title/_store';
import { createUstadzh, deletUstadzhById, updateUstadzhById } from './serv';

export default function UstadzhCRUDPage({ ustadzh }: { ustadzh: Ustadzh[] }) {
    const { setTitle } = useTitleStore();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedUstadzh, setSelectedUstadzh] = useState<Ustadzh | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        setTitle('Ustadzh Management');
    }, [setTitle]);

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setIsFormOpen(false);
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, []);

    const handleSubmit = async (data: { nama: string; bio: string }) => {
        setIsSubmitting(true);
        try {
            if (selectedUstadzh) {
                await updateUstadzhById(selectedUstadzh.id, data);
            } else {
                await createUstadzh(data);
            }
            setIsFormOpen(false);
            setSelectedUstadzh(null);
        } catch (err) {
            if (err instanceof Error) setError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Yakin ingin menghapus data ini?')) return;
        setIsLoading(true);
        try {
            await deletUstadzhById(id);
        } catch {
            setError('Gagal menghapus data');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className="relative space-y-6">
            <header className="flex justify-between items-end mb-4">
                <div>
                    <h1 className="text-xl font-bold text-slate-900">Ustadzh</h1>
                    <p className="text-xs text-slate-500">Kelola daftar pengisi kajian Anda</p>
                </div>
            </header>
            
            <button
                onClick={() => {
                    setSelectedUstadzh(null);
                    setIsFormOpen(true);
                }}
                className="fixed bottom-8 right-8 z-40 flex items-center gap-2 rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-xl shadow-indigo-600/40 hover:bg-indigo-700 active:scale-95 transition-all"
            >
                <span className="text-lg">+</span> Tambah Ustadzh
            </button>
            
            {error && (
                <div className="rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-600 animate-in fade-in zoom-in duration-200">
                    {error}
                </div>
            )}
            
            {isFormOpen && (
                <div className="fixed inset-0 z-[50] flex items-center justify-center p-4 sm:p-6">
                    <div 
                        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300"
                        onClick={() => setIsFormOpen(false)}
                    />
                    
                    <div className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-4 duration-300">
                        <div className="border-b border-slate-100 px-6 py-4 flex justify-between items-center">
                            <h3 className="text-lg font-bold text-slate-800">
                                {selectedUstadzh ? 'Edit Data Ustadzh' : 'Tambah Ustadzh Baru'}
                            </h3>
                            <button 
                                onClick={() => setIsFormOpen(false)}
                                className="text-slate-400 hover:text-slate-600 transition-colors"
                            >
                                ✕
                            </button>
                        </div>
                        <div className="p-6">
                            <UstadzhForm
                                initialData={selectedUstadzh}
                                onSubmit={handleSubmit}
                                onCancel={() => setIsFormOpen(false)}
                                isSubmitting={isSubmitting}
                            />
                        </div>
                    </div>
                </div>
            )}
            
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-slate-50/50">
                            <tr>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Nama Ustadzh</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Bio</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={3} className="px-6 py-10 text-center text-sm text-slate-400 animate-pulse">Memuat data...</td>
                                </tr>
                            ) : ustadzh.length === 0 ? (
                                <tr>
                                    <td colSpan={3} className="px-6 py-10 text-center text-sm text-slate-400">Belum ada data ustadzh</td>
                                </tr>
                            ) : (
                                ustadzh.map((u) => (
                                    <tr key={u.id} className="hover:bg-slate-50/80 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm">
                                                    {u?.nama?.charAt(0).toUpperCase()}
                                                </div>
                                                <span className="font-semibold text-slate-800 text-sm">{u.nama}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-600 max-w-xs truncate">
                                            {u.bio || '-'}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-3">
                                                <button
                                                    onClick={() => {
                                                        setSelectedUstadzh(u);
                                                        setIsFormOpen(true);
                                                    }}
                                                    className="px-3 py-1 rounded-md text-emerald-600 hover:bg-emerald-50 text-xs font-bold transition-colors"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(u.id)}
                                                    className="px-3 py-1 rounded-md text-red-600 hover:bg-red-50 text-xs font-bold transition-colors"
                                                >
                                                    Hapus
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}