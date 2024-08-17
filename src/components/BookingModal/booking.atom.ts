import { atom } from 'jotai';
import { JSX } from 'react';

interface IBookingAtom{
  showModal:boolean,
  message:JSX.Element | string |  null
  type:'establishment' | 'event'
}
export const bookingModalAtom = atom<IBookingAtom>({
  showModal: false,
  message: null,
  type: 'establishment'
});