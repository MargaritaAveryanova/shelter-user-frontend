import React, { useState, useEffect } from 'react';
// import './Filters.css';

const Filters = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    gender: '',
    sterilized: '',
    tray: '',
    vaccinated: '',
    hasDescription: '',
    age: ''
  });

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [showAllFilters, setShowAllFilters] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      // Сбрасываем показ всех фильтров при переходе на десктоп
      if (window.innerWidth > 768) {
        setShowAllFilters(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleFilterChange = (name, value) => {
    // Если фильтр уже активен - отключаем его
    const newValue = filters[name] === value ? '' : value;
    const newFilters = { ...filters, [name]: newValue };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters = {
      gender: '',
      sterilized: '',
      tray: '',
      vaccinated: '',
      hasDescription: '',
      age: ''
    };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  const isFilterActive = (name, value) => filters[name] === value;

  // Массив всех фильтров
  const allFilters = [
    // Первая группа (всегда видимая)
    { type: 'gender', value: 'Девочка', label: 'Девочка' },
    { type: 'gender', value: 'Мальчик', label: 'Мальчик' },
    { type: 'sterilized', value: 'true', label: 'Кастрирован' },
    { type: 'sterilized', value: 'false', label: 'Не кастрирован' },
    { type: 'hasDescription', value: 'true', label: 'Есть описание характера' },
    
    // Вторая группа (скрытая на мобильных)
    { type: 'tray', value: 'false', label: 'Не приучен к лотку' },
    { type: 'tray', value: 'true', label: 'Приучен к лотку' },
    { type: 'vaccinated', value: 'true', label: 'Есть прививки' },
    { type: 'age', value: 'under1', label: 'Младше 1 года' },
    { type: 'age', value: 'under6months', label: 'Младше 6 месяцев' },
    { type: 'age', value: 'over1', label: 'Старше 1 года' },
    { type: 'age', value: 'over5', label: 'Старше 5 лет' }
  ];

  // Разделяем фильтры на видимые и скрытые
  const alwaysVisibleFilters = allFilters.slice(0, 6); // Первые 5 фильтров всегда видны
  const hiddenFilters = allFilters.slice(6); // Остальные фильтры

  return (
    <div className="filters-wrapper">
      <div className="filters-grid">
        {/* Всегда видимые фильтры */}
        <div className="filter-row">
          {alwaysVisibleFilters.map((filter, index) => (
            <button
              key={index}
              className={`filter-chip ${isFilterActive(filter.type, filter.value) ? 'active' : ''}`}
              onClick={() => handleFilterChange(filter.type, filter.value)}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Скрытые фильтры (показываются только на десктопе или когда showAllFilters=true на мобильных) */}
        {(!isMobile || showAllFilters) && (
          <div className="filter-row">
            {hiddenFilters.map((filter, index) => (
              <button
                key={index}
                className={`filter-chip ${isFilterActive(filter.type, filter.value) ? 'active' : ''}`}
                onClick={() => handleFilterChange(filter.type, filter.value)}
              >
                {filter.label}
              </button>
            ))}
          </div>
        )}

        {/* Кнопка "Показать больше фильтров" (только на мобильных) */}
        {isMobile && !showAllFilters && (
          <div className="filter-row" style={{ justifyContent: 'center', marginTop: '10px', marginBottom: '10px' }}>
            <button
              className="filter-chip show-more-btn"
              onClick={() => setShowAllFilters(true)}
              style={{
                backgroundColor: 'var(--filter-activ)',
                color: 'var(--text-color)',
                border: '2px solid var(--filter-activ)',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                gap: '5px'
              }}
            >
              <span>Показать больше фильтров</span>
              
            </button>
          </div>
        )}

        {/* Кнопка "Скрыть фильтры" (когда показаны все на мобильных) */}
        {isMobile && showAllFilters && (
          <div className="filter-row" style={{ justifyContent: 'center', marginTop: '10px', marginBottom: '10px' }}>
            <button
              className="filter-chip show-more-btn"
              onClick={() => setShowAllFilters(false)}
              style={{
                backgroundColor: 'var(--filter-activ)',
                color: 'var(--text-color)',
                border: '2px solid var(--filter-activ)',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                gap: '5px'

              }}
            >
              <span>Скрыть фильтры</span>
              
            </button>
          </div>
        )}
      </div>

      {/* Кнопка сброса фильтров */}
      {Object.values(filters).some(v => v !== '') && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <button className="clear-filters-btn" onClick={clearFilters}>
            Сбросить все фильтры
          </button>
        </div>
      )}
    </div>
  );
};

export default Filters;