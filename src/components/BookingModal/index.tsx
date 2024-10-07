import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ConfirmIcon from '/Confirm.svg';
import ErrorIcon from '/Error.svg';
import './Modal.scss';

interface BookingModalProps {
  type: 'establishment' | 'event';
  onClose: () => void;
  message:JSX.Element | string | null
  status:'success' | 'error'
}

const BookingModal: React.FC<BookingModalProps> = ({
                                                     type,
                                                     message,
                                                      status,
                                                     onClose,
                                                   }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 50000);

    const handleInteraction = () => {
      clearTimeout(timer);
      onClose();
    };

    window.addEventListener('scroll', handleInteraction);
    window.addEventListener('click', handleInteraction);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleInteraction);
      window.removeEventListener('click', handleInteraction);
    };
  }, [onClose]);

  const getMessageContent = () => {
    if (type === 'establishment') {
      if (status === 'success') {
        return (
          <>
            <img className={'image_modal'} src={ConfirmIcon} alt="Success" />
            <div>{message}</div>
          </>
        );
      } else {
        return (
          <>
            <img className={'image_modal'} src={ErrorIcon} alt="Error" />
            <h2>Ошибка</h2>
            <p>Не удалось забронировать стол, бронирование временно недоступно</p>
          </>
        );
      }
    } else {
      return (
        <>
          <img src="https://s3-alpha-sig.figma.com/img/4511/c167/6327250f19b510dbe99e59b792b1065b?Expires=1729468800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ePPpuwTSNR~zxHsAuWIyrBWa~FyMp4oN1MeNlqvzlBliMQBXqrB316BsMKvoxcYRfpnw3-hV3JkPwjxh06QmAtbBtWMR-210zHL~Ft7fV97FCTIjHe6tq1gzRiqU1m-mFDXgg0w5u9HnnYmQnrWGgEEHo7Cln2-TVT43FkoK8IinymwJJfLtIhkkcpCv3o3ZDO-Y80f1gzdUvt1LbZJdt9Gfpzwhl2lDLI9MwnU1IhAqyaKwWKQQ2bGgjfD94~hyh9wQAOrah~-p6cEyN4llfayz1AjY08tB-JzvFVvc~mnaMn7kwVJBy1kekVlwvuGc~p1brgejq~Pwva3DGtkqwg__"
               alt="Event Registered"
          />
          <div>{message}</div>
          {/*<p>{eventDate}</p>*/}
        </>
      );
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="booking-modal"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
      >
        {getMessageContent()}
      </motion.div>
    </AnimatePresence>
  );
};

export default BookingModal;
