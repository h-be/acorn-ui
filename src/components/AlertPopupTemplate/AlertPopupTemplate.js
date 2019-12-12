import React from 'react'

import Icon from '../Icon/Icon'
import Button from '../Button/Button'

import './AlertPopupTemplate.css'

export default function AlertPopupTemplate({
  className,
  content,
  heading,
  popupIcon,
  onClose,
  primaryButton,
  primaryButtonAction,
  altButton,
  altButtonAction,
}) {
  return (
    <div className='alert-popup'>
      <div className={`${className} alert-popup-wrapper`}>
        <Icon
          name='x_a3a3a3.svg'
          size='small-close'
          className='grey'
          onClick={() => onClose()}
        />
        <div className='alert-popup-iconANDheading'>
          <span className='popup-icon'>
            <Icon name={popupIcon} />
          </span>
          <div className='alert-popup-heading'>{heading}</div>
        </div>
        <div className='popup-content'>
          <p>{content}</p>
        </div>
        <div className='popup-footer'>
          <div className='check-no-show-again'>
            <input type='checkbox' />
            <label htmlFor=''>Don't show me again</label>
          </div>
          <div className='buttons-wrapper'>
            <div className='btn-stroked'>
              {<Button text={altButton} onClick={altButtonAction} stroke size='medium'/>}
            </div>
            <div className='btn-filled'>
              <Button text={primaryButton} onClick={primaryButtonAction} size='medium' />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
