import React, { useState } from 'react'
import { connect } from 'react-redux'
import './RightMenu.css'
import PropTypes from 'prop-types'

import PeoplePicker from '../../PeoplePicker'
import Priority from '../../Priority/Priority'

import Icon from '../../Icon/Icon'

export default function RightMenu({
  goalAddress,
  goal,
  onArchiveClick,
  updateGoal,
  onClose,
}) {
  const defaultViews = {
    squirrels: false,
    priority: false,
  }
  const [viewsOpen, setViews] = useState(defaultViews)

  const rightMenuPriorityClass = viewsOpen.priority ? 'active' : ''
  const rightMenuSquirrelsClass = viewsOpen.squirrels ? 'active' : ''

  return (
    <div className='expanded_view_right_menu'>
      <Icon name='help_4d4d4d.svg' className='right_menu_help' />
      {/* priority */}
      <Icon
        name='priority_4d4d4d.svg'
        className={rightMenuPriorityClass}
        key='priority'
        onClick={() =>
          setViews({ ...defaultViews, priority: !viewsOpen.priority })
        }
      />
      {viewsOpen.priority && (
        <Priority onClose={() => setViews({ ...defaultViews })} />
      )}
      <Icon name='tag_4d4d4d.svg' className='right_menu_tag' />
      {/* squirrels */}
      <Icon
        name='squirrel_4d4d4d.svg'
        className={rightMenuSquirrelsClass}
        key='squirrels'
        onClick={() =>
          setViews({ ...defaultViews, squirrels: !viewsOpen.squirrels })
        }
      />
      {viewsOpen.squirrels && (
        <PeoplePicker onClose={() => setViews({ ...defaultViews })} />
      )}
      <Icon name='calendar_4d4d4d.svg' className='right_menu_calendar' />
      <Icon name='link_4d4d4d.svg' className='right_menu_link' />
      <Icon name='archive_4d4d4d.svg' className='right_menu_archive' />
      <Icon name='share_4d4d4d.svg' className='right_menu_share' />
      <Icon name='github_4d4d4d.svg' className='right_menu_github' />
    </div>
  )
}

RightMenu.propTypes = {
  onClose: PropTypes.func.isRequired,
}
