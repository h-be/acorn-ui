import React from 'react'
import { CSSTransition } from 'react-transition-group'
import PropTypes from 'prop-types'

import './EdgeConnectorPicker.css'

import PickerTemplate from '../PickerTemplate/PickerTemplate'
import Icon from '../Icon/Icon'
import Button from '../Button/Button'

export default function EdgeConnectorPicker({ onClose }) {
  const isOpen = true
  return (
    <CSSTransition
      in={isOpen}
      timeout={100}
      unmountOnExit
      classNames='edge-connector-picker-wrapper'>
      <PickerTemplate
        className='edge-connector-picker'
        heading='connect'
        onClose={onClose}>
        <div className='edge-connector-content'>
          <div className='edge-connector-dropdown-wrapper'>
            <label for='connect'>Connect</label>
            <select name='from-cards' id='from-cards'>
              <option value='card1'>card1</option>
              <option value='card2'>card2</option>
              <option value='card3'>card3</option>
            </select>
          </div>
          <div className='edge-connector-dropdown-wrapper'>
            <label for='connection-type'>As</label>
            <select name='connection-type' id='connection-type'>
              <option value='parent'>parent</option>
              <option value='child'>parent</option>
            </select>
          </div>
          <div className='edge-connector-dropdown-wrapper'>
            <label for='To'>To</label>
            <select name='to-cards' id='to-cards'>
              <option className='edge-connector-dropdown-option' value='card4'>
                card4
              </option>
              <option value='card5'>card5</option>
            </select>
          </div>
        </div>
      </PickerTemplate>
    </CSSTransition>
  )
}

EdgeConnectorPicker.propTypes = {
  onClose: PropTypes.func.isRequired,
}
