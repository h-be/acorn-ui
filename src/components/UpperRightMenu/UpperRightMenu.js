import React, { useState } from 'react'
import onClickOutside from 'react-onclickoutside'
import PropTypes from 'prop-types'
import './UpperRightMenu.css'
import Avatar from '../Avatar/Avatar'

function UpperRightMenu({ whoami }) {
  const [profileMenuOpen, setProfileMenuOpen] = useState(true)
  UpperRightMenu.handleClickOutside = () => setProfileMenuOpen(false)
  return <div className="upper_right_menu">
    <Avatar avatar_url={whoami.avatar_url} highlighted medium clickable onClick={() => setProfileMenuOpen(!profileMenuOpen)} />
    {profileMenuOpen && <div className="profile_menu">
      <ul>
        <li onClick={() => {}}>Profile Settings</li>
        {/* <li>Preferences</li> */}
      </ul>
    </div>}
  </div>
}

UpperRightMenu.propTypes = {
  whoami: PropTypes.shape({
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    handle: PropTypes.string,
    avatar_url: PropTypes.string,
    address: PropTypes.string
  })
}

const clickOutsideConfig = {
  handleClickOutside: () => UpperRightMenu.handleClickOutside
}

export default onClickOutside(UpperRightMenu, clickOutsideConfig)