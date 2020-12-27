import React from 'react'
import { CSSTransition } from 'react-transition-group'
import './UpdateBar.css'

import Icon from '../Icon/Icon'

export default function UpdateBar({ active, onClose }) {
  return (
    <CSSTransition
      in={active}
      timeout={400}
      unmountOnExit
      classNames='update-bar'>
      <div className='update-bar-wrapper'>
        <span>A new version of Acorn is available. </span>
        <a className='update-bar-link'>Update to the new version now.</a>
        <div className='update-bar-close'>
          <Icon
            name='x-bold.svg'
            size='small-close'
            className='white'
            onClick={() => onClose()}
          />
        </div>
      </div>
    </CSSTransition>
  )
}
