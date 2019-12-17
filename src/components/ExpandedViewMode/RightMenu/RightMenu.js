import React, { useState } from 'react'
import moment from 'moment'
import './RightMenu.css'

import PeoplePicker from '../../PeoplePicker'
import DatePicker from '../../DatePicker/DatePicker'
import Priority from '../../Priority/Priority'

import Comments from '../../Comments/Comments'
import Icon from '../../Icon/Icon'

export default function RightMenu({ goalAddress, goal, updateGoal }) {
  const defaultViews = {
    squirrels: false,
    priority: false,
    help: false,
    timeframe: false,
  }
  const [viewsOpen, setViews] = useState(defaultViews)

  const rightMenuPriorityClass = viewsOpen.priority ? 'active' : ''
  const rightMenuHelpClass = viewsOpen.help ? 'active' : ''

  const rightMenuSquirrelsClass = viewsOpen.squirrels ? 'active' : ''
  const rightMenuTimeframeClass = viewsOpen.timeframe ? 'active' : ''

  const toggleView = key => {
    setViews({ ...defaultViews, [key]: !viewsOpen[key] })
  }

  const updateTimeframe = (start, end) => {
    updateGoal(
      {
        ...goal,
        timestamp_updated: moment().unix(),
        time_frame: {
          from_date: start,
          to_date: end
        }
      },
      goalAddress
    )
  }

  const fromDate = goal.time_frame ? moment.unix(goal.time_frame.from_date) : null
  const toDate = goal.time_frame ? moment.unix(goal.time_frame.to_date) : null

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
        name='squirrel.svg'
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
        <DatePicker onClose={() => setViews({ ...defaultViews })}
          onSet={updateTimeframe}
          fromDate={fromDate}
          toDate={toDate} />
      )}

      <Icon name='tag_4d4d4d.svg' className='right_menu_tag feature-in-development' />
      <Icon name='help_4d4d4d.svg' className='right_menu_help feature-in-development' />
      <Icon name='link_4d4d4d.svg' className='right_menu_link feature-in-development' />
      <Icon name='archive_4d4d4d.svg' className='right_menu_archive feature-in-development' />
      <Icon name='share_4d4d4d.svg' className='right_menu_share feature-in-development' />
      <Icon name='github_4d4d4d.svg' className='right_menu_github feature-in-development' />
    </div>
  )
}
