"use client"

/* eslint-disable @next/next/no-img-element */
import React, { useState, useMemo, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Info, CalendarRange, X } from 'lucide-react';
import { KajianData } from '@/types/event';
import { EventCard } from './eventCard';
import { DateEventsModal } from './dateEvent';
import { EventDetailModal } from './eventDetail';

const DAYS = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
const MONTHS = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
];

export default function CalendarView({ kajian }: { kajian: KajianData[] }) {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 10, 1));
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<KajianData | null>(null);
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

  const upcomingEvents = useMemo(() => {
    return [...kajian].sort((a, b) =>
      new Date(a.waktuMulai).getTime() - new Date(b.waktuMulai).getTime()
    );
  }, [kajian]);

  const displayEvents = useMemo(() => {
    if (selectedDate) {
      return getEventsForDate(selectedDate);
    }
    return upcomingEvents;
  }, [getEventsForDate, selectedDate, upcomingEvents]);

  const calendarDays = useMemo(() => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    const days: { date: Date; isCurrentMonth: boolean; events: KajianData[] }[] = [];
    const prevMonthDays = new Date(year, month, 0).getDate();
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      const date = new Date(year, month - 1, prevMonthDays - i);
      days.push({ date, isCurrentMonth: false, events: getEventsForDate(date) });
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      days.push({ date, isCurrentMonth: true, events: getEventsForDate(date) });
    }

    const remainingSlots = 42 - days.length; // 6 rows * 7 cols
    for (let i = 1; i <= remainingSlots; i++) {
      const date = new Date(year, month + 1, i);
      days.push({ date, isCurrentMonth: false, events: getEventsForDate(date) });
    }

    return days;
  }, [year, month, getEventsForDate]);

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const handleDateClick = (date: Date) => {
    if (selectedDate &&
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()) {
      setSelectedDate(null);
    } else {
      setSelectedDate(date);
    }
  };

  return (
    <div className="min-h-screen p-4 sm:p-8 max-w-7xl mx-auto font-sans">
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

            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-lg sm:text-xl font-bold text-gray-800 capitalize">
                {MONTHS[month]} {year}
              </h2>
              <div className="flex items-center gap-1 sm:gap-2">
                <button
                  onClick={prevMonth}
                  className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600 dark:text-gray-50 dark:hover:bg-slate-700"
                  aria-label="Bulan Sebelumnya"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextMonth}
                  className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600 dark:text-gray-50 dark:hover:bg-slate-700"
                  aria-label="Bulan Selanjutnya"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-7 mb-2">
              {DAYS.map(day => (
                <div key={day} className="text-center text-xs sm:text-sm font-semibold text-gray-400 py-2">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1 sm:gap-2">
              {calendarDays.map((dayItem, index) => {
                const isSelected = selectedDate &&
                  dayItem.date.getDate() === selectedDate.getDate() &&
                  dayItem.date.getMonth() === selectedDate.getMonth() &&
                  dayItem.date.getFullYear() === selectedDate.getFullYear();

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
                          <div className="flex sm:hidden items-center gap-0.5">
                            <img
                              src={dayItem.events[0].gambar}
                              alt="E"
                              className="w-5 h-5 rounded-full object-cover border border-white shadow-sm shrink-0"
                            />

                            {dayItem.events.length > 1 && (
                              <div className="h-5 min-w-[20px] px-1 rounded-full bg-emerald-100 text-emerald-700 text-[9px] flex items-center justify-center border border-white font-bold shrink-0">
                                +{dayItem.events.length - 1}
                              </div>
                            )}
                          </div>

                          <div className="hidden sm:flex flex-wrap gap-1 content-end">
                            {dayItem.events.slice(0, 3).map((event) => (
                              <div key={event.id} className="relative group">
                                <img
                                  src={event.gambar}
                                  alt="Event"
                                  className="w-7 h-7 rounded-full object-cover border border-white shadow-sm hover:z-10 hover:scale-110 transition-transform"
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
                <button
                  onClick={() => setSelectedDate(null)}
                  className="text-xs sm:text-sm text-emerald-600 hover:text-emerald-700 font-medium flex items-center bg-emerald-50 px-3 py-1.5 rounded-full hover:bg-emerald-100 transition-colors"
                >
                  <X className="w-3 h-3 mr-1" />
                  Lihat Semua
                </button>
              )}
            </div>

            <div className="space-y-3">
              {displayEvents.length > 0 ? (
                displayEvents.map(event => (
                  <EventCard
                    key={event.id}
                    event={event}
                    onClick={() => setSelectedEvent(event)}
                  />
                ))
              ) : (
                <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 border-dashed">
                  <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Info className="w-6 h-6 text-gray-400" />
                  </div>
                  <h3 className="text-sm font-medium text-gray-900">Tidak ada kajian</h3>
                  <p className="text-xs text-grayF-500 mt-1">
                    {selectedDate
                      ? 'Tidak ada jadwal pada tanggal ini.'
                      : 'Belum ada jadwal mendatang.'}
                  </p>
                  {selectedDate && (
                    <button
                      onClick={() => setSelectedDate(null)}
                      className="mt-3 text-xs text-emerald-600 font-medium hover:underline"
                    >
                      Lihat kajian lainnya
                    </button>
                  )}
                </div>
              )}

              {!selectedDate && displayEvents.length > 0 && (
                <div className="text-center mt-6 pt-4 border-t border-gray-200/50">
                  <p className="text-xs text-gray-400">Menampilkan jadwal kajian terdekat.</p>
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
          onEventClick={setSelectedEvent}
        />
      )}
      {selectedEvent && (
        <EventDetailModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </div>
  );
};