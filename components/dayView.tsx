import React from 'react';
import { ChevronLeftIcon, SettingsIcon, AirplaneIcon, LocationPinIcon } from './icons';
import { Event } from '@/types/event';

interface DayViewProps {
    selectedDate: Date;
    onBack: () => void;
    events: Event[];
}

const EventItem: React.FC<{ event: Event, isFirst: boolean, isLast: boolean }> = ({ event, isFirst, isLast }) => {
    const isFlight = event.type === 'flight';

    return (
        <div className="flex">
            <div className="flex flex-col items-center mr-4">
                <div className={`w-px flex-shrink-0 ${isFirst ? 'bg-transparent' : 'bg-gray-200'}`} style={{ height: '1.5rem' }}></div>
                <div className="w-3 h-3 bg-[#8A6CFF] rounded-full z-10"></div>
                <div className={`w-px flex-grow ${isLast ? 'bg-transparent' : 'bg-gray-200'}`}></div>
            </div>
            <div className="pb-8 flex-grow">
                <p className="text-xs font-semibold text-gray-700 dark:text-slate-300">{event.startDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}</p>
                <p className="font-bold text-gray-800 dark:text-white mt-1">{event.title}</p>
                <div className="flex items-start mt-1">
                    <LocationPinIcon className="w-4 h-4 text-gray-400 mt-0.5 mr-2 flex-shrink-0" />
                    <p className="text-xs text-gray-400">{event.details}</p>
                </div>

                {isFlight && event.flightDetails && (
                    <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3 mt-3 flex items-center justify-between">
                        <div className="text-center">
                            <p className="text-2xl font-bold text-gray-800 dark:text-white">{event.flightDetails.from}</p>
                            <p className="text-xs text-gray-500">Beijing</p>
                        </div>
                        <div className="text-center text-gray-400">
                            <AirplaneIcon className="w-5 h-5 mx-auto" />
                            <p className="text-xs mt-1">Route</p>
                        </div>
                        <div className="text-center">
                            <p className="text-2xl font-bold text-gray-800">{event.flightDetails.to}</p>
                            <p className="text-xs text-gray-500">Rome</p>
                        </div>
                        <div className="border-l border-gray-300 h-8 ml-4"></div>
                    </div>
                )}
            </div>
        </div>
    );
};

const DayView: React.FC<DayViewProps> = ({ selectedDate, onBack, events }) => {
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const dayEvents = events
        .filter(e => e.startDateTime.toDateString() === selectedDate.toDateString())
        .sort((a, b) => a.startDateTime.getTime() - b.startDateTime.getTime());

    return (
        <div>
            <div className="pb-4 px-4 flex justify-between items-center text-gray-700 mt-4">
                <button onClick={onBack} className='dark:text-white'>
                    <ChevronLeftIcon />
                </button>
                <div className='dark:text-white font-bold'>Dummy Event</div>
                <div className='dark:text-white'>
                    <SettingsIcon />
                </div>
            </div>

            <div className="px-6 py-4">
                <p className="text-lg font-bold text-gray-800 dark:text-white">HELLO Today is {dayNames[selectedDate.getDay()]} UNDER MAINTENANCE</p>
            </div>
            
            <div className="px-6 pt-4">
                <h3 className="font-bold text-gray-800 dark:text-white text-sm mb-4">Recent plan UNDER MAINTENANCE</h3>
                <div>
                    {dayEvents.map((event, index) => (
                        <EventItem key={event.id} event={event} isFirst={index === 0} isLast={index === dayEvents.length - 1} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DayView;
