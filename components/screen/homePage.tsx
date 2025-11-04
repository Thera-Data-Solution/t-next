"use client"
import CalendarView from '@/components/calendarView';
import { MOCK_EVENTS } from '@/constant/mock';
import React, { useState } from 'react';
import DayView from '../dayView';

const HomeScreen: React.FC = () => {
   const [currentDate, setCurrentDate] = useState(new Date());

    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    const handleDateSelect = (date: Date) => {
        setSelectedDate(date);

    };

    const handleBackToCalendar = () => {
        setSelectedDate(null);
    };

    return (
        <div className="h-full w-full">
            {
                !selectedDate ? (
                    <div className='p-4'>
                        <CalendarView
                            currentDate={currentDate}
                            setCurrentDate={setCurrentDate}
                            onDateSelect={handleDateSelect}
                            events={MOCK_EVENTS}
                        />
                    </div> 
                ) : <DayView selectedDate={selectedDate} onBack={handleBackToCalendar} events={MOCK_EVENTS} />
            }
        </div>
    );
};

export default HomeScreen;
