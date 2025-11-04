export interface Event {
  id: number;
  title: string;
  startDateTime: Date;
  endDateTime?: Date;
  location?: string;
  details: string;
  type: 'event' | 'flight' | 'meeting';
  flightDetails?: {
    from: string;
    to: string;
  };
  color: 'purple' | 'pink';
}
