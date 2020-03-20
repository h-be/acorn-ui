import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import './EntryPointPicker.css'

import PickerTemplate from '../PickerTemplate/PickerTemplate'
import Icon from '../Icon/Icon'

function EntryPointPicker({ isOpen, onClose }) {
  const [filterText, setFilterText] = useState('')

  return (
    <div className={`entry-point-picker-wrapper ${isOpen ? 'active' : ''}`}>
      <PickerTemplate
        className='entry-point-picker'
        heading='entry points'
        onClose={onClose}>
        {/* Entry Point Picker Search */}
        <div className='entry-point-picker-search'>
          <Icon
            name='search.svg'
            size='very-small'
            className='grey not-hoverable'
          />
          <input
            type='text'
            onChange={e => setFilterText(e.target.value)}
            value={filterText}
            placeholder='search entry points...'
            autoFocus
          />
          {filterText !== '' && (
            <button
              onClick={() => {
                setFilterText('')
              }}
              className='clear-button'>
              clear
            </button>
          )}
        </div>
        <div className='entry-point-picker-spacer' />
        <div className='entry-point-picker-list'>
          {/* TODO : make this entry points list dynamic and connected to backend */}
          <li className='entry-point-picker-item'>
            {/* TODO : The colored dot below needs to be a randomized color set upon creation of the entry point */}
            <div className='entry-point-picker-dot'></div>
            <div className='entry-point-picker-name'>
              We have released Acorn 4.0.0
            </div>
            <Icon
              name='enter.png'
              size='small'
              className='grey entry-point-picker-switch'
            />
            <Icon
              name='radio-button.svg'
              size='small'
              className='light-grey radio-button'
            />
            {/* {entryPoint.is_selected && (
                  <Icon
                    name='radio-button-checked.svg'
                    size='small'
                    className='purple radio-button'
                  />
                )} */}
          </li>

          <li className='entry-point-picker-item'>
            {/* TODO : The colored dot below needs to be a randomized color set upon creation of the entry point */}
            <div className='entry-point-picker-dot'></div>
            <div className='entry-point-picker-name'>
              We have released Acorn 4.0.0
            </div>
            <Icon
              name='enter.png'
              size='small'
              className='grey entry-point-picker-switch'
            />
            <Icon
              name='radio-button.svg'
              size='small'
              className='light-grey radio-button'
            />
            {/* {person.is_member && (
                  <Icon
                    name='radio-button-checked.svg'
                    size='small'
                    className='purple radio-button'
                  />
                )} */}
          </li>

          <li className='entry-point-picker-item'>
            {/* TODO : The colored dot below needs to be a randomized color set upon creation of the entry point */}
            <div className='entry-point-picker-dot'></div>
            <div className='entry-point-picker-name'>
              We have released Acorn 4.0.0
            </div>
            <Icon
              name='enter.png'
              size='small'
              className='grey entry-point-picker-switch'
            />
            <Icon
              name='radio-button.svg'
              size='small'
              className='light-grey radio-button'
            />
            {/* {person.is_member && (
                  <Icon
                    name='radio-button-checked.svg'
                    size='small'
                    className='purple radio-button'
                  />
                )} */}
          </li>
        </div>

        {/* Entry Points Empty State */}
        {/* <div className='entry-points-empty-state-content'>
          <img
            src='img/door-closed.png'
            className='entry-points-empty-state-image'
          />
          <div className='entry-points-empty-state-image-circle'></div>
          <span>
            You currently have no entry points for this project.{' '}
            <a className='entry-points-empty-state-content-link'>
              Learn how to create one
            </a>
            .
          </span>
        </div> */}
        <img
          className='entry-point-picker-pointer'
          src='img/popup-curved-pointer-downside.svg'
        />
      </PickerTemplate>
    </div>
  )
}

export default EntryPointPicker
