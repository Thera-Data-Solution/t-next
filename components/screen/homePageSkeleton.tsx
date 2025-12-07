"use client"

import React from 'react';
import { CalendarIcon, CalendarRange } from 'lucide-react';

const Shimmer = ({ children }: { children: React.ReactNode }) => (
    <div className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg">{children}</div>
);

const DAYS = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];

const EventCardSkeleton = () => (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-3 sm:p-4 flex items-start gap-3">
        <Shimmer>
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full"></div>
        </Shimmer>

        <div className="flex-1 space-y-2 pt-1">
            <Shimmer>
                <div className="h-4 w-3/4 rounded-md"></div>
            </Shimmer>
            <Shimmer>
                <div className="h-3 w-1/2 rounded-md"></div>
            </Shimmer>
        </div>
    </div>
);


export default function CalendarViewSkeleton() {
    const calendarDays = Array(42).fill(0);

    const upcomingEvents = Array(5).fill(0);

    return (
        <div className="min-h-screen p-4 sm:p-8 max-w-7xl mx-auto font-sans">
            <header className="mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-center sm:text-left">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white flex items-center justify-center sm:justify-start gap-2">
                        <CalendarIcon className="w-7 h-7 sm:w-8 sm:h-8 text-emerald-300 animate-pulse" />
                        <Shimmer><div className="h-8 w-40 rounded-lg"></div></Shimmer>
                    </h1>
                    <Shimmer><p className="text-sm sm:text-base h-4 w-64 rounded-md mt-1"></p></Shimmer>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">

                <div className="lg:col-span-7 xl:col-span-8">
                    <div className='bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6'>

                        <div className="flex items-center justify-between mb-4 sm:mb-6">
                            <h2 className="text-lg sm:text-xl font-bold text-gray-800 capitalize">
                                <Shimmer><div className="h-6 w-32 rounded-lg"></div></Shimmer>
                            </h2>
                            <div className="flex items-center gap-1 sm:gap-2">
                                <Shimmer>
                                    <div className="w-8 h-8 rounded-full"></div>
                                </Shimmer>
                                <Shimmer>
                                    <div className="w-8 h-8 rounded-full"></div>
                                </Shimmer>
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
                            {calendarDays.map((_, index) => (
                                <div
                                    key={index}
                                    className="relative h-14 sm:h-24 rounded-lg sm:rounded-xl flex flex-col items-start justify-start p-1 sm:p-2 transition-all duration-200 border border-gray-100 dark:border-gray-700 overflow-hidden bg-gray-50/50 dark:bg-gray-900"
                                >
                                    <Shimmer>
                                        <div className="h-3 w-4 rounded-md"></div>
                                    </Shimmer>

                                    <div className="mt-auto w-full flex justify-end">
                                        {index % 5 === 0 && (
                                            <Shimmer>
                                                <div className="w-6 h-6 rounded-full border border-white"></div>
                                            </Shimmer>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-5 xl:col-span-4">
                    <div className="sticky top-6">
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                <CalendarRange className="w-5 h-5 text-emerald-300 animate-pulse" />
                                <Shimmer><div className="h-6 w-36 rounded-lg"></div></Shimmer>
                            </h2>
                            <Shimmer>
                                <div className="h-7 w-24 rounded-full"></div>
                            </Shimmer>
                        </div>

                        <div className="space-y-3">
                            {upcomingEvents.map((_, index) => (
                                <EventCardSkeleton key={index} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};