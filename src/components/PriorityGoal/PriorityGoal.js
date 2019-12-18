import React from 'react'
import moment from 'moment'
import './PriorityGoal.css'
import { NavLink } from 'react-router-dom'

import Avatar from '../Avatar/Avatar'
import Icon from '../Icon/Icon'

function PriorityGoal({ goal }) {
  const fromDate = goal.time_frame
    ? moment.unix(goal.time_frame.from_date)
    : null
  const toDate = goal.time_frame ? moment.unix(goal.time_frame.to_date) : null

  return (
    <div className='priority-quadrant-goal-item'>
      <div className='priority-quadrant-goal-title'>
        <Icon name='leaf_incomplete.svg' size='small' />
        {goal.content}
      </div>
      <div className='priority-quadrant-goal-info'>
        {goal.time_frame && (
          <>
            <Icon name='calendar_898989.svg' size='very-small' />
            {fromDate && fromDate.format('MMM D, YYYY')}
            {toDate && ' - '}
            {toDate && toDate.format('MMM D, YYYY')}
          </>
        )}
        {goal.members.length
          ? goal.members.map((goalMember, index) => (
              <Avatar key={index} avatar_url={goalMember.avatar_url} small />
            ))
          : null}
      </div>
      <div className='priority-quadrant-goal-right-menu'>
        <div className='priority-quadrant-goal-view-mode-icons'>
          <NavLink to='/board/map'>
            <Icon name='map_aaaaa.svg' size='view-mode-small' />
          </NavLink>
          <Icon name='timeline_aaaaa.svg' size='view-mode-small' />
        </div>
      </div>
    </div>
  )
}

export default PriorityGoal
