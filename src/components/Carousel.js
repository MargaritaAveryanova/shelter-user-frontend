import React, { useState, useEffect } from 'react';


const Carousel = () => {
  const [news, setNews] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [loading, setLoading] = useState(true);

  // Мок-данные для демонстрации
  const mockNews = [
    {
      id: 1,
      title: "Новые жильцы приюта",
      description: "На этой неделе к нам поступили 5 новых кошек и 3 собаки, которые ищут любящие семьи.",
      date: new Date().toISOString(),
      image: null
    },
    {
      id: 2,
      title: "Благотворительная акция",
      description: "Приглашаем всех на благотворительную ярмарку в поддержку бездомных животных.",
      date: new Date(Date.now() - 86400000).toISOString(),
      image: null
    },
    {
      id: 3,
      title: "Успешные усыновления",
      description: "За последний месяц 15 животных нашли свой новый дом! Спасибо всем, кто подарил им шанс.",
      date: new Date(Date.now() - 172800000).toISOString(),
      image: null
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
      }, 4000);
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
      
      // Проверяем, что data - массив и не пустой
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

  if (loading) {
    return (
      <div className="carousel-container">
        <h2 className="carousel-title">ПОСЛЕДНИЕ НОВОСТИ И СОБЫТИЯ</h2>
        <div className="carousel-loading">Загрузка новостей...</div>
      </div>
    );
  }

  console.log('Текущие новости для отображения:', news);
  console.log('Количество новостей:', news.length);
  console.log('Текущий индекс:', currentIndex);

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
                    <p className="carousel-item-date">
                      {new Date(item.date).toLocaleDateString('ru-RU', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </p>
                    <p className="carousel-item-description">{item.description}</p>
                    <button className="carousel-read-more">
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
    </div>
  );
};

export default Carousel;