import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useAtom } from 'jotai';
import { bookingModalAtom } from '../../../components/BookingModal/booking.atom.ts';
import BookingModal from '../../../components/BookingModal';

const Index = ({children}) => {

  const [bookingModal, setBookingModal] = useAtom(bookingModalAtom);



  return (
    <div>

      {bookingModal.showModal && (
        <BookingModal
          status={'success'}
          type={bookingModal.type}
          message={bookingModal.message}
          onClose={() => setBookingModal({ ...bookingModal, showModal: false })}
        />
      )}
      {children}
    </div>
  );
};

export default Index;