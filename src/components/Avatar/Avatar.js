import React from 'react'
import PropTypes from 'prop-types'
import './Avatar.css'

// colors from https://flatuicolors.com/palette/nl
const initialsAvatarcolors = [
  '#ED4C67', // bara red
  '#F79F1F', // radiant yellow
  '#FDA7DF', // lavendar rose
  '#12CBC4', // blue martina
  '#A3CB38', // android green
  '#1289A7', // meditranian sea
  '#D980FA', // lavendar tea
  '#B53471', // very berry
  '#EE5A24', // puffins bill
  '#009432', // pixelated grass
  '#0652DD', // marchant marine blue
  '#9980FA', // forgotten purple
  '#833471', // holly hock
  '#006266', // turkish aqua
  '#1B1464', // 20000 leagues under the sea
  '#5758BB', // circumorbital ring
  '#6F1E51', // magenta purple
]

function sumChars(str) {
  let sum = 0
  for (let i = 0; i < str.length; i++) {
    sum += str.charCodeAt(i)
  }

  return sum
}

function Avatar({
  first_name,
  last_name,
  avatar_url,
  highlighted,
  small,
  medium,
  large,
  clickable,
  onClick,
}) {
  let classes = []
  if (highlighted) classes.push('highlighted')
  if (small) classes.push('small')
  else if (medium) classes.push('medium')
  else if (large) classes.push('large')
  if (clickable) classes.push('clickable')

  if (!avatar_url) {
    // pick a deterministic color from the list
    let index = sumChars(first_name) % initialsAvatarcolors.length
    const backgroundInitialsAvatar = initialsAvatarcolors[index]

    //const backgroundInitialsAvatar = initialsAvatarcolors[0]
    const style = {
      backgroundColor: backgroundInitialsAvatar,
    }
    classes.push('initials-avatar')
    return (
      <div className={classes.join(' ')} onClick={onClick} style={style}>
        {first_name[0]}
        {last_name[0]}
      </div>
    )
  }

  classes.push('avatar')
  return (
    <img src={avatar_url} className={classes.join(' ')} onClick={onClick} />
  )
}

Avatar.propTypes = {
  avatar_url: PropTypes.string.isRequired,
  highlighted: PropTypes.bool,
  small: PropTypes.bool,
  medium: PropTypes.bool,
  large: PropTypes.bool,
  clickable: PropTypes.bool,
  onClick: PropTypes.func,
}

export default Avatar
