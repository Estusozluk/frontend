import React from 'react'
import './Popup.css'

const Popup = (props) => {
  return (props.trigger == true) ? (
    <div className='modal'>

        <div className='overlay'>
            <div className='modalContent'>
                <h2>{props.title}</h2>
                <input type="text" placeholder='entry giriniz...' />
                <button className='closeModal'>Close</button>
            </div>
        </div>
      
    </div>
  ) : ""
}

export default Popup
