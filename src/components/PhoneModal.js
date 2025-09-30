import React, { useEffect, useState } from 'react';

const PhoneModal = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
  
    useEffect(() => {
      const checkScreenSize = () => {
        setIsMobile(window.innerWidth <= 768);
      };
  
      checkScreenSize();
      window.addEventListener('resize', checkScreenSize);
  
      return () => window.removeEventListener('resize', checkScreenSize);
    }, []);
  
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
  
    const handlePhoneClick = () => {
      const phoneNumber = '+79991234567';
      
      if (isMobile) {
        const userConfirmed = window.confirm('Хотите позвонить по номеру +7 (999) 123-45-67?');
        if (userConfirmed) window.location.href = `tel:${phoneNumber}`;
      } else {
        window.location.href = `tel:${phoneNumber}`;
      }
    };
  
    const handleOverlayClick = (e) => {
      if (e.target === e.currentTarget) closeModal();
    };
  
    useEffect(() => {
      const handleEscape = (e) => {
        if (e.key === 'Escape') closeModal();
      };
  
      if (isModalOpen) {
        document.addEventListener('keydown', handleEscape);
      }
  
      return () => document.removeEventListener('keydown', handleEscape);
    }, [isModalOpen]);
  
    return (
      <div>
        <button className="call_now" onClick={openModal}>
          Позвони уже сейчас
        </button>
  
        {isModalOpen && (
          <div className="modal-overlay" onClick={handleOverlayClick}>
            <div className="modal-content">
              <button className="close-button" onClick={closeModal}>&times;</button>
              <h3>Контактный номер</h3>
              <div className="phone-number" onClick={handlePhoneClick}>
                +7 (999) 123-45-67
              </div>
              <p className='tup_number'>Нажмите на номер для звонка</p>
            </div>
          </div>
        )}
      </div>
    );
  };

  export default PhoneModal;