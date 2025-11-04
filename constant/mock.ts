import { Event } from "@/types/event";

const today = new Date();
const currentMonth = today.getMonth();
const currentYear = today.getFullYear();

export const MOCK_EVENTS: Event[] = [
  {
    id: 1,
    title: "Dinner with Obama",
    startDateTime: new Date(currentYear, currentMonth, 8, 18, 0),
    details:
      "MacDonald,D tower, sanktun soho, No.26 gongti Road, hadian district, BEijing",
    location: "Beijing",
    type: "event",
    color: "purple",
  },
  {
    id: 2,
    title: "biz trip to Italy",
    startDateTime: new Date(currentYear, currentMonth, 12, 11, 0),
    endDateTime: new Date(currentYear, currentMonth, 16),
    details: "@Beijing international airport T3 building",
    location: "Italy",
    type: "flight",
    flightDetails: {
      from: "PEK",
      to: "FCO",
    },
    color: "purple",
  },
  {
    id: 3,
    title: "Government meetings",
    startDateTime: new Date(currentYear, currentMonth, 24, 9, 0),
    details: "Discussing new policies",
    location: "City Hall",
    type: "meeting",
    color: "pink",
  },
  {
    id: 4,
    title: "arravial @FCO",
    startDateTime: new Date(currentYear, currentMonth, 13, 8, 0),
    details: "Go to the hotel, 1 hours ahead of time",
    location: "Rome",
    type: "event",
    color: "purple",
  },
  {
    id: 5,
    title: "TBD",
    startDateTime: new Date(currentYear, currentMonth, 14, 0, 0),
    details: "To be determined",
    type: "event",
    color: "purple",
  },
  {
    id: 6,
    title: "TBD",
    startDateTime: new Date(currentYear, currentMonth, 15, 0, 0),
    details: "To be determined",
    type: "event",
    color: "purple",
  },
  {
    id: 7,
    title: "Back home",
    startDateTime: new Date(currentYear, currentMonth, 16, 22, 45),
    details: "Go to T3 international Airport, 2 hours ahead of time",
    type: "event",
    color: "purple",
  },
  {
    id: 8,
    title: "Project Deadline",
    startDateTime: new Date(currentYear, currentMonth, 2, 23, 59),
    endDateTime: new Date(currentYear, currentMonth, 4, 23, 59),
    details: "Final submission for Project Phoenix",
    type: "meeting",
    color: "pink",
  },
  {
    id: 9,
    title: "Team Lunch",
    startDateTime: new Date(currentYear, currentMonth, 20, 12, 30),
    endDateTime: new Date(currentYear, currentMonth, 21, 12, 30),
    details: "Celebrating recent success at The Grand Bistro",
    type: "event",
    color: "purple",
  },
];
