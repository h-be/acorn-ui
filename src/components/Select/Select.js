import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import useOnClickOutside from 'use-onclickoutside'
import { CSSTransition } from 'react-transition-group'

import './Select.css'

import Icon from '../Icon/Icon'

function Select({ onChange, multiple, children, toggleLabel }) {
  const defaultOption = children.find(option => {
    console.log(option)
    return option.props.default
  })
  // set a default from the options, if one is tagged as default in its props
  const [selected, setSelected] = useState(
    defaultOption ? [defaultOption.props.value] : []
  )
  const [selectOpen, setSelectOpen] = useState(false)

  const ref = useRef()
  useOnClickOutside(ref, () => setSelectOpen(false))

  const toggleSelectOption = ({ label, value }) => {
    return () => {
      /*
        If value is in Selected then remove value from selected,

        Else, add value into Selected. 

        If multiple, keep open. If not, turn SelectOpen false.
      */

      // in the case of single select
      if (!multiple) {
        setSelected([value])
        setSelectOpen(false)
        return
      }

      // in the case of 'multiple' multi-select
      if (selected.includes(value)) {
        setSelected(selected.filter(address => address !== value))
      } else {
        setSelected(selected.concat([value]))
      }
    }
  }

  return (
    <div className='select-wrapper' ref={ref}>
      <div
        className={`select-toggle-wrapper ${selectOpen ? 'active' : ''}`}
        onClick={() => setSelectOpen(!selectOpen)}>
        {toggleLabel(selected)}
        <Icon
          name='line-angle-down.svg'
          size='very-small'
          className={`grey ${selectOpen ? 'active' : ''}`}
        />
      </div>
      <CSSTransition
        in={selectOpen}
        timeout={200}
        unmountOnExit
        classNames='select-options'>
        <div className='select-options-wrapper'>
          {children.map(option => {
            return (
              <div
                className={`select-option-item-wrapper ${
                  selected.includes(option.props.value) ? 'active' : ''
                }`}
                title={option.props.label}
                onClick={toggleSelectOption(option.props)}>
                {option}
              </div>
            )
          })}
        </div>
      </CSSTransition>
    </div>
  )
}

function Option({ value, label }) {
  return <div className='select-option-item'>{label}</div>
}

export { Select, Option }
