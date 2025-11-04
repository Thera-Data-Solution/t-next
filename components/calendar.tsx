import { Event } from "@/types/event";
import React from "react";

interface CalendarProps {
  currentDate: Date;
  onDateClick: (date: Date) => void;
  events: Event[];
}

const isSameDay = (d1: Date, d2: Date) =>
  d1.getFullYear() === d2.getFullYear() &&
  d1.getMonth() === d2.getMonth() &&
  d1.getDate() === d2.getDate();

const cleanDate = (date: Date) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
};

const getDayOfWeek = (date: Date) => {
  const day = date.getDay();
  return day === 0 ? 6 : day - 1; 
};

const Calendar: React.FC<CalendarProps> = ({
  currentDate,
  onDateClick,
  events,
}) => {
  const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const getDaysInMonth = (year: number, month: number) =>
    new Date(year, month + 1, 0).getDate();

  const getFirstDayOfMonth = (year: number, month: number) => {
    const day = new Date(year, month, 1).getDay();
    return day === 0 ? 6 : day - 1;
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = getDaysInMonth(year, month);
  const firstDayOfMonth = getFirstDayOfMonth(year, month);
  const daysInPrevMonth = getDaysInMonth(year, month - 1);

  const calendarDays: CalendarDay[] = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      calendarDays.push({
        day: daysInPrevMonth - firstDayOfMonth + i + 1,
        month: "prev",
        date: cleanDate(new Date(year, month - 1, daysInPrevMonth - firstDayOfMonth + i + 1)),
      });
    }
    
    for (let i = 1; i <= daysInMonth; i++) {
      calendarDays.push({
        day: i,
        month: "current",
        date: cleanDate(new Date(year, month, i)),
      });
    }
  
    
    const remainingCells = 42 - calendarDays.length;
    for (let i = 1; i <= remainingCells; i++) {
      calendarDays.push({
        day: i,
        month: "next",
        date: cleanDate(new Date(year, month + 1, i)),
      });
    }

  const isToday = (date: Date) => isSameDay(date, cleanDate(new Date()));
  
  interface EventSegment {
    event: Event;
    startGridColumn: number;
    endGridColumn: number;
    level: number;
    isStart: boolean; 
    isEnd: boolean; 
  }

  interface CalendarDay {
    day: number;
    month: "prev" | "current" | "next";
    date: Date;
  }

  const weeks: Array<{
    startDate: Date;
    endDate: Date;
    days: CalendarDay[]; 
    eventSegments: EventSegment[];
  }> = [];
  
  for (let i = 0; i < calendarDays.length; i += 7) {
    const weekDays = calendarDays.slice(i, i + 7);
    const weekStartDate = weekDays[0].date;
    const weekEndDate = weekDays[6].date;

    const weekEvents: EventSegment[] = [];
    const occupiedLevels: { [key: string]: boolean } = {}; 
    
    const relevantEvents = events.filter((event) => {
      const eventStart = cleanDate(new Date(event.startDateTime));
      const eventEnd = cleanDate(event.endDateTime ? new Date(event.endDateTime) : eventStart);
      return (eventStart <= weekEndDate && eventEnd >= weekStartDate);
    }).sort((a, b) => { 
      const startA = cleanDate(new Date(a.startDateTime));
      const startB = cleanDate(new Date(b.startDateTime));
      return startA.getTime() - startB.getTime();
    });


    relevantEvents.forEach((event) => {
      const eventStart = cleanDate(new Date(event.startDateTime));
      const eventEnd = cleanDate(event.endDateTime ? new Date(event.endDateTime) : eventStart);
      
      const segmentStart = new Date(Math.max(eventStart.getTime(), weekStartDate.getTime()));
      const segmentEnd = new Date(Math.min(eventEnd.getTime(), weekEndDate.getTime()));

      const startGridColumn = getDayOfWeek(segmentStart);
      const endGridColumn = getDayOfWeek(segmentEnd);

      let level = 0;
      let levelFound = false;
      
      while (!levelFound) {
        let conflict = false;
        for (let dayCol = startGridColumn; dayCol <= endGridColumn; dayCol++) {
          if (occupiedLevels[`${dayCol}-${level}`]) {
            conflict = true;
            break;
          }
        }
        if (!conflict) {
          levelFound = true;
        } else {
          level++;
        }
      }
      
      for (let dayCol = startGridColumn; dayCol <= endGridColumn; dayCol++) {
        occupiedLevels[`${dayCol}-${level}`] = true;
      }

      weekEvents.push({
        event: event,
        startGridColumn: startGridColumn,
        endGridColumn: endGridColumn,
        level: level,
        isStart: isSameDay(eventStart, segmentStart),
        isEnd: isSameDay(eventEnd, segmentEnd),
      });
    });

    weeks.push({
      startDate: weekStartDate,
      endDate: weekEndDate,
      days: weekDays,
      eventSegments: weekEvents,
    });
  }
  
  const getEventsForDay = (date: Date) => {
    return events.filter((event) => {
      const start = cleanDate(new Date(event.startDateTime));
      const end = cleanDate(event.endDateTime ? new Date(event.endDateTime) : start);
      return (cleanDate(date) >= start && cleanDate(date) <= end);
    });
  };


  return (
    <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-md transition-colors">
      <div className="grid grid-cols-7 text-center text-sm text-gray-500 dark:text-gray-400 mb-2">
        {weekdays.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      {weeks.map((week, weekIndex) => (
        <div key={weekIndex} className="relative grid grid-cols-7 gap-y-2 text-center border-b border-gray-100 dark:border-gray-700 last:border-b-0">
          {week.eventSegments.map((segment) => {
            const { event, startGridColumn, endGridColumn, level, isStart, isEnd } = segment;
            const columnWidthPercentage = 100 / 7;

            return (
              <div
                key={event.id + "-seg-" + weekIndex + "-" + level}
                className={`absolute h-1 rounded-full text-xs font-medium text-white px-1 overflow-hidden whitespace-nowrap
                  ${
                    event.color === "pink"
                      ? "bg-pink-400 dark:bg-pink-700"
                      : event.color === "purple"
                      ? "bg-violet-400 dark:bg-violet-700"
                      : "bg-gray-400 dark:bg-gray-600"
                  } transition-all duration-150 ease-in-out hover:h-4 hover:top-[calc(35%_+_calc(var(--event-level)_*_6px_-_4px))] hover:z-20`}
                style={{
                  '--event-level': level,
                  top: `calc(35% + var(--event-level) * 6px)`,
                  left: `${startGridColumn * columnWidthPercentage}%`,
                  width: `${(endGridColumn - startGridColumn + 1) * columnWidthPercentage}%`,
                  paddingLeft: isStart ? '16px' : '2px', 
                  paddingRight: isEnd ? '16px' : '2px', 
                  borderRadius: isStart && isEnd ? '9999px' : (isStart ? '9999px 0 0 9999px' : (isEnd ? '0 9999px 9999px 0' : '0')),
                  clipPath: isStart && isEnd ? 'none' : (
                    isStart ? 'inset(0 0 0 50%)' : 
                    isEnd ? 'inset(0 50% 0 0)' : 
                    'none' 
                  )
                } as React.CSSProperties}
                title={event.title}
              >
                {event.title}
              </div>
            );
          })}
          
          {week.days.map(({ day, month: dayMonth, date }, index) => {
            const isCurrentMonth = dayMonth === "current";
            const dayEvents = getEventsForDay(date);
            const today = isToday(date);

            const baseText = !isCurrentMonth
              ? "text-gray-300 dark:text-gray-600"
              : "text-gray-800 dark:text-gray-100";

            return (
              <div
                key={index}
                className="relative flex flex-col items-center justify-start h-16 pt-1 z-10" 
              >
                <button
                  onClick={() => isCurrentMonth && onDateClick(date)}
                  className={`relative z-10 w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium transition
                    ${baseText} hover:bg-slate-100 dark:hover:bg-slate-700
                    ${today ? "ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-slate-800" : ""}
                  `}
                >
                  {day}
                </button>
                
                {dayEvents.filter(ev => !ev.endDateTime || isSameDay(cleanDate(new Date(ev.startDateTime)), cleanDate(new Date(ev.endDateTime))))
                  .length > 0 && (
                  <div className="relative z-10 flex flex-col gap-0.5 mt-0.5 items-center">
                    {dayEvents.filter(ev => !ev.endDateTime || isSameDay(cleanDate(new Date(ev.startDateTime)), cleanDate(new Date(ev.endDateTime))))
                      .slice(0, 2) 
                      .map((event, i) => (
                        <div
                          key={i}
                          title={event.title}
                          className="w-2 h-0.5 rounded-full"
                          style={{ backgroundColor: event.color }}
                        />
                      ))}
                    {dayEvents.filter(ev => !ev.endDateTime || isSameDay(cleanDate(new Date(ev.startDateTime)), cleanDate(new Date(ev.endDateTime))))
                      .length > 2 && (
                      <div className="w-2 h-0.5 rounded-full bg-gray-400 dark:bg-gray-500" title="More events"></div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Calendar;