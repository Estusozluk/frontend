import React from 'react'
import './Popup.css'

const Popup = (props) => {


  return (props.trigger == true) ? (
   
    <div>
      {props.children}
    </div>
  ) : ""
}

export default Popup
