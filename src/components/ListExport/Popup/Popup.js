import React from 'react'
import './popup.css'

export default function Popup({ active, handleToHide },props){
  return(
    <div className={'popup ' + (active ? 'active' : '')}>
      <div className='popup-window'>
      <button onClick={handleToHide} className='btn-close-modal'>
        <img src="/img/x.svg"/>
      </button>
        <div className="popup-header">
          <span className="popup-logo">
            <img src="/img/export.svg" />
          </span>
          <span className="popup-title">Exporting</span>
        </div>
        <div className="popup-content">
          <p>
            You just exported the <b>H-BE SoA</b> canvas a JSON file. 
            You will be able to find it in your Downloads folder!
          </p>
        </div>
        <div className="popup-footer">
          <div className="check-no-show-again">
            <label htmlFor="">Dont't show me again</label>
            <input type="checkbox"/>
          </div>
          <button className="btn-accept">
            OK
          </button>
        </div>
      </div>
    </div>
  )
}