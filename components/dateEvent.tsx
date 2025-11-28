"use client";

import React, { useEffect } from 'react';
import { X, Calendar } from 'lucide-react';
import { KajianData } from '@/types/event';
import { EventCard } from './eventCard';

interface DateEventsModalProps {
    date: Date;
    events: KajianData[];
    onClose: () => void;
    onEventClick: (event: KajianData) => void;
}

export const DateEventsModal: React.FC<DateEventsModalProps> = ({ date, events, onClose, onEventClick }) => {
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    const dateFormatter = new Intl.DateTimeFormat('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });

    return (
        <div className="fixed inset-0 z-50 flex flex-col justify-end sm:justify-center items-center">
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />
            <div className="relative w-full max-w-lg bg-white dark:bg-slate-800 rounded-t-2xl sm:rounded-2xl shadow-xl flex flex-col max-h-[85vh] animate-in slide-in-from-bottom duration-300">
                <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-white dark:bg-slate-800 rounded-t-2xl sticky top-0 z-10">
                    <div>
                        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2 dark:text-white">
                            <Calendar className="w-5 h-5 text-emerald-600" />
                            Jadwal Kajian
                        </h2>
                        <p className="text-sm text-gray-500 capitalize">{dateFormatter.format(date)}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-600 dark:text-slate-200 dark:bg-slate-600 dark:hover:bg-slate-500 rounded-full transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
                <div className="p-4 overflow-y-auto min-h-[200px]">
                    {events.length > 0 ? (
                        <div className="space-y-3">
                            {events.map((event) => (
                                <EventCard
                                    key={event.id}
                                    event={event}
                                    onClick={() => onEventClick(event)}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-48 text-center">
                            <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-3">
                                <Calendar className="w-6 h-6 text-gray-300" />
                            </div>
                            <p className="text-gray-900 font-medium">Tidak ada kajian</p>
                            <p className="text-sm text-gray-500 mt-1">Belum ada jadwal untuk tanggal ini.</p>
                        </div>
                    )}

                    <div className="mt-8 text-center">
                        <button
                            onClick={onClose}
                            className="text-sm text-gray-500 underline py-2"
                        >
                            Tutup
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};