import React from 'react'
import {
  NavLink
} from 'react-router-dom'
import Zoom from '../Zoom/Zoom'
import './Footer.css'
import Icon from '../Icon'

function Footer() {

  return (
    <div className="footer">
      <div className="bottom-right-panel">
        <Zoom />
        <div className="view-mode-icons">
          <NavLink to="/board/map"><Icon name="map_5f65ff.svg" size="view-mode" /></NavLink>
          <NavLink to="/board/priority"><Icon name="priority_898989.svg" size="view-mode" /></NavLink>
          <Icon name="timeline_898989.svg" size="view-mode" />
        </div>
      </div>
    </div>
  )
}

export default Footer