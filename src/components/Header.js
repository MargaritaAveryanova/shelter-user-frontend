import React from 'react'

export default function header() {
  return (
    <header>
        <div className='container-fluid text-center'>
            <div className='row justify-content-sm-end flex-nowrap justify-content-center overflow-auto hed' style={{paddingRight:"0px"}}>
              <a className='col-auto text-nowrap'>О нас</a>
              <a className='col-auto text-nowrap' href='#dream'>Мечтают о доме</a>
              <a className='col-auto text-nowrap' href='#href_help'>Как помочь</a>
              <a className='col-auto text-nowrap' href='#href_number'>Контакты</a>
            </div>
            <svg 
              className="header-blob" 
              viewBox="0 0 500 80" 
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg">
              <path  
                fill="#FCDEC2"
                d="M0,80 C100,80 150,-10 250,30 C350,70 400,20 500,50 L500,0 L0,0 Z"
              />
            </svg>
        </div>
    </header>
  )
}
