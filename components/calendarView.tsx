"use client"

import React, { useState, useMemo, useRef, useCallback, useTransition } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Info, CalendarRange, X, LoaderPinwheel } from 'lucide-react';
import { EventCard } from './eventCard';
import { DateEventsModal } from './dateEvent';
import { Prisma } from '@/generated/prisma/client';
import { refetchKajian, refetchUpcoming } from '@/app/(app)/action';
import Image from 'next/image';
export type JadwalKajianWithRelations = Prisma.JadwalKajianGetPayload<{
  include: { ustadzhList: true }
}>;

const DAYS = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
const MONTHS = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
];

// Ganti interface props menggunakan tipe Prisma
export default function CalendarView({
  initialKajian,
  initialYear,
  initialMonth,
  initialUpcoming
}: {
  initialKajian: JadwalKajianWithRelations[];
  initialYear: number;
  initialMonth: number;
  initialUpcoming: JadwalKajianWithRelations[];
}) {
  const [currentDate, setCurrentDate] = useState(
    new Date(initialYear, initialMonth, 1)
  );
  const [kajian, setKajian] = useState(initialKajian);
  const [isPending, startTransition] = useTransition();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [upcomingPage, setUpcomingPage] = useState(1);
  const [upcoming, setUpcoming] = useState(initialUpcoming);
  const [isUpcomingPending, startUpcomingTransition] = useTransition();

  const listRef = useRef<HTMLDivElement>(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const getEventsForDate = useCallback((date: Date) => {
    return kajian.filter(event => {
      const eventDate = new Date(event.waktuMulai);
      return (
        eventDate.getDate() === date.getDate() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getFullYear() === date.getFullYear()
      );
    });
  }, [kajian]);

  const displayEvents = useMemo(() => {
    if (selectedDate) {
      return getEventsForDate(selectedDate);
    }
    return upcoming;
  }, [selectedDate, upcoming, getEventsForDate]);


  const calendarDays = useMemo(() => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    const days: { date: Date; isCurrentMonth: boolean; events: JadwalKajianWithRelations[] }[] = [];

    const prevMonthDays = new Date(year, month, 0).getDate();
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      const date = new Date(year, month - 1, prevMonthDays - i);
      days.push({ date, isCurrentMonth: false, events: getEventsForDate(date) });
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      days.push({ date, isCurrentMonth: true, events: getEventsForDate(date) });
    }

    const remainingSlots = 42 - days.length;
    for (let i = 1; i <= remainingSlots; i++) {
      const date = new Date(year, month + 1, i);
      days.push({ date, isCurrentMonth: false, events: getEventsForDate(date) });
    }

    return days;
  }, [year, month, getEventsForDate]);

  const handleDateClick = (date: Date) => {
    if (selectedDate?.toDateString() === date.toDateString()) {
      setSelectedDate(null);
    } else {
      setSelectedDate(date);
    }
  };

  const changeMonth = (diff: number) => {
    const next = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + diff,
      1
    );

    const year = next.getFullYear();
    const month = next.getMonth();

    startTransition(async () => {
      const data = await refetchKajian(year, month);
      setKajian(data);
      setCurrentDate(next);
      setSelectedDate(null);
    });
  };

  const changeUpcomingPage = (diff: number) => {
    const nextPage = Math.max(1, upcomingPage + diff);

    startUpcomingTransition(async () => {
      const data = await refetchUpcoming(nextPage);
      setUpcoming(data);
      setUpcomingPage(nextPage);
    });
  };

  const prevMonth = () => changeMonth(-1);
  const nextMonth = () => changeMonth(1);

  return (
    <div className="min-h-screen p-4 sm:p-8 max-w-7xl mx-auto font-sans">
      {isPending && (
        <div className="fixed inset-0 bg-white/70 dark:bg-black/60 flex flex-col gap-4 items-center justify-center z-50">
          <LoaderPinwheel className="animate-spin text-emerald-600 dark:text-emerald-400" />
          <div className="text-sm font-semibold text-gray-700 dark:text-gray-200 animate-pulse">
            Loading…
          </div>
        </div>

      )}

      {!selectedDate && isUpcomingPending && upcoming.length > 0 && (
        <div className="fixed inset-0 bg-white/70 dark:bg-black/60 flex flex-col gap-4 items-center justify-center z-50">
          <LoaderPinwheel className="animate-spin text-emerald-600 dark:text-emerald-400" />
          <div className="text-sm font-semibold text-gray-700 dark:text-gray-200 animate-pulse">
            Loading Upcoming…
          </div>
        </div>

      )}


      <header className="mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white flex items-center justify-center sm:justify-start gap-2">
            <CalendarIcon className="w-7 h-7 sm:w-8 sm:h-8 text-emerald-600" />
            Jadwal Kajian
          </h1>
          <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mt-1">Temukan majelis ilmu di sekitarmu.</p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
        <div className="lg:col-span-7 xl:col-span-8">
          <div className='bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6'>
            {/* Calendar Controls... */}
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-200 capitalize">
                {MONTHS[month]} {year}
              </h2>
              <div className="flex items-center gap-1 sm:gap-2">
                <button onClick={prevMonth} className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-full transition-colors dark:text-gray-50 dark:hover:bg-slate-700"><ChevronLeft className="w-5 h-5" /></button>
                <button onClick={nextMonth} className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-full transition-colors dark:text-gray-50 dark:hover:bg-slate-700"><ChevronRight className="w-5 h-5" /></button>
              </div>
            </div>

            <div className="grid grid-cols-7 mb-2">
              {DAYS.map(day => (
                <div key={day} className="text-center text-xs sm:text-sm font-semibold text-gray-400 py-2">{day}</div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1 sm:gap-2">
              {calendarDays.map((dayItem, index) => {
                const isSelected = selectedDate?.toDateString() === dayItem.date.toDateString();
                const isToday = new Date().toDateString() === dayItem.date.toDateString();

                return (
                  <button
                    key={index}
                    onClick={() => handleDateClick(dayItem.date)}
                    className={`
                      relative h-14 sm:h-24 rounded-lg sm:rounded-xl flex flex-col items-start justify-start p-1 sm:p-2 transition-all duration-200 border overflow-hidden
                      ${!dayItem.isCurrentMonth ? 'bg-gray-50/50 dark:bg-gray-900 text-gray-300 border-transparent' : 'bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 text-gray-700 hover:border-emerald-200 hover:shadow-sm'}
                      ${isSelected ? 'ring-2 ring-emerald-500 ring-offset-1 z-10' : ''}
                      ${isToday && !isSelected ? 'bg-emerald-50/50 font-semibold' : ''}
                    `}
                  >
                    <span className={`text-xs sm:text-sm ${isToday ? 'text-emerald-700' : ''}`}>{dayItem.date.getDate()}</span>

                    <div className="mt-auto w-full">
                      {dayItem.events.length > 0 && (
                        <>
                          {/* Mobile View */}
                          <div className="flex md:hidden items-center gap-0.5">
                            <Image
                              src={dayItem.events[0].gambar || '/placeholder-kajian.jpg'}
                              alt="E"
                              className="w-5 h-5 rounded-full object-cover border border-white shadow-sm shrink-0"
                              width={50}
                              height={50}
                            />
                            {dayItem.events.length > 1 && (
                              <div className="h-5 min-w-5 px-1 rounded-full bg-emerald-100 text-emerald-700 text-[9px] flex items-center justify-center border border-white font-bold shrink-0">
                                +{dayItem.events.length - 1}
                              </div>
                            )}
                          </div>

                          <div className="hidden md:flex flex-wrap gap-1 content-end">
                            {dayItem.events.slice(0, 3).map((event) => (
                              <div key={event.id} className="relative group">
                                <Image
                                  src={event.gambar || '/placeholder-kajian.jpg'}
                                  alt={event.kajianJudul}
                                  className="w-7 h-7 rounded-full object-cover border border-white shadow-sm hover:z-10 hover:scale-110 transition-transform"
                                  width={50}
                                  height={50}
                                />
                              </div>
                            ))}
                            {dayItem.events.length > 3 && (
                              <div className="w-7 h-7 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-bold flex items-center justify-center border border-white">
                                +{dayItem.events.length - 3}
                              </div>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 xl:col-span-4" ref={listRef}>
          <div className="sticky top-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <CalendarRange className="w-5 h-5 text-emerald-600" />
                {selectedDate ? 'Jadwal Terpilih' : 'Akan Datang'}
              </h2>
              {selectedDate && (
                <button onClick={() => setSelectedDate(null)} className="text-xs sm:text-sm text-emerald-600 hover:text-emerald-700 font-medium flex items-center bg-emerald-50 px-3 py-1.5 rounded-full">
                  <X className="w-3 h-3 mr-1" /> Lihat Semua
                </button>
              )}
            </div>

            <div className="space-y-3">

              {displayEvents.length > 0 ? (
                displayEvents.map(event => (
                  <EventCard key={event.id} event={event} />
                ))
              ) : (
                <div className="text-center py-12 ...">
                  <Info className="w-6 h-6 text-gray-400 mx-auto mb-3" />
                  <p className="text-xs text-gray-500">
                    {selectedDate
                      ? 'Tidak ada kajian di tanggal ini.'
                      : 'Tidak ada kajian mendatang.'}
                  </p>
                </div>
              )}
              {!selectedDate && (
                <div className="flex items-center justify-between pt-4">
                  <button
                    disabled={upcomingPage === 1 || isUpcomingPending}
                    onClick={() => changeUpcomingPage(-1)}
                    className="px-3 py-1.5 text-sm rounded-lg border disabled:opacity-50 bg-emerald-500 text-white hover:bg-emerald-600
"
                  >
                    Prev
                  </button>

                  <span className="text-xs text-gray-500">
                    Page {upcomingPage}
                  </span>

                  <button
                    disabled={isUpcomingPending || upcoming.length < 10}
                    onClick={() => changeUpcomingPage(1)}
                    className="px-3 py-1.5 text-sm rounded-lg border disabled:opacity-50 bg-emerald-500 text-white hover:bg-emerald-600
"
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedDate && (
        <DateEventsModal
          date={selectedDate}
          events={getEventsForDate(selectedDate)}
          onClose={() => setSelectedDate(null)}
        />
      )}
    </div>
  );
};