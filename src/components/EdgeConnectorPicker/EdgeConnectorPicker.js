import React from 'react'
import { CSSTransition } from 'react-transition-group'
import PropTypes from 'prop-types'

import './EdgeConnectorPicker.css'

import PickerTemplate from '../PickerTemplate/PickerTemplate'
import { Select, Option } from '../Select/Select'

import Icon from '../Icon/Icon'
import Button from '../Button/Button'

export default function EdgeConnectorPicker({ onClose, onClickOutside }) {
  const isOpen = true

  const card = {
    address: '123',
    content:
      ' Hell this is a card long Hell this is a card long Hell this is a card long',
  }

  const card1 = {
    address: '1234',
    content:
      ' yay Hell this is a card long Hell this is a card long Hell this is a card long',
  }

  const cardsAsCount = selected => {
    return selected.length === 1 ? `1 card` : `${selected.length} cards`
  }
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
          {/* Connect */}
          <div className='edge-connector-dropdown-wrapper'>
            <label for='connect'>Connect</label>

            <Select
              multiple
              onChange={selected => {}}
              toggleLabel={cardsAsCount}>
              <Option value={card1.address} label={card1.content} />
              <Option value={card.address} label={card.content} />
              <Option value={card.address} label={card.content} />
            </Select>
          </div>
          {/* As */}
          <div className='edge-connector-dropdown-wrapper'>
            <label for='connection-type'>As</label>

            <Select
              onChange={selected => {}}
              toggleLabel={selected => {
                return selected[0] === 'parent' ? 'Parent' : 'Child'
              }}>
              <Option default value='parent' label='Parent' />
              <Option value='child' label='Child' />
            </Select>
          </div>
          {/* To */}
          <div className='edge-connector-dropdown-wrapper'>
            <label for='To'>To</label>

            <Select
              multiple
              onChange={selected => {}}
              toggleLabel={cardsAsCount}>
              <Option value={card.address} label={card.content} />
              <Option value={card.address} label={card.content} />
              <Option value={card.address} label={card.content} />
            </Select>
          </div>
          <div className='edge-connector-buttons'>
            <Button text='Preview' size='small' className='green' stroke />
            <Button text='Save Changes' size='small' className='purple' />
          </div>
        </div>
      </PickerTemplate>
    </CSSTransition>
  )
}

EdgeConnectorPicker.propTypes = {
  onClose: PropTypes.func.isRequired,
}
