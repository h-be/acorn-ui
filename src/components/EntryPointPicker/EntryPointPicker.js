import React, { useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import { connect } from 'react-redux'

import './EntryPointPicker.css'

import PickerTemplate from '../PickerTemplate/PickerTemplate'
import Icon from '../Icon/Icon'
import selectEntryPoints from '../../projects/entry-points/select'

function EntryPointPickerItem({ entryPoint }) {
  const dotStyle = {
    backgroundColor: entryPoint.color,
  }
  return (
    <li className='entry-point-picker-item'>
      <div className='entry-point-picker-dot' style={dotStyle}></div>
      <div className='entry-point-picker-name'>{entryPoint.content}</div>
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
  )
}

function EntryPointPicker({ entryPoints, isOpen, onClose }) {
  const [filterText, setFilterText] = useState('')

  // filter people out if there's filter text defined, and don't bother case matching
  const filteredEntryPoints = entryPoints.filter(entryPoint => {
    return (
      !filterText ||
      entryPoint.content.toLowerCase().indexOf(filterText.toLowerCase()) > -1
    )
  })

  return (
    <CSSTransition
      in={isOpen}
      timeout={100}
      unmountOnExit
      classNames='entry-point-picker-wrapper'>
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
        <ul className='entry-point-picker-list'>
          {filteredEntryPoints.map(entryPoint => (
            <EntryPointPickerItem
              key={entryPoint.address}
              entryPoint={entryPoint}
            />
          ))}
          {/* Entry Points Empty State */}
          {entryPoints.length === 0 && (
            <li className='entry-points-empty-state-content'>
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
            </li>
          )}
        </ul>
        <img
          className='entry-point-picker-pointer'
          src='img/popup-curved-pointer-downside.svg'
        />
      </PickerTemplate>
    </CSSTransition>
  )
}

function mapStateToProps(state) {
  const {
    ui: { activeProject },
  } = state
  const combinedEntryPoints = selectEntryPoints(state, activeProject)
  return {
    entryPoints: combinedEntryPoints,
  }
}

function mapDispatchToProps(dispatch) {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(EntryPointPicker)
