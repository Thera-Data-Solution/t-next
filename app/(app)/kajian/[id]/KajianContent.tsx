/* eslint-disable @next/next/no-img-element */
import { notFound } from "next/navigation";
import { Calendar, Clock, MapPin, Video, Users, ExternalLink, Globe, User, MoveLeft } from "lucide-react";
import Link from "next/link";
import { Ustadzh } from "@/generated/prisma/client";

export default async function KajianContent({ id }: { id: string }) {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/kajian/${id}`,
        {
            cache: "no-store",
        }
    );

    if (!res.ok) return notFound();

    const json = await res.json();
    const event = json.data;

    if (!event) return notFound();
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
        <div className="min-h-screen bg-white dark:bg-slate-900">

            <div className="relative h-64 sm:h-72 bg-gray-100 dark:bg-slate-800">
                <img
                    src={event.gambar}
                    alt={event.kajianJudul}
                    className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                <div className="absolute top-4 left-4 z-20 w-8 h-8">
                    <Link
                        href="/"
                        className="p-2 bg-black/40 text-white rounded-full backdrop-blur hover:bg-black/60 transition w-full h-full flex items-center justify-center"
                    >
                        <MoveLeft className="w-5 h-5" />
                    </Link>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <div className="flex gap-2 mb-3">
                        <span className="bg-emerald-500 text-white text-xs font-bold px-2.5 py-1 rounded-md shadow-sm">
                            {event.KajianGenre}
                        </span>
                        <span className="bg-white/20 backdrop-blur-md text-white text-xs font-bold px-2.5 py-1 rounded-md">
                            {event.KajianUmur}
                        </span>
                    </div>

                    <h1 className="text-2xl sm:text-3xl font-bold leading-tight shadow-sm">
                        {event.kajianJudul}
                    </h1>
                </div>
            </div>

            <div className="p-6 space-y-8 max-w-3xl mx-auto">
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
                                {timeFormatter.format(startDate)} – {timeFormatter.format(endDate)} WIB
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
                            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700">
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
                            <div className="flex items-center justify-between p-4 bg-blue-50/50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800">
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
                                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white text-sm rounded-lg"
                                    >
                                        Join <ExternalLink className="w-4 h-4 inline ml-1" />
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
                        <div className="flex gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors">
                            <User className="w-5 h-5 text-gray-400 dark:text-slate-500" />
                            <div>
                                <p className="text-xs text-gray-500 dark:text-slate-400">Pengisi Kajian</p>

                                {event.ustadzhList?.map((u: Ustadzh) => (
                                    <p key={u.id} className="text-sm font-medium text-gray-900 dark:text-slate-100">
                                        - {u.nama}
                                    </p>
                                ))}
                            </div>
                        </div>

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
                                <p className="text-sm font-medium text-gray-900 dark:text-slate-100">@{event.createdBy}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
