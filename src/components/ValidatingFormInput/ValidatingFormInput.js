import React from 'react'
import PropTypes from 'prop-types'
import './ValidatingFormInput.css'

function ValidatingFormInput({ readOnly, placeholder, label, value, onChange, helpText }) {
  const innerOnChange = (e) => {
    e.preventDefault()
    onChange(e.target.value)
  }
  return <div className="validating_form_input">
    <label htmlFor={label}>{ label }</label>
    {helpText && <p className="help_text">{ helpText }</p>}
    <input type="text" name={label} value={value} onChange={innerOnChange} placeholder={placeholder} readOnly={readOnly} />
  </div>
}

ValidatingFormInput.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  helpText: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool
}

export default ValidatingFormInput