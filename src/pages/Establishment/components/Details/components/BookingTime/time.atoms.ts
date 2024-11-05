// Atoms
import { atom } from 'jotai/index';
import { format } from 'date-fns';
import axios from 'axios';
import './time.mocks.ts'
import { ReservationAvailabilityDTO, TimeRange } from './time.types.ts';
import { http } from '../../../../../../shared/http.ts';
import { useRef, useState } from 'react';

export const bookingTimeAtom = atom<TimeRange>({
  startTime: {
    hours:'',
    minutes:''
  },
  endTime: {
    hours:'',
    minutes:''
  }
});

export const bookingPointChooseAtom = atom<'start' | 'end' | null>(null);


export const availableTimeAtom = atom(async (get) => {
  // В реальном приложении параметры будут браться из других атомов

  const currentPoint = get(bookingPointChooseAtom)
  if (!currentPoint) return
  const date = format(new Date(), 'yyyy.MM.dd');
  const response = await http.get(`/food/establishments/get/1/reservation/available/periods`, {
    params: {
      date,
      point: currentPoint
      // guestsCount: 2,
    }
  });
  console.log(response,'response');
  return response.data as ReservationAvailabilityDTO;
});