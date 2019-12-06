import React, { useState } from 'react'
import './RightMenu.css'

import PeoplePicker from '../../PeoplePicker'
import DatePicker from '../../DatePicker/DatePicker'
import Priority from '../../Priority/Priority'

import Icon from '../../Icon/Icon'

export default function RightMenu({ goalAddress, goal, updateGoal }) {
  const defaultViews = {
    squirrels: false,
    priority: false,
    timeframe: false,
  }
  const [viewsOpen, setViews] = useState(defaultViews)

  const rightMenuPriorityClass = viewsOpen.priority ? 'active' : ''
  const rightMenuSquirrelsClass = viewsOpen.squirrels ? 'active' : ''
  const rightMenuTimeframeClass = viewsOpen.timeframe ? 'active' : ''

  const innerUpdateGoal = key => val => {
    updateGoal(
      {
        ...goal,
        [key]: val,
      },
      goalAddress
    )
  }

  const toggleView = key => {
    setViews({ ...defaultViews, [key]: !viewsOpen[key] })
  }

  return (
    <div className='expanded_view_right_menu'>
      {/* priority */}
      <Icon
        name='priority_4d4d4d.svg'
        className={rightMenuPriorityClass}
        key='priority'
        onClick={() => toggleView('priority')}
      />
      {viewsOpen.priority && (
        <Priority onClose={() => setViews({ ...defaultViews })} />
      )}
      {/* squirrels */}
      <Icon
        name='squirrel_4d4d4d.svg'
        className={rightMenuSquirrelsClass}
        key='squirrels'
        onClick={() => toggleView('squirrels')}
      />
      {viewsOpen.squirrels && (
        <PeoplePicker onClose={() => setViews({ ...defaultViews })} />
      )}
      {/* timeframe */}
      <Icon
        name='calendar_4d4d4d.svg'
        className={rightMenuTimeframeClass}
        key='timeframe'
        onClick={() => toggleView('timeframe')}
      />
      {viewsOpen.timeframe && (
        <DatePicker onClose={() => setViews({ ...defaultViews })} />
      )}

      <Icon name='tag_4d4d4d.svg' className='right_menu_tag' />
      <Icon name='help_4d4d4d.svg' className='right_menu_help' />
      <Icon name='link_4d4d4d.svg' className='right_menu_link' />
      <Icon name='archive_4d4d4d.svg' className='right_menu_archive' />
      <Icon name='share_4d4d4d.svg' className='right_menu_share' />
      <Icon name='github_4d4d4d.svg' className='right_menu_github' />
    </div>
  )
}
