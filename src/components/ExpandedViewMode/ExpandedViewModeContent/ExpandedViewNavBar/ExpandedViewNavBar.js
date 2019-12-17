import React from 'react'
import './ExpandedViewNavBar.css'

import Icon from '../../../Icon/Icon'

function ExpandedViewNavBar({ onChange, activeTab }) {

  const navItems = [
    {
      text: 'priority',
      icon: 'priority_4d4d4d.svg'
    },
    {
      text: 'comments',
      icon: 'priority_4d4d4d.svg'
    },
    {
      text: 'activity history',
      icon: 'priority_4d4d4d.svg'
    },
    {
      text: 'attachments',
      icon: 'priority_4d4d4d.svg'
    }
  ]

  return (
    <div className='expanded-view-nav-bar'>
      {navItems.map(({ text, icon }, index) => {
        const activeClass = activeTab === text ? 'active-tab' : ''
        return (
          <div
            className={`expanded-view-nav-bar-item ${activeClass}`}
            key={index}
            onClick={() => onChange(text)}>
            <Icon name={icon} size='very-small' />
            {text}
          </div>
        )
      })}
    </div>
  )
}

export default ExpandedViewNavBar
