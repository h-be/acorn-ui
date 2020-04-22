import React, { useState } from 'react'
import { connect } from 'react-redux'
import './Preferences.css'

import Icon from '../Icon/Icon'
import Button from '../Button/Button'

export default function Preferences() {
  return (
    <div className='preferences-content-wrapper'>
      <div className='preferences-title'>Preferences</div>
      <div className='preferences-section'>
        <div className='preferences-section-title-wrapper'>
          <Icon
            name='panning.svg'
            size='very-small'
            className='not-hoverable'
          />
          <div className='preferences-section-title'>Navigation Mode</div>
        </div>
        <div className='preferences-section-subtitle'>
          Select your preferred navigation mode on canvas based on your primary
          pointer device{' '}
        </div>
        <div className='navigation-mode-options-wrapper'>
          <div className='navigation-mode-option'>
            <div className='navigation-mode-option-content'>
              <div className='navigation-mode-option-icon-trackpad'>
                <Icon
                  name='trackpad.svg'
                  size='large'
                  className='not-hoverable'
                />
              </div>
              <div className='navigation-mode-option-text'>Trackpad</div>
            </div>
          </div>
          <div className='navigation-mode-option'>
            <div className='navigation-mode-option-content'>
              <div className='navigation-mode-option-icon-mouse'>
                <Icon name='mouse.svg' size='large' className='not-hoverable' />
              </div>
              <div className='navigation-mode-option-text'>Mouse</div>
            </div>
          </div>
        </div>
        <div className='navigation-mode-description-wrapper'>
          <div className='navigation-mode-description-title-wrapper'>
            <div className='navigation-mode-description-icon'>
              <Icon
                name='zooming.svg'
                size='very-small'
                className='not-hoverable'
              />
            </div>
            <div className='navigation-mode-description-title'>Zooming</div>
          </div>
          <div className='navigation-mode-description-text'>
            Pinch in and out, or hold cmd/ctrl + scroll wheel
          </div>
        </div>
        <div className='navigation-mode-description-wrapper'>
          <div className='navigation-mode-description-title-wrapper'>
            <div className='navigation-mode-description-icon'>
              <Icon
                name='panning.svg'
                size='very-small'
                className='not-hoverable'
              />
            </div>
            <div className='navigation-mode-description-title'>Panning</div>
          </div>
          <div className='navigation-mode-description-text'>
            Slide on trackpad with two fingers, or click and drag with mouse
          </div>
        </div>
      </div>
      <div className='preferences-save-button'>
        <Button onClick='' text='Save Changes' />
      </div>
    </div>
  )
}
