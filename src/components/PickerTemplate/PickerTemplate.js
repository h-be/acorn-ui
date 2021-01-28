import React from 'react'
import './PickerTemplate.css'

import Icon from '../Icon/Icon'

export default function PickerTemplate ({
  className,
  children,
  heading,
  onClose,
}) {
  return (
    <div className={`${className} picker-popup`}>
      <Icon
        className='vertical_action_close'
        name='x.svg'
        size='very-small-close'
        className='grey'
        onClick={() => onClose()}
      />
      <div className='picker-popup-heading'>{heading}</div>
      {children}
    </div>
  )
}
