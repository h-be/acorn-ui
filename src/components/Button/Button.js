import React from 'react'
import PropTypes from 'prop-types'
import './Button.css'

function Button({ text, onClick }) {
  return <button className="button" onClick={onClick}>{ text }</button>
}

Button.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func
}

export default Button