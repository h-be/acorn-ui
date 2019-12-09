import React from 'react'
import PropTypes from 'prop-types'
import './Icon.css'

function Icon({ name, withBackground, size, className, onClick = () => {} }) {
  return (
    <div
      className={`${
        withBackground ? 'with_background' : ''
      } icon ${size} ${className}`}
      onClick={onClick}>
      <div
        className='inner-icon'
        style={{
          maskImage: `url(img/${name})`,
          WebkitMaskImage: `url(img/${name})`,
        }}></div>
    </div>
  )
}

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  withBackground: PropTypes.bool,
  onClick: PropTypes.func,
  size: PropTypes.string,
  className: PropTypes.string,
}

export default Icon
