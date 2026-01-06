'use client';

import React, { useState } from 'react';
import { Ustadzh } from '@prisma/client';

interface UstadzhFormProps {
    initialData?: Ustadzh | null;
    onSubmit: (data: { nama: string; bio: string }) => Promise<void>;
    onCancel: () => void;
    isSubmitting: boolean;
}

export function UstadzhForm({ initialData, onSubmit, onCancel, isSubmitting }: UstadzhFormProps) {
    const [nama, setNama] = useState(initialData?.nama || '');
    const [bio, setBio] = useState(initialData?.bio || '');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ nama, bio });
    };

    return (
        <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-gray-900">
                {initialData ? 'Edit Data Ustadzh' : 'Tambah Ustadzh Baru'}
            </h3>

            <div className="mb-4">
                <label htmlFor="nama" className="block text-sm font-medium text-gray-700 mb-1">Nama *</label>
                <input
                    type="text"
                    id="nama"
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-900"
                    placeholder="Nama Ustadzh"
                    disabled={isSubmitting}
                />
            </div>

            <div className="mb-6">
                <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">Bio/Keterangan</label>
                <textarea
                    id="bio"
                    rows={3}
                    value={bio || ''}
                    onChange={(e) => setBio(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-900"
                    placeholder="Deskripsi singkat mengenai Ustadzh"
                    disabled={isSubmitting}
                />
            </div>

            <div className="flex justify-end space-x-3">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-md transition duration-150"
                    disabled={isSubmitting}
                >
                    Batal
                </button>
                <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md shadow-md disabled:bg-indigo-400 transition duration-150"
                    disabled={isSubmitting || !nama}
                >
                    {isSubmitting ? 'Memproses...' : initialData ? 'Simpan Perubahan' : 'Tambah Data'}
                </button>
            </div>
        </form>
    );
}