// Atoms
import { atom } from 'jotai/index';
import { format } from 'date-fns';
import axios from 'axios';
// import './time.mocks.ts'
import { ReservationAvailabilityDTO, TimeRange } from './time.types.ts';
import { http, resetApiProvider } from '../../../../../../shared/http.ts';
import { useRef, useState } from 'react';
import { establishmentAtom, establishmentIdAtom } from '../../details.atoms.ts';

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
  const currentEstablishmentId = get(establishmentIdAtom)
  const currentPoint = get(bookingPointChooseAtom)
  if (!currentPoint) return
  const date = format(new Date(), 'yyyy.MM.dd');
  resetApiProvider()
  const response = await http.get(`/food/establishments/get/${currentEstablishmentId}/reservation/available/periods`, {
    params: {
      date,
      point: currentPoint
      // guestsCount: 2,
    }
  });
  console.log(response,'response');
  return response.data as ReservationAvailabilityDTO;
});