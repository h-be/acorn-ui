import React from 'react'
import './NavBar.css'

function NavBar({ onChange, activeTab }) {
  const navItems = ['priority', 'comments', 'activity history', 'attachments']

  return (
    <div className='expanded-view-nav-bar'>
      {navItems.map((text, index) => {
        const activeClass = activeTab === text ? 'active-tab' : ''
        return (
          <div
            className={`expanded-view-nav-bar-item ${activeClass}`}
            key={index}
            onClick={() => onChange(text)}>
            {text}
          </div>
        )
      })}
    </div>
  )
}

export default NavBar
