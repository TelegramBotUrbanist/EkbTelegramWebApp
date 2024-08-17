import React from 'react';
import { motion } from 'framer-motion';
import './Modal.scss';

interface IProps {
  onClose?: () => void;
  title: string | React.ReactNode;
  children: React.ReactNode;
  align:'start'|"end"|'center'
}

const Modal: React.FC<IProps> = ({align="center", onClose, title, children }) => {
  // Закрытие окна при нажатии вне его, если функция onClose передана
  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('modal-overlay') && onClose) {
      onClose();
    }
  };

  return (
    <motion.div
      className="modal-overlay"
      style={{alignItems:align}}
      onClick={handleOverlayClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="modal-content"
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        {/* Условно отображаем кнопку закрытия, если есть onClose */}

        <div className="modal-header">
          {/* Отображение заголовка */}
          {typeof title === 'string' ? <div className={'title'}>{title}</div> : title}
          <div className={'close-container'}>{onClose && (
            <button className="close-button" onClick={onClose}>
              &times;
            </button>
          )}
          </div>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Modal;

