import React, { useState, useEffect} from 'react';

import YandexMapContainer from './components/YandexMapContainer'; 
import PhoneModal from './components/PhoneModal'; 
import CallCurator from './components/CallCurator';

import Blob from './components/Blob'; 
import BiegeShape from './components/BiegeShape';
import StepCircles from './components/StepCircles';

import Header from "./components/Header"
import Footer from "./components/footer"

import dog1 from './img/dog1.jpg';
import dog2 from './img/dog2.jpg';
import dog3 from './img/dog3.jpg';
import cat from './img/cat.jpg';
import pinkpets from './img/pets.jpg';


function App() {
  const [showAllPets, setShowAllPets] = useState(false);
  const [pets, setPets] = useState([]);
  const [selectedPet, setSelectedPet] = useState(null);
  const [showPetModal, setShowPetModal] = useState(false);

  const API_URL = 'http://localhost:8080/api/pets';

  useEffect(() => {
    loadPets();
  }, []);

  const loadPets = () => {
    fetch(API_URL)
      .then(response => response.json())
      .then(data => {
        // Преобразуем пути к фото
        const petsWithFullPhotoPath = data.map(pet => ({
          ...pet,
          photo: pet.photo ? `http://localhost:8080${pet.photo}` : 'https://placedog.net/300/200'
        }));
        setPets(petsWithFullPhotoPath);
      })
      .catch(error => console.error("Ошибка при загрузке питомцев:", error));
  };

  const toggleShowPets = () => {
    setShowAllPets(!showAllPets);
  };

  const handlePetClick = (pet) => {
    setSelectedPet(pet);
    setShowPetModal(true);
  };

  const closePetModal = () => {
    setShowPetModal(false);
    setSelectedPet(null);
  };

  // Разделяем питомцев на группы для отображения
  const visiblePets = showAllPets ? pets : pets.slice(0, 8);
  const firstRowPets = visiblePets.slice(0, 4);
  const secondRowPets = visiblePets.slice(4, 8);

  return (
    <div className="wrapper">
      <Header/>
      <div className="background">
        <Blob />
      </div>
      <div className="first_block" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <div className="blue_block" ></div>
        <div className="white_block">Сегодня <b>"Тёплый Дом"</b> – это уютное место, где ежегодно находят новый дом <b>более 100</b> собак и кошек</div>
        <img src={dog1} className="dog1"/>
        <img src={dog2} className="dog2"/>
        <div className="biege_block" style={{textAlign: 'center'}}>
          <BiegeShape />
          <span className="dom">Приют <b>"Тёплый дом"</b></span>
          <span className="dom2">️Подари шанс – подари дом!</span>
        </div>
      </div>


      <div className="dream_home">
        <span id="dream">МЕЧТАЮТ О ДОМЕ</span>
      </div>


{/* КАРТОЧКИ ЖИВОТНЫХ ИЗ БД */}
<div className="pats" style={{textAlign:"center"}}>
  <div className="container">
    {/* Для всех экранов - адаптивная сетка */}
    <div className="row justify-content-center" style={{paddingRight:"0px"}}>
      {pets.slice(0, showAllPets ? pets.length : 8).map((pet, index) => (
        <div 
          key={pet.id || index} 
          className="col-6 col-md-4 col-lg-3 text-center" 
          style={{padding:"0px", marginBottom: "20px"}}
        >
          <div className="pet-card" onClick={() => handlePetClick(pet)}>
            <img src={pet.photo} alt={pet.name} className="pet" />
            <div className='pet-info'>
              <h5 style={{margin:'0'}}>{pet.name}</h5>
              <p style={{margin:'0'}}>{pet.gender}</p>
              <p style={{margin:'0'}}>{pet.age}</p>
            </div>
              
            
          </div>
        </div>
      ))}
    </div>

    {/* Кнопка "Показать больше/Скрыть" */}
    {pets.length > 8 && (
      <button className="look_more" onClick={toggleShowPets}>
        {showAllPets ? 'Скрыть' : 'Показать больше'}
      </button>
    )}
  </div>
</div>

      {/* Модальное окно с детальной информацией о питомце */}
{showPetModal && selectedPet && (
  <div className="modal-overlay" onClick={closePetModal}>
    <div className="modal-content pet-modal" onClick={(e) => e.stopPropagation()}>
      <button className="modal-close-btn" onClick={closePetModal}>×</button>
      
      <div className="modal-pet-container">
        {/* Для больших экранов - картинка слева, контент справа */}
        <div className="d-none d-md-block">
          <div className="modal-pet-layout-horizontal">
            <div className="modal-pet-image-side">
              <img src={selectedPet.photo} alt={selectedPet.name} />
              <div ><CallCurator /></div>
            </div>
            
            <div className="modal-pet-details-side">
              <h2>{selectedPet.name}</h2>
              
              <div className="pet-details-grid">
                <div className="detail-item">
                  <span className="detail-label">Пол:</span>
                  <span className="detail-value">{selectedPet.gender}</span>
                </div>
                
                <div className="detail-item">
                  <span className="detail-label">Возраст:</span>
                  <span className="detail-value">{selectedPet.age}</span>
                </div>
                
                <div className="detail-item">
                  <span className="detail-label">Здоровье:</span>
                  <span className="detail-value">{selectedPet.health}</span>
                </div>
                
                <div className="detail-item">
                  <span className="detail-label">Стерилизован:</span>
                  <span className="detail-value">{selectedPet.sterilized ? "Да" : "Нет"}</span>
                </div>
                
                <div className="detail-item">
                  <span className="detail-label">Приучен к лотку:</span>
                  <span className="detail-value">{selectedPet.tray ? "Да" : "Нет"}</span>
                </div>
              </div>
              
              <div className="pet-description">
                <h4>Описание:</h4>
                <p>{selectedPet.description}</p>
              </div>
              
              <div className="modal-actions" >

                
              </div>
            </div>
          </div>
        </div>

        {/* Для мобильных экранов - картинка сверху, контент снизу */}
        <div className="d-block d-md-none">
          <div className="modal-pet-layout-vertical">
            <div className="modal-pet-image-top">
              <img src={selectedPet.photo} alt={selectedPet.name} />
            </div>
            
            <div className="modal-pet-details-bottom">
              <h2>{selectedPet.name}</h2>
              
              <div className="pet-details-grid">
                <div className="detail-item">
                  <span className="detail-label">Пол:</span>
                  <span className="detail-value">{selectedPet.gender}</span>
                </div>
                
                <div className="detail-item">
                  <span className="detail-label">Возраст:</span>
                  <span className="detail-value">{selectedPet.age}</span>
                </div>
                
                <div className="detail-item">
                  <span className="detail-label">Здоровье:</span>
                  <span className="detail-value">{selectedPet.health}</span>
                </div>
                
                <div className="detail-item">
                  <span className="detail-label">Стерилизован:</span>
                  <span className="detail-value">{selectedPet.sterilized ? "Да" : "Нет"}</span>
                </div>
                
                <div className="detail-item">
                  <span className="detail-label">Приучен к лотку:</span>
                  <span className="detail-value">{selectedPet.tray ? "Да" : "Нет"}</span>
                </div>
              </div>
              
              <div className="pet-description">
                <h4>Описание характера питомца:</h4>
                <p>{selectedPet.description}</p>
              </div>
              
              <div className="modal-actions">
                <CallCurator />
              
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)}


      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <div className="come_home">
          <img src={dog3} className="dog3"/>
          <StepCircles />
          <span className="one"><b>Поедем домой?</b></span>
          <span className="two">Выбери подходящего питомца</span>
          <span className="three">Позвони и договорись о встече</span>
          <span className="four">Приезжай знакомиться</span>
          <span className="five">Подготовься к новоселью</span>
          <span className="six">Привези нового друга домой</span>
               <PhoneModal />
        </div> 
      </div>

      <div className="love_help">
        <span id="href_help">ЛЮБИШЬ ПОМОГАТЬ?</span>
        <div className='pinki'></div>
        <img src={cat} className="cat"/>
        <div style={{position: "absolute", marginTop: "-32vw", marginLeft: "21vw"}}>

          <div className="one_love">
          <div className='flower'>
            <svg viewBox="0 0 112 111" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_3128_157)">
                <mask id="mask0_3128_157" style={{maskType:"luminance", maskUnits:"userSpaceOnUse", x:"0", y:"0", width:"112", height:"111"}}>
                  <path d="M0.772949 0.321899H111.144V110.693H0.772949V0.321899Z" fill="white"/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M66.9454 23.1011L66.644 23.4322C66.2526 23.8612 65.8564 24.2858 65.4554 24.7057L64.8271 23.8779C63.5196 22.1799 62.4159 20.9319 61.2316 19.93C59.6099 18.5631 57.9204 17.7354 55.9592 17.7354C54.8979 17.7354 53.8918 17.9943 52.9452 18.457C50.8736 19.4588 49.3369 21.1356 47.2865 24.0011L46.7771 24.7227C46.3894 24.3435 45.9366 23.8808 45.4187 23.3346L45.1343 23.0374C42.7825 20.5668 42.1585 19.9385 41.1057 19.081C40.1124 18.2702 39.2167 17.7226 38.113 17.4509C36.941 17.1419 35.6956 17.2879 34.6269 17.8596C33.5583 18.4314 32.7457 19.3864 32.3524 20.5328C31.1116 23.9729 30.4809 27.6031 30.4888 31.2601C30.4888 47.9856 39.8789 59.7529 55.9592 59.7529C72.0395 59.7529 81.4295 47.9899 81.4295 31.2601C81.4361 27.6029 80.804 23.9726 79.5617 20.5328C79.1667 19.3852 78.3514 18.43 77.2801 17.8597C76.2087 17.2893 74.961 17.1463 73.7884 17.4594C72.6762 17.7438 71.7933 18.3042 70.8169 19.1362C69.7981 19.9937 69.225 20.605 66.9454 23.1011ZM55.9592 51.2628C45.0409 51.2628 38.979 43.6642 38.979 31.2601C38.979 30.496 39.0143 29.7418 39.0851 28.9975L39.2846 29.2013C41.0166 31.0181 42.0863 32.0539 43.1901 32.9029C45.9409 35.0085 48.7256 35.8278 51.2726 32.9157C51.7311 32.3935 52.1811 31.8035 52.7839 30.9502L53.1023 30.4917L54.1932 28.9423C54.9361 27.898 55.5602 27.1297 56.0144 26.65C56.7717 27.4014 57.4713 28.2088 58.1072 29.0654C57.9162 28.8192 60.442 32.194 61.0787 32.9157C63.6343 35.8405 66.453 34.9958 69.1401 32.8732C70.2014 32.0242 71.2287 30.9927 72.8545 29.2225C72.9111 29.8989 72.9394 30.5781 72.9394 31.2601C72.9394 43.6684 66.8775 51.2628 55.9592 51.2628Z" fill="black"/>
                  <path d="M51.7139 59.7529C51.7139 58.627 52.1611 57.5473 52.9572 56.7512C53.7533 55.9551 54.8331 55.5078 55.9589 55.5078C57.0848 55.5078 58.1645 55.9551 58.9606 56.7512C59.7567 57.5473 60.204 58.627 60.204 59.7529V87.3457C60.204 88.4716 59.7567 89.5514 58.9606 90.3475C58.1645 91.1436 57.0848 91.5908 55.9589 91.5908C54.8331 91.5908 53.7533 91.1436 52.9572 90.3475C52.1611 89.5514 51.7139 88.4716 51.7139 87.3457V59.7529Z" fill="black"/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M63.461 68.3065C54.1855 76.092 48.0854 85.9872 53.1115 91.977C58.0612 97.8776 71.7049 94.6429 79.8341 87.8168C87.7639 81.1648 91.3807 71.537 86.4395 65.6491C81.4982 59.7612 71.3907 61.6503 63.461 68.3065ZM59.8654 86.6791C59.812 86.6589 59.7608 86.6333 59.7126 86.6027L59.789 86.7301C59.8201 86.7584 59.8456 86.7414 59.8654 86.6791ZM74.375 81.3134C69.6715 85.2613 61.5804 87.3499 59.8654 86.6791L59.8951 86.5518C60.0564 85.7495 60.5573 84.6118 61.3724 83.2873C63.0874 80.5026 65.9443 77.3061 68.9201 74.81C73.734 70.7687 78.8493 69.8135 79.936 71.1083C81.0228 72.403 79.1931 77.2721 74.375 81.3134Z" fill="black"/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M47.1805 68.3065C56.4602 76.092 62.5561 85.9872 57.53 91.977C52.5802 97.8776 38.9409 94.6429 30.8116 87.8168C22.8776 81.1648 19.265 71.537 24.2063 65.6491C29.1475 59.7612 39.2508 61.6503 47.1805 68.3065ZM50.7803 86.6791L50.9289 86.6027L50.8525 86.7301C50.8214 86.7584 50.7973 86.7414 50.7803 86.6791ZM36.2622 81.3176C40.9658 85.2655 49.0611 87.3541 50.7761 86.6834L50.7464 86.556C50.5851 85.7537 50.0841 84.616 49.2691 83.2916C47.5498 80.5068 44.6972 77.3103 41.7214 74.8142C36.9032 70.7729 31.7879 69.8178 30.7055 71.1125C29.623 72.4073 31.4483 77.2763 36.2665 81.3176" fill="black"/>
                </mask>
                <g mask="url(#mask0_3128_157)">
                  <path d="M55.9587 110.693C86.4369 110.693 111.144 85.9859 111.144 55.5076C111.144 25.0294 86.4369 0.321899 55.9587 0.321899C25.4804 0.321899 0.772949 25.0294 0.772949 55.5076C0.772949 85.9859 25.4804 110.693 55.9587 110.693Z" fill="#4D4F50"/>
                </g>
              </g>
              <defs>
                <clipPath id="clip0_3128_157">
                  <rect width="110.371" height="110.371" fill="white" transform="translate(0.772949 0.321899)"/>
                </clipPath>
              </defs>
            </svg>
          </div>
            

            <div className={`bloop_love_1 ${!showAllPets ? 'd-none d-md-block' : ''}`}>
              <svg width="15vw" height="19vw" viewBox="0 0 309 349" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M67.9392 13.0693C128.544 41.7294 184.015 26.2951 223.699 4.43077C244.995 -7.302 279.588 10.2075 277.159 34.3995L262.109 184.329C261.664 188.767 262.412 193.243 264.278 197.294L306.473 288.925C309.485 295.465 309.585 303.164 306.203 309.521C246.41 421.912 144.645 252.984 90.7498 258.264C81.8359 259.137 72.2079 262.458 65.1427 256.953C1.20985 207.139 -43.1718 -39.4748 67.9392 13.0693Z" fill="#FCDEC2"/>
              </svg>
            </div>

            <div className={`bloop_love_1_2 ${!showAllPets ? 'd-md-none d-block' : ''}`}>
              <svg width="60vw" height="50vw" viewBox="0 0 217 88" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M64.8526 9.93705C144.009 7.36275 178.817 2.99789 193.353 0.320034C198.403 -0.610259 204.039 2.65729 205.188 7.66183L216.721 57.889C218.084 63.8231 212.654 69.1035 206.674 67.9588C139.996 55.1943 148.638 92.1825 64.8526 86.6323C20.2107 81.5593 -55.2725 13.8437 64.8526 9.93705Z" fill="#FCDEC2"/>
              </svg>
            </div>
           
              <span className="volont"><b>Стань волонтером</b></span>
              <span className="vol">Твоя поддержка подарит шанс бездомным животным на лучшее будущее</span>

          </div>

          <div className="two_love">
            <div className='present_svg'>
              <svg viewBox="0 0 112 111" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_3128_145)">
                  <mask id="mask0_3128_145" style={{maskType:"luminance", maskUnits:"userSpaceOnUse", x:"0", y:"0", width:"112", height:"111"}}>
                    <path d="M0.972168 0.322021H111.344V110.694H0.972168V0.322021Z" fill="white"/>
                    <path d="M51.9126 42.7726H60.4027V89.4682H51.9126V42.7726Z" fill="black"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M57.6692 42.7641C61.8209 37.9884 58.6116 28.1824 53.0633 23.3642C47.6339 18.6352 40.0267 17.7692 35.909 22.5025C31.7913 27.2357 33.7143 34.6561 39.1438 39.3766C45.4264 44.8357 53.352 47.7308 57.6734 42.7599M51.2761 37.1734C51.4382 36.9835 51.6455 36.8375 51.8789 36.7489C51.6688 36.7319 51.4602 36.6992 51.2549 36.6512C51.3058 36.9272 51.3101 37.1182 51.2634 37.1861L51.2761 37.1734ZM44.7048 32.9708C46.3519 34.4014 48.4701 35.7046 50.2318 36.3456C50.6196 36.4871 50.9592 36.589 51.2507 36.6512C50.996 35.2376 49.5357 31.5487 47.4895 29.77C45.1972 27.7748 42.8072 27.5031 42.3106 28.0762C41.8097 28.6493 42.4125 30.9798 44.7048 32.9708Z" fill="black"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M55.6739 42.7636C51.5223 37.9879 54.7315 28.1818 60.2756 23.3637C65.7093 18.6389 73.3206 17.7729 77.4341 22.5062C81.5518 27.2394 79.633 34.6598 74.2036 39.3803C67.9209 44.8394 59.9954 47.7345 55.6739 42.7636ZM62.0585 37.1728C61.8976 36.9835 61.6918 36.8376 61.46 36.7483C61.5831 36.7398 61.8081 36.7101 62.084 36.6507C62.033 36.9266 62.0288 37.1177 62.0755 37.1856L62.0585 37.1728ZM68.6299 32.9702C66.987 34.4008 64.8687 35.704 63.1113 36.3451C62.7756 36.4685 62.4325 36.5705 62.084 36.6507C62.3387 35.2371 63.799 31.5481 65.8451 29.7695C68.1374 27.7743 70.5274 27.5026 71.0241 28.0757C71.525 28.6488 70.9222 30.9793 68.6299 32.9702Z" fill="black"/>
                    <path d="M85.8737 59.7527V68.2428H26.4429V59.7527H85.8737Z" fill="black"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M26.4423 38.5276H85.8731C86.999 38.5276 88.0787 38.9748 88.8748 39.7709C89.6709 40.567 90.1182 41.6468 90.1182 42.7726V89.4683C90.1182 90.5941 89.6709 91.6739 88.8748 92.47C88.0787 93.2661 86.999 93.7133 85.8731 93.7133H26.4423C25.3165 93.7133 24.2367 93.2661 23.4406 92.47C22.6445 91.6739 22.1973 90.5941 22.1973 89.4683V42.7726C22.1973 41.6468 22.6445 40.567 23.4406 39.7709C24.2367 38.9748 25.3165 38.5276 26.4423 38.5276ZM81.6281 85.2232V47.0177H30.6874V85.2232H81.6281Z" fill="black"/>
                  </mask>
                  <g mask="url(#mask0_3128_145)">
                    <path d="M56.1579 110.694C86.6362 110.694 111.344 85.986 111.344 55.5078C111.344 25.0295 86.6362 0.322021 56.1579 0.322021C25.6797 0.322021 0.972168 25.0295 0.972168 55.5078C0.972168 85.986 25.6797 110.694 56.1579 110.694Z" fill="#4D4F50"/>
                  </g>
                </g>
                <defs>
                  <clipPath id="clip0_3128_145">
                    <rect width="110.371" height="110.371" fill="white" transform="translate(0.972168 0.322021)"/>
                  </clipPath>
                </defs>
              </svg>
            </div>
            

            <div className={`bloop_love_2 ${!showAllPets ? 'd-none d-md-block' : ''}`}>
              <svg width="15vw" height="21vw"  viewBox="0 0 344 411" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M102.612 30.7457C177.741 23.158 227.661 12.4093 260.568 2.17656C282.866 -4.75735 324.83 17.199 326.552 40.4868L343.845 274.362C345.444 295.991 319.83 308.747 298.613 304.256C222.964 288.242 221.922 432.729 102.612 408.185C31.8668 383.22 -87.7529 49.9716 102.612 30.7457Z" fill="#FCDEC2"/>
              </svg>
            </div>

            <div className={`bloop_love_2_2 ${!showAllPets ? 'd-md-none d-block' : ''}`}>
              <svg width="60vw" height="50vw" viewBox="0 0 192 79" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M43.3454 8.05415C95.4923 16.2112 141.619 7.26884 164.713 1.12784C171.203 -0.59778 177.559 5.62215 175.609 12.0476L167.219 39.6941C166.212 43.0127 167.429 46.6044 170.246 48.6277L187.967 61.357C192.422 64.5578 192.414 71.1697 187.369 73.327C146.259 90.9083 81.0397 53.3072 51.0673 60.0714C50.0228 60.3071 48.9665 60.4164 47.9064 60.2655C4.35413 54.0672 -30.437 -3.48721 43.3454 8.05415Z" fill="#FCDEC2"/>
              </svg>
            </div>            
            

            <span className="present"><b>Сделай пожертвование</b></span>
            <span className="pres">Каждое ваше пожертвование помогает спасти, вылечить и найти дом для бездомных животных</span>

          </div>

          <div className="three_love">
            <div className='home_svg'>
              <svg viewBox="0 0 112 111" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_3128_143)">
                  <path d="M55.8532 0.322144C25.375 0.322144 0.66748 25.0296 0.66748 55.5079C0.66748 85.9861 25.375 110.694 55.8532 110.694C86.3315 110.694 111.039 85.9861 111.039 55.5079C111.039 25.0296 86.3315 0.322144 55.8532 0.322144ZM55.8532 25.7526L82.7994 46.6965V85.2632H64.2604V61.9817H47.446V85.2632H28.907V46.6965L55.8532 25.7526Z" fill="#4D4F50"/>
                </g>
                <defs>
                  <clipPath id="clip0_3128_143">
                    <rect width="110.371" height="110.371" fill="white" transform="translate(0.66748 0.322144)"/>
                  </clipPath>
                </defs>
              </svg>
            </div>
            

            <div className={`bloop_love_3 ${!showAllPets ? 'd-none d-md-block' : ''}`}>
              <svg width="16vw" height="21vw" style={{ marginTop:"-4.5vw"}} viewBox="0 0 331 263" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M70.686 64.4977C72.5007 49.5069 75.9768 30.1494 89.5793 23.593C152.354 -6.66425 212.673 -0.848876 237.861 3.64247C245.681 5.03682 251.821 10.7175 254.59 18.1623L275.145 73.4219C278.583 82.6643 273.331 92.8616 263.81 95.43C247.536 99.8203 247.212 122.793 263.357 127.64L312.672 142.444C326.048 146.46 333.548 160.648 329.332 173.962L316.127 215.66C313.445 224.132 306.344 230.592 297.658 232.472C126.058 269.611 217.142 215.399 27.771 261.774C24.5979 262.551 20.9819 262.828 17.8245 261.99C-40.7159 246.447 63.0285 127.756 70.686 64.4977Z" fill="#FCDEC2"/>
              </svg>
            </div>

            <div className={`bloop_love_3_2 ${!showAllPets ? 'd-md-none d-block' : ''}`}>
              <svg width="70vw" height="50vw" viewBox="0 0 207 55" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M31.2717 26.2218C37.9455 21.8325 60.3807 4.4838 68.305 3.47715C109.186 -1.7161 146.317 0.474232 156.268 1.22261C157.966 1.35034 159.558 2.04396 160.834 3.17242L172.35 13.3607C174.741 15.4757 173.441 19.4245 170.262 19.7067C165.864 20.0972 165.832 26.514 170.226 26.9481L200.398 29.9289C205.784 30.461 208.183 36.9705 204.43 40.8705L199.909 45.5684C198.537 46.9948 196.578 47.8734 194.604 48.0183C77.4599 56.6202 141.126 44.5176 15.2704 54.779C-16.7109 53.2144 11.8316 39.0074 31.2717 26.2218Z" fill="#FCDEC2"/>
              </svg>
            </div> 

            <span className="pet_home"><b>Забери питомца в семью</b></span>
            <span className="PH">Каждый хвостик мечтает о доме, и, возможно, именно ты станешь для него самым родным человеком</span>
          </div>

        </div>
      </div>

      {/* НОВОСТИ */}
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <span className="dream_home">ПОСЛЕДНИЕ НОВОСТИ И СОБЫТИЯ</span>
      </div>

      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}} id="href_number">
        <div className="pink"></div>
        <img src={pinkpets} className="pets"/>
        <span className="your"><b>Ваш вклад спасает жизни – не откладывайте добро на потом!</b></span>

        <div className='CardBloop'>
          <svg viewBox="0 0 520 208" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M69.2694 193.054C44.9297 195.278 4 170.262 4 145.82V120.986L1.64539 102.149C-5.06921 48.4325 36.8156 0.98616 90.9504 0.98616L238.082 0.98616C239.694 0.98616 241.148 0.95018 242.758 0.87764C269.225 -0.314957 519.5 -9.41354 519.5 72.9862C519.5 100.677 471.921 182.57 413.456 204.929C387.008 215.044 234.619 196.889 206.33 195.648C161.567 193.683 110.205 189.313 69.2694 193.054Z" fill="#FFEDE1"/>
          </svg>
        </div>
        

        <span className="hN"><b>Номера счетов</b></span>
        {/* <div className="cart"> */}
          <p className='cart'>Карта:</p>
          <p className='cart2'>Счёт:</p>
        {/* </div> */}
        
        <div className='NBloop'>
          <svg viewBox="0 0 600 220" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M485.93 209.668C414.553 196.953 174.521 210.471 47.0804 218.931C6.60448 221.618 -13.2042 189.389 10.7235 156.167C16.6906 147.882 23.4506 138.626 31.1083 128.289C39.1021 117.498 43.5071 104.605 45.1635 91.5845C46.6345 80.021 48.9298 66.1077 51.4245 52.2858C57.6742 17.6592 93.4056 -4.88216 127.997 1.27819C210.393 15.9519 361.298 34.8184 512.795 12.749C515.746 12.3191 518.749 12.3143 521.589 13.0164C613.837 35.8166 649.786 238.859 485.93 209.668Z" fill="#FFEDE1"/>
          </svg>
        </div>
        
        <span className="KN"><b>Добрые телефоны</b></span>
      </div>

      <YandexMapContainer />

      <Footer/>
    </div>
  );
}

export default App;
