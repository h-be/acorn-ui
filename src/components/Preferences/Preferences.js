import React, { useState } from 'react'
import { connect } from 'react-redux'
import './Preferences.css'

import Icon from '../Icon/Icon'

export default function Preferences() {
  return (
    <div className='preferences-content-wrapper'>
      <div className='preferences-title'>Preferences</div>
      <div className='preferences-section'>
        <div className='preferences-section-title-wrapper'>
          <Icon name='panning.svg' size='small' className='grey' />
          Navigation Mode
        </div>
        <div className='preferences-section-subtitle'>
          Select your preferred navigation mode on canvas based on your primary
          pointer device{' '}
        </div>
        <div className='navigation-mode-options-wrapper'>
          <div className='navigation-mode-option'>
            <div className='navigation-mode-option-icon'>
              <Icon name='trackpad.svg' size='large' className='' />
            </div>
            <div className='navigation-mode-option-text'>Trackpad</div>
          </div>
          <div className='navigation-mode-option'>
            <div className='navigation-mode-option-icon'>Icon</div>
            Mouse
          </div>
        </div>
        <div className='navigation-mode-description-wrapper'>
          <div className='navigation-mode-description-title-wrapper'>
            <div className='navigation-mode-description-icon'>icon</div>
            <div className='navigation-mode-description-title'>Zooming</div>
          </div>
          <div className='navigation-mode-description-text'>
            Pinch in and out, or hold cmd/ctrl + scroll wheel
          </div>
        </div>
        <div className='navigation-mode-description-wrapper'>
          <div className='navigation-mode-description-title-wrapper'>
            <div className='navigation-mode-description-icon'>icon</div>
            <div className='navigation-mode-description-title'>Panning</div>
          </div>
          <div className='navigation-mode-description-text'>
            Slide on trackpad with two fingers, or click and drag with mouse
          </div>
        </div>
      </div>
    </div>
  )
}
