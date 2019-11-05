import React from 'react'
import PropTypes from 'prop-types'
import './Avatar.css'

function Avatar({ avatar_url, highlighted, small, medium, clickable, onClick }) {
  let classes = ['avatar']
  if (highlighted) classes.push('highlighted')
  if (small) classes.push('small')
  else if (medium) classes.push('medium')
  if (clickable) classes.push('clickable')
  return <img src={avatar_url} className={classes.join(' ')} onClick={onClick} />
}

Avatar.propTypes = {
  avatar_url: PropTypes.string.isRequired,
  highlighted: PropTypes.bool,
  small: PropTypes.bool,
  medium: PropTypes.bool,
  clickable: PropTypes.bool,
  onClick: PropTypes.func
}

export default Avatar