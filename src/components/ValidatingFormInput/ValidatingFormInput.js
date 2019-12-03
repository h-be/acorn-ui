import React from 'react'
import PropTypes from 'prop-types'
import './ValidatingFormInput.css'

function ValidatingFormInput({
  withAtSymbol,
  readOnly,
  placeholder,
  label,
  value,
  onChange,
  helpText,
}) {
  const innerOnChange = e => {
    e.preventDefault()
    onChange(e.target.value)
  }
  const inputClassName = withAtSymbol ? 'with_at_symbol' : ''
  return (
    <div className='validating_form_input'>
      <label htmlFor={label}>{label}</label>
      {helpText && <p className='help_text'>{helpText}</p>}
      <div className='input_wrapper'>
        <input
          type='text'
          className={inputClassName}
          name={label}
          value={value}
          onChange={innerOnChange}
          placeholder={placeholder}
          readOnly={readOnly}
        />
        {withAtSymbol && <div className='at_symbol'>@</div>}
      </div>
    </div>
  )
}

ValidatingFormInput.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  helpText: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  withAtSymbol: PropTypes.bool,
}

export default ValidatingFormInput
