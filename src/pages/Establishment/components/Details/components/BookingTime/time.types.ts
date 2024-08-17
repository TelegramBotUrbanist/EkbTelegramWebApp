
// Types
import { atom } from 'jotai/index';

export interface TimeRange {
  startTime: {
    hours:string,
    minutes:string
  };
  endTime: {
    hours:string,
    minutes:string
  };
}

export interface MinuteBlockDTO {
  minute: number;
  occupied: boolean;
}

export interface HourDTO {
  hour: number;
  occupancyRate: number;
  minuteBlocks: MinuteBlockDTO[];
  fullyOccupied: boolean;
}

export interface ReservationAvailabilityDTO {
  hours: HourDTO[];
}

