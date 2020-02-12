import React from 'react'
import { NavLink, useRouteMatch } from 'react-router-dom'
import Zoom from '../Zoom/Zoom'
import './Footer.css'
import Icon from '../Icon/Icon'
import Button from '../Button/Button'

function Footer() {
  const mapPage = useRouteMatch('/board/map')

  let bottomRightPanelClassName = 'bottom-right-panel'

  bottomRightPanelClassName =
    bottomRightPanelClassName + (mapPage ? '' : ' bottom-right-panel-not-map')

  return (
    <div className='footer'>
      <div className='bottom-left-panel'>
        <a
          href='https://github.com/h-be/acorn-release/issues/new'
          target='_blank'>
          <Button text='Report Issue' size='small' className='green' />
        </a>
      </div>
      <div className={bottomRightPanelClassName}>
        {mapPage && <Zoom />}
        <div className='view-mode-icons'>
          <NavLink to='/board/map' activeClassName='view-mode-active'>
            <Icon
              name='map.svg'
              size='view-mode'
              className='grey'
              withTooltipTop
              tooltipText='map view'
            />
          </NavLink>
          <NavLink to='/board/priority' activeClassName='view-mode-active'>
            <Icon
              name='priority_898989.svg'
              size='view-mode'
              className='grey'
              withTooltipTop
              tooltipText='priority view'
            />
          </NavLink>
          {/* <Icon name='timeline_898989.svg' className='grey' size='view-mode' /> */}
        </div>
      </div>
    </div>
  )
}

export default Footer
