import React from 'react'
import Zoom from '../Zoom/Zoom'
import './Footer.css'
import Icon from '../Icon'

function Footer() {

  return (
    <div className="footer">
      <div className="bottom-right-panel">
        <Zoom />
        <div className="view-mode-icons">
          <Icon name="map_5f65ff.svg" size="view-mode" />
          <Icon name="priority_898989.svg" size="view-mode" />
          <Icon name="timeline_898989.svg" size="view-mode" />
        </div>
      </div>


    </div>
  )
}

export default Footer