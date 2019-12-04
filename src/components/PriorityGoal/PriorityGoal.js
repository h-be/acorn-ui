import React from 'react'
import './PriorityGoal.css'
import { NavLink } from 'react-router-dom'

import Avatar from '../Avatar/Avatar'
import Icon from '../Icon'

function PriorityG../Icon/Iconoal }) {
  console.log(goal)
  return (
    <div className='priority-quadrant-goal-item'>
      <div className='priority-quadrant-goal-title'>
        <Icon name='leaf_incomplete.svg' size='small' />
        {goal.content}
      </div>
      <div className='priority-quadrant-goal-info'>
        <Icon name='calendar_898989.svg' size='very-small' />
        <span>Aug 14 - Aug 20</span>
        <Icon name='profile.png' size='small' />
        <Avatar />
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
