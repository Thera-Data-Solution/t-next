'use client';

import { useState, useEffect, useCallback } from 'react';
import { UstadzhForm } from '@/components/form/ustadzh';
import { Ustadzh } from '@prisma/client';
import { Plus, Pencil, Trash2 } from 'lucide-react';

export default function UstadzhCRUDPage() {
    const [ustadzList, setUstadzList] = useState<Ustadzh[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedUstadzh, setSelectedUstadzh] = useState<Ustadzh | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const fetchUstadz = useCallback(async () => {
        setIsLoading(true);
        try {
            const res = await fetch('/api/ustadzh');
            if (!res.ok) throw new Error('Gagal mengambil data');
            const data = await res.json();
            setUstadzList(data.data || []);
        } catch (err) {
            if (err instanceof Error) setError(err.message);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchUstadz();
    }, [fetchUstadz]);

    const handleSubmit = async (data: { nama: string; bio: string }) => {
        setIsSubmitting(true);
        try {
            const method = selectedUstadzh ? 'PUT' : 'POST';
            const url = selectedUstadzh
                ? `/api/ustadzh/${selectedUstadzh.id}`
                : '/api/ustadzh';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!res.ok) throw new Error('Gagal menyimpan data');

            await fetchUstadz();
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

        try {
            await fetch(`/api/ustadzh/${id}`, { method: 'DELETE' });
            fetchUstadz();
        } catch {
            setError('Gagal menghapus data');
        }
    };

    return (
        <section className="space-y-6">
            {/* Header */}
            <header className="mb-4">
                <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Ustadzh
                </h1>
                <p className="text-xs text-gray-500">
                    Kelola data pengisi kajian
                </p>
            </header>

            <button
                onClick={() => {
                    setSelectedUstadzh(null);
                    setIsFormOpen(true);
                }}
                className="
    fixed bottom-5 right-5 z-40
    flex items-center gap-2
    rounded-full bg-indigo-600
    px-5 py-3 text-sm font-medium text-white
    shadow-lg shadow-indigo-600/30
    active:scale-95 transition
  "
            >
                + Tambah
            </button>

            {/* Error */}
            {error && (
                <div className="rounded-lg bg-red-50 dark:bg-red-900/20 p-3 text-sm text-red-600 dark:text-red-400">
                    {error}
                </div>
            )}

            {/* Form */}
            {isFormOpen && (
                <div className="rounded-xl bg-white dark:bg-gray-800 p-4 shadow">
                    <UstadzhForm
                        initialData={selectedUstadzh}
                        onSubmit={handleSubmit}
                        onCancel={() => setIsFormOpen(false)}
                        isSubmitting={isSubmitting}
                    />
                </div>
            )}

            {/* Content */}
            {isLoading ? (
                <p className="text-sm text-gray-500 animate-pulse">Memuat data...</p>
            ) : ustadzList.length === 0 ? (
                <p className="text-sm text-gray-500">
                    Belum ada data ustadzh
                </p>
            ) : (
                <div className="space-y-3">
                    {ustadzList.map((u) => (
                        <div
                            key={u.id}
                            onClick={() => {
                                setSelectedUstadzh(u);
                                setIsFormOpen(true);
                            }}
                            className="
        group cursor-pointer
        rounded-2xl bg-white dark:bg-gray-800
        p-4 shadow-sm
        active:scale-[0.98] transition
      "
                        >
                            <div className="flex items-start justify-between">
                                <div className="space-y-1">
                                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                                        {u.nama}
                                    </p>
                                    <p className="text-xs text-gray-500 line-clamp-2">
                                        {u.bio || 'Bio belum tersedia'}
                                    </p>
                                </div>

                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDelete(u.id);
                                    }}
                                    className="
            opacity-0 group-hover:opacity-100
            text-xs text-red-500
            transition
          "
                                >
                                    Hapus
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

            )}
        </section>
    );
}
