import React from 'react'
import vk from '../img/vk.jpg';
import tg from '../img/tg.jpg';

export default function footer() {
  return (
    <footer>
      <div className='container'>
        <div className='row footer_row'>
          <div className=' col-12 col-md-4'>
            2001-2025 Все права защищены
          </div>
          <div className='col-12 col-md-3'>
            Контакты +7 ХХХ ХХХ ХХ ХХ
          </div>
          <div className='col-md-3 d-none d-md-block' style={{padding:"0px"}}>
            <div style={{padding:"0px"}}>Наши социальные сети</div>
          </div>  
          <div className='col-12 col-md-1 p-md-1 p-0'>
            <button><img src={vk} className="vk"/></button>
            <button><img src={tg} className="tg"/></button>
          </div>
        </div>
      </div>
      

    </footer>
  )
}
