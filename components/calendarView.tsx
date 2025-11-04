import React from 'react';
import { BriefcaseIcon, MeetingIcon, LocationPinIcon } from './icons';
import { Event } from '@/types/event';
import Calendar from './calendar';

interface CalendarViewProps {
    currentDate: Date;
    setCurrentDate: (date: Date) => void;
    onDateSelect: (date: Date) => void;
    events: Event[];
}

const UpcomingEventCard: React.FC<{ event: Event }> = ({ event }) => {
    const Icon = event.type === 'flight' ? BriefcaseIcon : MeetingIcon;
    const textColor = event.color === 'purple' ? 'text-[#8A6CFF] dark:text-white' : 'text-[#FF7B89]';

    const formatRange = (start: Date, end?: Date) => {
        if (!end) return `${start.getMonth() + 1}.${start.getDate()}`;
        return `${start.getMonth() + 1}.${start.getDate()}-${end.getMonth() + 1}.${end.getDate()}`;
    };

    return (
        <div className={"flex items-center p-3 rounded-lg bg-[#E8E1FF] dark:bg-purple-800"}>
            <div className={`p-2 rounded-md ${textColor} dark:shadow-purple-900 bg-white dark:bg-purple-700 mr-4`}>
                <Icon className="w-5 h-5" />
            </div>
            <div>
                <p className={`font-semibold text-sm ${textColor}`}>{event.title}</p>
                <p className={`text-xs ${textColor} opacity-80`}>
                    {formatRange(event.startDateTime, event.endDateTime)}
                </p>
            </div>
        </div>
    );
};

const CalendarView: React.FC<CalendarViewProps> = ({ currentDate, setCurrentDate, onDateSelect, events }) => {
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const changeMonth = (offset: number) => {
        const newDate = new Date(currentDate);
        newDate.setMonth(newDate.getMonth() + offset);
        setCurrentDate(newDate);
    };

    const isSameDay = (d1: Date, d2: Date) => d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();
    const today = new Date();

    const todaysPlan = events.find(e => isSameDay(e.startDateTime, today));
    const upcomingPlans = events.filter(e => e.startDateTime > today).sort((a, b) => a.startDateTime.getTime() - b.startDateTime.getTime()).slice(0, 2);


    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className='md:order-1 order-2 space-y-4'>
                {todaysPlan && (
                    <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm">
                        <h3 className="font-bold dark:text-gray-50 text-sm mb-3">{"Today's plan"}</h3>
                        <div className="flex">
                            <div className="pr-4 border-r border-gray-200 mr-4">
                                <p className="font-bold dark:text-gray-50">{todaysPlan.startDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                <div className="h-1 w-8 bg-[#8A6CFF] rounded-full mt-1"></div>
                            </div>
                            <div>
                                <p className="font-semibold dark:text-gray-50 text-sm">{todaysPlan.title}</p>
                                <p className="text-xs dark:text-gray-300 mt-1 line-clamp-2">{todaysPlan.details}</p>
                            </div>
                            <div className="ml-auto pl-2">
                                <LocationPinIcon className="w-5 h-5 text-blue-400" />
                            </div>
                        </div>
                    </div>
                )}
                {upcomingPlans.length > 0 && (
                    <div className="dark:bg-slate-800 bg-white p-4 rounded-lg shadow-sm">
                        <h3 className="font-bold dark:text-gray-50 text-sm mb-3">Upcoming plan ({upcomingPlans.length})</h3>
                        <div className="space-y-3">
                            {upcomingPlans.map(event => (
                                <UpcomingEventCard key={event.id} event={event} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
            <div className='md:order-2 order-1'>
                <div className="bg-white dark:bg-slate-800 px-4 pt-2 pb-4 flex justify-between items-center text-gray-400 text-sm font-semibold rounded-lg mb-4">
                    <button onClick={() => changeMonth(-1)}>{monthNames[(currentDate.getMonth() - 1 + 12) % 12]}</button>
                    <div className="bg-[#8A6CFF] dark:bg-purple-800 text-white px-6 py-2 rounded-full shadow-md shadow-purple-200 dark:shadow-purple-900">
                        {monthNames[currentDate.getMonth()]}
                    </div>
                    <button onClick={() => changeMonth(1)}>{monthNames[(currentDate.getMonth() + 1) % 12]}</button>
                </div>
                <Calendar currentDate={currentDate} onDateClick={onDateSelect} events={events} />
            </div>
        </div>
    );
};

export default CalendarView;