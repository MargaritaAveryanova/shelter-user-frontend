import React from 'react'

export default function header() {
  return (
    <header>
        <div className='container-fluid text-center'>
            <div className='row justify-content-sm-end flex-nowrap justify-content-center overflow-auto hed' style={{paddingRight:"0px"}}>
              <a className='col-auto text-nowrap' href='#dream'>Мечтают о доме</a>
              <a className='col-auto text-nowrap' href='#href_help'>Как помочь</a>
              <a className='col-auto text-nowrap' href='#href_number'>Контакты</a>
            </div>
            <svg className="header-blob" viewBox="0 0 254 100" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M132.164 4.25196C175.126 4.25196 206.793 4.25196 228.861 4.25196C247.62 4.25196 259.696 24.1314 251.064 40.7863L243.901 54.6054C241.439 59.3563 237.518 63.1926 232.715 65.5511L167.678 97.4848C158.76 101.863 148.154 100.339 140.117 94.4994C92.1791 59.6686 109.906 114.369 19.4724 82.7972C12.0009 80.1888 6.29031 73.8246 4.50089 66.1158C-16.465 -24.2044 37.4511 4.25196 132.164 4.25196Z" fill="var(--biege-block)"/>
</svg>

        </div>
    </header>
  )
}
