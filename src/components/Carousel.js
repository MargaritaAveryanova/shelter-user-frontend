import React, { useState, useEffect } from 'react';

const Carousel = () => {
  const [news, setNews] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [loading, setLoading] = useState(true);
  const [selectedNews, setSelectedNews] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Мок-данные для демонстрации
  const mockNews = [
    {
      id: 1,
      title: "Новые жильцы приюта",
      description: "На этой неделе к нам поступили 5 новых кошек и 3 собаки, которые ищут любящие семьи.",
      date: new Date().toISOString(),
      image: null,
      fullDescription: "Подробная информация о новых жильцах приюта. Все животные прошли ветеринарный осмотр и готовы к усыновлению. Среди новых жильцов - три котенка и две взрослые кошки, а также две молодые собаки и один щенок. Все они ждут своих хозяев!"
    },
    {
      id: 2,
      title: "Благотворительная акция",
      description: "Приглашаем всех на благотворительную ярмарку в поддержку бездомных животных.",
      date: new Date(Date.now() - 86400000).toISOString(),
      image: null,
      fullDescription: "Подробности о благотворительной ярмарке: мероприятие состоится в центральном парке города. Мы будем рады видеть всех желающих помочь нашим подопечным. На ярмарке будут представлены handmade изделия, угощения и многое другое. Все собранные средства пойдут на корм и лечение животных."
    },
    {
      id: 3,
      title: "Успешные усыновления",
      description: "За последний месяц 15 животных нашли свой новый дом! Спасибо всем, кто подарил им шанс.",
      date: new Date(Date.now() - 172800000).toISOString(),
      image: null,
      fullDescription: "Статистика успешных усыновлений за последний месяц: 8 кошек и 7 собак обрели любящие семьи. Особенно радует, что среди них были и животные, которые долгое время ждали своего хозяина. Мы благодарим всех, кто открыл свой дом и сердце для наших питомцев."
    }
  ];

  const API_URL = 'http://localhost:8080/api/events';

  useEffect(() => {
    loadNews();
  }, []);

  useEffect(() => {
    let interval;
    if (isAutoPlaying && news.length > 1) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % news.length);
      }, 8000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, news.length]);

  const loadNews = async () => {
    try {
      setLoading(true);
      console.log('Пытаемся загрузить новости с:', API_URL);
      
      const response = await fetch(API_URL);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Данные получены:', data);
      
      if (Array.isArray(data) && data.length > 0) {
        setNews(data);
      } else {
        console.log('Получен пустой массив или не массив, используем мок-данные');
        setNews(mockNews);
      }
    } catch (error) {
      console.error("Ошибка при загрузке новостей:", error);
      console.log("Используем мок-данные");
      setNews(mockNews);
    } finally {
      setLoading(false);
    }
  };

  const nextSlide = () => {
    if (news.length > 1) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % news.length);
    }
  };

  const prevSlide = () => {
    if (news.length > 1) {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + news.length) % news.length);
    }
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // Функция для открытия модального окна
  const openModal = (newsItem) => {
    setSelectedNews(newsItem);
    setIsModalOpen(true);
    setIsAutoPlaying(false); // Останавливаем автопрокрутку при открытии модалки
  };

  // Функция для закрытия модального окна
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedNews(null);
    setIsAutoPlaying(true); // Возобновляем автопрокрутку
  };

  // Закрытие модального окна по клику на overlay
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  if (loading) {
    return (
      <div className="carousel-container">
        <h2 className="carousel-title">ПОСЛЕДНИЕ НОВОСТИ И СОБЫТИЯ</h2>
        <div className="carousel-loading">Загрузка новостей...</div>
      </div>
    );
  }

  return (
    <div className="carousel-container">
      <h2 className="carousel-title">ПОСЛЕДНИЕ НОВОСТИ И СОБЫТИЯ</h2>
      
      <div 
        className="carousel"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        {news.length > 1 && (
          <>
            <button className="carousel-btn carousel-btn-prev" onClick={prevSlide}>
              ‹
            </button>
            <button className="carousel-btn carousel-btn-next" onClick={nextSlide}>
              ›
            </button>
          </>
        )}

        <div className="carousel-track-container">
          <div 
            className="carousel-track"
            style={{ 
              transform: `translateX(-${currentIndex * (100 / news.length)}%)`,
              width: `${news.length * 100}%`
            }}
          >
            {news.map((item, index) => (
              <div 
                key={item.id || index} 
                className="carousel-slide"
                style={{ width: `${100 / news.length}%` }}
              >
                <div className="carousel-content">
                  <div className="carousel-image-container">
                    {item.image ? (
                      <img 
                        src={`http://localhost:8080${item.image}`} 
                        alt={item.title} 
                        className="carousel-image"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="carousel-image-placeholder">
                        📰 Новость
                      </div>
                    )}
                  </div>
                  <div className="carousel-text">
                    <h3 className="carousel-item-title">{item.title}</h3>
                    {/* <p className="carousel-item-description">{item.description}</p> */}
                    <button 
                      className="carousel-read-more"
                      onClick={() => openModal(item)}
                    >
                      Читать подробнее
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {news.length > 1 && (
        <div className="carousel-indicators">
          {news.map((_, index) => (
            <button
              key={index}
              className={`carousel-indicator ${index === currentIndex ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      )}
      
      {news.length === 0 && (
        <div className="carousel-no-news">
          Пока нет новостей. Следите за обновлениями!
        </div>
      )}

      {/* Модальное окно */}
      {isModalOpen && selectedNews && (
        <div className="modal-overlay" onClick={handleOverlayClick}>
          <div className="modal-content">
            <button className="modal-close" onClick={closeModal}>
              ×
            </button>
            
            <div className="modal-layout">
              <div className="modal-image-section">
                {selectedNews.image ? (
                  <img 
                    src={`http://localhost:8080${selectedNews.image}`} 
                    alt={selectedNews.title}
                    className="modal-image"
                  />
                ) : (
                  <div className="modal-image-placeholder">
                    🐾 Приют "Тёплый дом"
                  </div>
                )}
              </div>
              
              <div className="modal-content-section">
                <div className="modal-header">
                  <h2 className="modal-title">{selectedNews.title}</h2>
                  
                </div>

                <div className="modal-body">
                  <div className="modal-text">
                    <p className="modal-full-description">
                      {selectedNews.fullDescription || selectedNews.description}
                    </p>
                    
                    {/* Дополнительные поля из БД */}
                    {selectedNews.location && (
                      <div className="modal-info-item">
                        <strong>📍 Место проведения:</strong> 
                        <span>{selectedNews.location}</span>
                      </div>
                    )}
                    
                    {selectedNews.time && (
                      <div className="modal-info-item">
                        <strong>🕐 Время:</strong> 
                        <span>{selectedNews.time}</span>
                      </div>
                    )}
                    
                    {selectedNews.contact && (
                      <div className="modal-info-item">
                        <strong>📞 Контакты:</strong> 
                        <span>{selectedNews.contact}</span>
                      </div>
                    )}
                    
                    {selectedNews.additionalInfo && (
                      <div className="modal-additional">
                        <h4>Дополнительная информация:</h4>
                        <p>{selectedNews.additionalInfo}</p>
                      </div>
                    )}
                  </div>
                </div>

                
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Carousel;