"use client"
/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from 'react';
import { X, Calendar, Clock, MapPin, Video, Users, Share2, ExternalLink, Globe, User } from 'lucide-react';
import { KajianData } from '@/types/event';

interface EventDetailModalProps {
    event: KajianData;
    onClose: () => void;
}

export const EventDetailModal: React.FC<EventDetailModalProps> = ({ event, onClose }) => {
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    const startDate = new Date(event.waktuMulai);
    const endDate = new Date(event.waktuSelesai);

    const dateFormatter = new Intl.DateTimeFormat('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });

    const timeFormatter = new Intl.DateTimeFormat('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
    });

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-0 sm:p-4">
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />
            <div className="
        relative w-full max-w-2xl 
        bg-white dark:bg-slate-900 
        h-full sm:h-auto sm:max-h-[90vh] 
        sm:rounded-2xl shadow-2xl 
        overflow-y-auto flex flex-col 
        animate-in fade-in zoom-in-95 duration-200
    ">
                <button
                    onClick={onClose}
                    className="
                absolute top-4 right-4 z-10 p-2 
                bg-black/20 dark:bg-white/10 
                hover:bg-black/40 dark:hover:bg-white/20
                backdrop-blur-md 
                text-white dark:text-slate-100 
                rounded-full transition-colors
            "
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="relative h-64 sm:h-72 shrink-0 bg-gray-100 dark:bg-slate-800">
                    <img
                        src={event.gambar}
                        alt={event.kajianJudul}
                        className="w-full h-full object-cover"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <div className="flex gap-2 mb-3">
                            <span className="bg-emerald-500 text-white text-xs font-bold px-2.5 py-1 rounded-md shadow-sm">
                                {event.KajianGenre}
                            </span>
                            <span className="bg-white/20 backdrop-blur-md text-white text-xs font-bold px-2.5 py-1 rounded-md">
                                {event.KajianUmur}
                            </span>
                        </div>

                        <h2 className="text-2xl sm:text-3xl font-bold leading-tight shadow-sm mb-1">
                            {event.kajianJudul}
                        </h2>

                        {event.ustadzh && (
                            <p className="text-sm opacity-90 font-medium">
                                Oleh: <span className="font-semibold">{event.ustadzh.nama}</span>
                            </p>
                        )}
                    </div>
                </div>

                <div className="p-6 space-y-8 flex-1">
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 pb-6 border-b border-gray-200 dark:border-slate-700">
                        <div className="flex items-start gap-3">
                            <div className="p-2.5 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-300 rounded-lg">
                                <Calendar className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 dark:text-slate-400 font-medium">Tanggal</p>
                                <p className="text-gray-900 dark:text-slate-100 font-semibold mt-0.5">
                                    {dateFormatter.format(startDate)}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <div className="p-2.5 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-300 rounded-lg">
                                <Clock className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 dark:text-slate-400 font-medium">Waktu</p>
                                <p className="text-gray-900 dark:text-slate-100 font-semibold mt-0.5">
                                    {timeFormatter.format(startDate)} - {timeFormatter.format(endDate)} WIB
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-slate-100 flex items-center gap-2">
                            <MapPin className="w-5 h-5 text-emerald-600 dark:text-emerald-300" />
                            Lokasi Kajian
                        </h3>

                        <div className="grid gap-3">
                            {event.lokasiOffline && (
                                <div className="
                            flex items-center justify-between p-4 
                            bg-gray-50 dark:bg-slate-800 
                            rounded-xl border border-gray-200 dark:border-slate-700
                        ">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-white dark:bg-slate-900 rounded-full flex items-center justify-center shadow-sm text-gray-600 dark:text-slate-300">
                                            <MapPin className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-gray-900 dark:text-slate-100">Hadir Offline</p>
                                            <p className="text-sm text-gray-600 dark:text-slate-400">{event.lokasiOffline}</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {(event.lokasiOnline || event.linkLokasiOnline) && (
                                <div className="
                            flex items-center justify-between p-4 
                            bg-blue-50/50 dark:bg-blue-900/20 
                            rounded-xl border border-blue-100 dark:border-blue-800
                        ">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-white dark:bg-slate-900 rounded-full flex items-center justify-center shadow-sm text-blue-600 dark:text-blue-300">
                                            <Video className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-gray-900 dark:text-slate-100">Streaming / Online</p>
                                            <p className="text-sm text-gray-600 dark:text-slate-400">
                                                {event.lokasiOnline || "Platform Online"}
                                            </p>
                                        </div>
                                    </div>

                                    {event.linkLokasiOnline && (
                                        <a
                                            href={event.linkLokasiOnline}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="
                                        px-4 py-2 bg-blue-600 hover:bg-blue-700 
                                        dark:bg-blue-700 dark:hover:bg-blue-600
                                        text-white text-sm font-medium 
                                        rounded-lg transition-colors flex items-center gap-2
                                    "
                                        >
                                            Join
                                            <ExternalLink className="w-4 h-4" />
                                        </a>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="pt-2">
                        <h3 className="text-sm font-bold text-gray-900 dark:text-slate-100 mb-3 uppercase tracking-wider text-xs">
                            Informasi Tambahan
                        </h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {event.ustadzh && (
                                <div className="
                            flex items-center gap-3 p-3 
                            rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800 
                            transition-colors
                        ">
                                    <User className="w-5 h-5 text-gray-400 dark:text-slate-500" />
                                    <div>
                                        <p className="text-xs text-gray-500 dark:text-slate-400">Pengisi Kajian</p>
                                        <p className="text-sm font-medium text-gray-900 dark:text-slate-100">{event.ustadzh.nama}</p>
                                    </div>
                                </div>
                            )}

                            <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors">
                                <Users className="w-5 h-5 text-gray-400 dark:text-slate-500" />
                                <div>
                                    <p className="text-xs text-gray-500 dark:text-slate-400">Penyelenggara</p>
                                    <p className="text-sm font-medium text-gray-900 dark:text-slate-100">{event.sumber}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors">
                                <Globe className="w-5 h-5 text-gray-400 dark:text-slate-500" />
                                <div>
                                    <p className="text-xs text-gray-500 dark:text-slate-400">Dibuat Oleh</p>
                                    <p className="text-sm font-medium text-gray-900 dark:text-slate-100 truncate">@{event.createdBy}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="p-4 bg-gray-50 dark:bg-slate-800 border-t border-gray-200 dark:border-slate-700 flex gap-3 sticky bottom-0 z-10">
                    <button className="flex-1 
                bg-white dark:bg-slate-900 
                border border-gray-300 dark:border-slate-700 
                text-gray-700 dark:text-slate-200 
                font-semibold py-3 px-4 rounded-xl 
                hover:bg-gray-50 dark:hover:bg-slate-700 
                transition-colors flex items-center justify-center gap-2
            ">
                        <Share2 className="w-4 h-4" />
                        Share
                    </button>

                    <button className="
                flex-[2] bg-emerald-600 text-white 
                font-semibold py-3 px-4 rounded-xl 
                hover:bg-emerald-700 transition-colors shadow-sm 
                flex items-center justify-center gap-2
            ">
                        <Calendar className="w-4 h-4" />
                        Simpan ke Kalender
                    </button>
                </div>

            </div>
        </div>

    );
};