import React, { useState, useEffect } from 'react';

import dog1 from '../img/image30.png';
import dog2 from '../img/image32.png';
import cat from '../img/image28.png';

// Основной компонент модального окна
const PhoneModal = () => {
  // Состояние для отслеживания открыто/закрыто модальное окно
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Состояние для определения мобильного устройства
  const [isMobile, setIsMobile] = useState(false);

  // useEffect для проверки размера экрана при загрузке и изменении размера окна
  useEffect(() => {
    // Функция проверки размера экрана
    const checkScreenSize = () => {
      // Устанавливаем isMobile в true, если ширина окна <= 768px
      setIsMobile(window.innerWidth <= 768);
    };

    // Вызываем функцию при первом рендере
    checkScreenSize();
    // Добавляем слушатель события изменения размера окна
    window.addEventListener('resize', checkScreenSize);

    // Функция очистки - удаляем слушатель при размонтировании компонента
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []); // Пустой массив зависимостей - выполняется только при монтировании

  // Функция открытия модального окна
  const openModal = () => setIsModalOpen(true);
  
  // Функция закрытия модального окна
  const closeModal = () => setIsModalOpen(false);

  // Обработчик клика по оверлею (фону модального окна)
  const handleOverlayClick = (e) => {
    // Закрываем модальное окно только если кликнули именно на оверлей (а не на контент)
    if (e.target === e.currentTarget) closeModal();
  };

  // useEffect для обработки клавиши Escape
  useEffect(() => {
    // Функция обработки нажатия клавиши
    const handleEscape = (e) => {
      // Если нажата клавиша Escape, закрываем модальное окно
      if (e.key === 'Escape') closeModal();
    };

    // Добавляем слушатель только если модальное окно открыто
    if (isModalOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    // Функция очистки - удаляем слушатель
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isModalOpen]); // Зависимость от isModalOpen - пересоздаем слушатель при изменении состояния

  // Возвращаем JSX разметку компонента
  return (
    <div>
      {/* Кнопка для открытия модального окна */}
      <button className="manual" onClick={openModal}>
        Прочитать инструкцию
      </button>

      {/* Условный рендеринг модального окна (показывается только если isModalOpen = true) */}
      {isModalOpen && (
        // Оверлей (фон) модального окна
        <div className="modal-overlay" onClick={handleOverlayClick}>
          {/* Основной контейнер модального окна */}
          <div className="modal-content">
            {/* Кнопка закрытия модального окна */}
            <button className="close-button" onClick={closeModal}>&times;</button>
            
            {/* Заголовок модального окна */}
            <span className='f1'><b>Инструкция к пожертвованию</b></span>
            
            <img src={dog1} className="dog1_1"/>
            <img src={cat} className="cat_1"/>
            
           
            <div className="instruction-section">
                <p></p>
              <p>В поле «Назначение платежа» или «Описание» при переводе, пожалуйста, напишите:</p>
              {/* Блок с основным текстом для перевода */}
              <div className="donation-text"><b>
                «Пожертвование на нужды приюта — корм и лечение животных»
              </b>
              </div>
              <p>или другой подходящий текст, если вы хотите направить средства на конкретную программу (например, стерилизация, лечение и т.д.)</p>
            </div>

            {/* Раздел 2: Подтверждение пожертвований */}
            <div className="instruction-section_2">
              <h4><b>Подтверждение пожертвований</b></h4>
              <p>Если вы хотите получить подтверждение перевода, напишите нам на [электронную почту] приложив квитанцию о платеже.</p>
              <p>Мы пришлем вам справку о получении средств или небольшой отчёт о том, как они были использованы.</p>
            </div>

            {/* Раздел 3: Отчётность */}
            <div className="instruction-section_3">
              <h4><b>Отчётность</b></h4>
              <p>Мы публикуем отчёты о расходах каждый квартал — вы всегда можете ознакомиться, куда пошли средства и как они помогают нашим подопечным.</p>
            </div>

            <img src={dog2} className="dog1_2"/>


          </div>
        </div>
      )}
    </div>
  );
};

// Экспортируем компонент для использования в других файлах
export default PhoneModal;