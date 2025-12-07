/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { MapPin, Clock, Users, Video } from 'lucide-react';
import { KajianData } from '@/types/event';
import Link from 'next/link';

interface EventCardProps {
    event: KajianData;
}

export const EventCard: React.FC<EventCardProps> = ({ event }) => {
    const startDate = new Date(event.waktuMulai);
    const endDate = new Date(event.waktuSelesai);

    const timeFormatter = new Intl.DateTimeFormat('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
    });

    const dateFormatter = new Intl.DateTimeFormat('id-ID', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
    });

    return (
        <Link
            href={`/kajian/${event.id}`}
            className="
        w-full text-left 
        bg-slate-50 dark:bg-slate-900
        rounded-xl shadow-sm 
        border border-slate-200 dark:border-slate-700
        overflow-hidden 
        hover:shadow-md 
        hover:border-emerald-300 dark:hover:border-emerald-600
        transition-all duration-300 
        flex flex-row h-32 sm:h-40 group
        focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900
    "
        >
            <div className="relative w-28 sm:w-40 shrink-0 overflow-hidden">
                <img
                    src={event.gambar}
                    alt={event.kajianJudul}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/40 to-transparent sm:hidden"></div>
                <div className="absolute bottom-1.5 left-1.5 sm:top-2 sm:left-2 sm:bottom-auto">
                    <span className="
                bg-white/80 dark:bg-slate-800/70 
                backdrop-blur-sm 
                px-2 py-0.5 rounded 
                text-[10px] sm:text-xs font-semibold 
                text-emerald-700 dark:text-emerald-300 
                shadow-sm border border-emerald-100/50 dark:border-emerald-800/40
            ">
                        {event.KajianGenre}
                    </span>
                </div>
            </div>
            <div className="p-3 sm:p-4 flex-1 flex flex-col justify-center overflow-hidden">
                <div className="flex justify-between items-start mb-1.5">
                    <span className="
                text-[8px] font-bold 
                text-emerald-700 dark:text-emerald-300 
                uppercase tracking-wide 
                bg-emerald-50 dark:bg-emerald-900/20 
                px-2 py-0.5 rounded-full 
                border border-emerald-100 dark:border-emerald-700
            ">
                        {dateFormatter.format(startDate)}
                    </span>

                    <span className="
                hidden sm:inline-flex items-center 
                text-[10px] 
                text-slate-500 dark:text-slate-400 
                bg-slate-100 dark:bg-slate-800 
                px-2 py-0.5 rounded-full
            ">
                        <Users className="w-3 h-3 mr-1" />
                        {event.KajianUmur}
                    </span>
                </div>

                <p className="
                text-sm
            font-bold 
            text-slate-900 dark:text-slate-100 
            leading-tight line-clamp-2 
            group-hover:text-emerald-700 dark:group-hover:text-emerald-300
            transition-colors
        ">
                    {event.kajianJudul}

                </p>


                <div className="space-y-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-auto">

                    <div className="flex items-center">
                        <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 text-emerald-500 dark:text-emerald-400 shrink-0" />
                        <span className="truncate">
                            {timeFormatter.format(startDate)} - {timeFormatter.format(endDate)}
                        </span>
                    </div>

                    <div className="flex items-center truncate">
                        {event.lokasiOffline ? (
                            <>
                                <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 text-emerald-500 dark:text-emerald-400 shrink-0" />
                                <span className="truncate">{event.lokasiOffline}</span>
                            </>
                        ) : event.lokasiOnline ? (
                            <>
                                <Video className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 text-emerald-500 dark:text-emerald-400 shrink-0" />
                                <span className="truncate">{event.lokasiOnline}</span>
                            </>
                        ) : null}
                    </div>
                </div>
            </div>
        </Link>

    );
};
