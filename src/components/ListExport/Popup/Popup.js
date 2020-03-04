import React from 'react'
import './popup.css'
import Icon from '../../Icon/Icon'
import Button from '../../Button/Button'

export default function Popup({ active, handleToHide }) {
  return (
    <div className={'popup ' + (active ? 'active' : '')}>
      <div className='popup-window'>
        <Icon
          name='x.svg'
          onClick={handleToHide}
          className='btn-close-modal grey'
        />
        <div className='popup-header'>
          <span className='popup-logo'>
            <Icon name='export.svg' />
          </span>
          <span className='popup-title'>Exporting</span>
        </div>
        <div className='popup-content'>
          <p>
            You just exported the <b>Acorn State of Affairs</b> canvas. You will
            be able to find it in your Downloads folder!
          </p>
        </div>
        <div className='popup-footer'>
          {/* TODO: enable "don't show me again" (persist to Holochain or localStorage) */}
          {/* <div className='check-no-show-again'>
            <input type='checkbox' />
            <label htmlFor=''>Don't show me again</label>
          </div> */}
          <div className='btn-accept'>
            <Button text='OK' onClick={handleToHide} />
          </div>
        </div>
      </div>
    </div>
  )
}
