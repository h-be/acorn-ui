import React from 'react'
import { NavLink, useRouteMatch } from 'react-router-dom'
import Zoom from '../Zoom/Zoom'
import './Footer.css'
import Icon from '../Icon/Icon'

function Footer() {

  const mapPage = useRouteMatch("/board/map")

  let bottomRightPanelClassName = 'bottom-right-panel'

  bottomRightPanelClassName = bottomRightPanelClassName + (mapPage ? '' : ' bottom-right-panel-not-map')


  return (
    <div className='footer'>
      <div className={bottomRightPanelClassName} >
        {mapPage && <Zoom />}
        <div className='view-mode-icons'>
          <NavLink to='/board/map'>
            <Icon name='map_5f65ff.svg' size='view-mode' />
          </NavLink>
          <NavLink to='/board/priority'>
            <Icon name='priority_898989.svg' size='view-mode' />
          </NavLink>
          <Icon name='timeline_898989.svg' size='view-mode' />
        </div>
      </div>
    </div>
  )
}

export default Footer
