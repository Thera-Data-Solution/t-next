'use client';

import { useState, useEffect, useCallback } from 'react';
import { UstadzhForm } from '@/components/form/ustadzh';
import { Ustadzh } from '@prisma/client';

export default function UstadzhCRUDPage() {
    const [ustadzList, setUstadzList] = useState<Ustadzh[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedUstadzh, setSelectedUstadzh] = useState<Ustadzh | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const fetchUstadz = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch('/api/ustadzh');
            if (!response.ok) throw new Error('Gagal mengambil data.');
            const data = await response.json();
            setUstadzList(data.data || []);
        } catch (err) {
            if (err instanceof Error)
                setError(err.message || 'Terjadi kesalahan saat mengambil data.');
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchUstadz();
    }, [fetchUstadz]);
    
    const handleSubmit = async (data: { nama: string; bio: string }) => {
        setIsSubmitting(true);
        setError(null);
        try {
            const method = selectedUstadzh ? 'PUT' : 'POST';
            const url = selectedUstadzh ? `/api/ustadzh/${selectedUstadzh.id}` : '/api/ustadzh';

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.error || `Gagal ${selectedUstadzh ? 'mengubah' : 'menambah'} data.`);
            }
            
            await fetchUstadz();
            setIsFormOpen(false);
            setSelectedUstadzh(null);
            alert(`Data Ustadzh berhasil di ${selectedUstadzh ? 'perbarui' : 'tambahkan'}!`);

        } catch (err) {
            if (err instanceof Error)
                setError(err.message || `Terjadi kesalahan saat ${selectedUstadzh ? 'memperbarui' : 'menambah'} data.`);
        } finally {
            setIsSubmitting(false);
        }
    };
    
    const handleDelete = async (id: string) => {
        if (!window.confirm('Apakah Anda yakin ingin menghapus data Ustadzh ini?')) return;

        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(`/api/ustadzh/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.error || 'Gagal menghapus data.');
            }
            
            await fetchUstadz();
            alert('Data Ustadzh berhasil dihapus.');

        } catch (err) {
            if (err instanceof Error)
                setError(err.message || 'Terjadi kesalahan saat menghapus data.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleOpenCreate = () => {
        setSelectedUstadzh(null);
        setIsFormOpen(true);
    };

    const handleOpenEdit = (ustadzh: Ustadzh) => {
        setSelectedUstadzh(ustadzh);
        setIsFormOpen(true);
    };

    const handleCloseForm = () => {
        setIsFormOpen(false);
        setSelectedUstadzh(null);
    };

    return (
        <div className="container mx-auto p-4 sm:p-8">
            <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">📚 Manajemen Data Ustadzh</h1>

            <div className="flex justify-between items-center mb-6">
                <button
                    onClick={handleOpenCreate}
                    className="px-5 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition duration-150 shadow-md"
                    disabled={isFormOpen}
                >
                    ➕ Tambah Ustadzh Baru
                </button>
            </div>

            {error && (
                <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                    **Kesalahan:** {error}
                </div>
            )}
            {isFormOpen && (
                <div className="mb-8 max-w-lg mx-auto">
                    <UstadzhForm
                        initialData={selectedUstadzh}
                        onSubmit={handleSubmit}
                        onCancel={handleCloseForm}
                        isSubmitting={isSubmitting}
                    />
                </div>
            )}

            <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Daftar Ustadzh ({ustadzList.length})</h2>

                {isLoading && !isSubmitting ? (
                    <p className="text-indigo-500">Memuat data...</p>
                ) : ustadzList.length === 0 ? (
                    <p className="text-gray-600 dark:text-gray-400">Belum ada data Ustadzh. Silakan tambah data baru.</p>
                ) : (
                    <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg overflow-hidden">
                        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                            {ustadzList.map((ustadzh) => (
                                <li key={ustadzh.id} className="p-4 sm:p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-150 flex justify-between items-center">
                                    <div>
                                        <p className="text-lg font-semibold text-indigo-600 dark:text-indigo-400">{ustadzh.nama}</p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 italic mt-1">{ustadzh.bio || "Bio belum tersedia."}</p>
                                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">ID: {ustadzh.id}</p>
                                    </div>
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => handleOpenEdit(ustadzh)}
                                            className="text-sm px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition"
                                            disabled={isFormOpen && selectedUstadzh?.id !== ustadzh.id}
                                        >
                                            ✏️ Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(ustadzh.id)}
                                            className="text-sm px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
                                            disabled={isFormOpen}
                                        >
                                            🗑️ Hapus
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}