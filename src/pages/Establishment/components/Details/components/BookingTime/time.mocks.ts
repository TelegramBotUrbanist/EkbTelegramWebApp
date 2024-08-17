import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { MinuteBlockDTO, ReservationAvailabilityDTO } from './time.types.ts';
import { mockHttp } from '../../../../../../shared/http.ts';



const generateMinuteBlocks = (hour: number): MinuteBlockDTO[] => {
  return Array.from({ length: 12 }, (_, i) => ({
    minute: i * 5,
    occupied: Math.random() > 0.7
  }));
};

const mockData: ReservationAvailabilityDTO = {
  hours: Array.from({ length: 24 }, (_, i) => ({
    hour: i,
    occupancyRate: Math.random() * 100,
    minuteBlocks: generateMinuteBlocks(i),
    fullyOccupied: Math.random() > 0.8
  }))
};

mockHttp.onGet(/\/food\/establishments\/get\/\d+\/reservation\/available\/periods/).reply(200, mockData);

