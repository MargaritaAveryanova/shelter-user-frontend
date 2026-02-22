import React, { useState, useEffect } from 'react';

const BankAndPhone = () => {
  // Состояние для данных из БД
  const [accountNumber, setAccountNumber] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [loading, setLoading] = useState(true);

  // ⚠️ ВНИМАНИЕ: НУЖНО ПРАВИЛЬНО УКАЗАТЬ URL ТВОЕГО API
  const API_URL = 'http://localhost:8080/api/settings';

  // ВОТ ЗДЕСЬ ПРОИСХОДИТ ВЗЯТИЕ ДАННЫХ ИЗ БД
  useEffect(() => {
    // Эта функция загружает данные из БД через API
    const fetchDataFromDatabase = async () => {
      try {
        console.log('Начинаю загрузку данных из БД...');
        
        // ⬇⬇⬇ ВОТ ЭТА СТРОЧКА ДЕЛАЕТ ЗАПРОС К БД ⬇⬇⬇
        const response = await fetch(API_URL);
        
        if (!response.ok) {
          throw new Error(`Ошибка сервера: ${response.status}`);
        }
        
        // ⬇⬇⬇ ВОТ ЗДЕСЬ МЫ ПОЛУЧАЕМ ДАННЫЕ ИЗ БД ⬇⬇⬇
        const data = await response.json();
        console.log('Данные получены из БД:', data);
        
        // ⚠️ ВАЖНО: данные приходят с полями в camelCase!
        // Используем правильные названия полей:
        if (data.accountNumber) {
          setAccountNumber(data.accountNumber);
          console.log('Установлен accountNumber:', data.accountNumber);
        }
        if (data.cardNumber) {
          setCardNumber(data.cardNumber);
          console.log('Установлен cardNumber:', data.cardNumber);
        }
        
      } catch (error) {
        console.error('Ошибка при загрузке данных из БД:', error);
        // Если БД недоступна, используем тестовые данные
        setAccountNumber('40817810000000000001');
        setCardNumber('1235 5678 9012 3456');
      } finally {
        setLoading(false);
      }
    };
    
    fetchDataFromDatabase();
    
  }, []);

  // Если данные еще загружаются
  if (loading) {
    return <div className="loading">Загрузка...</div>;
  }

  // Добавим отладочный вывод
  console.log('Текущие значения для отображения:');
  console.log('accountNumber:', accountNumber);
  console.log('cardNumber:', cardNumber);

  // Отображаем только данные из БД без лишних надписей
  return (
    <div className="bank-phone-container">
      <div className="account-number">
        {/* ⬇⬇⬇ ОТОБРАЖАЕТСЯ НОМЕР СЧЕТА ИЗ БД ⬇⬇⬇ */}
        <b>{accountNumber}</b>
      </div>
      <div className="card-number">
        {/* ⬇⬇⬇ ОТОБРАЖАЕТСЯ НОМЕР КАРТЫ ИЗ БД ⬇⬇⬇ */}
        <b>{cardNumber}</b>
      </div>
    </div>
  );
};

export default BankAndPhone;