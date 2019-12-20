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

  // you can use these as values for
  // testing/ development, instead of `squirrels`
  // const testSquirrels = [
  //  { avatar_url: 'img/profile.png' },
  //  { avatar_url: 'img/profile.png' },
  //  { avatar_url: 'img/profile.png' },
  //]

  return (
    <div className='priority-quadrant-goal-item'>
      <div className='priority-quadrant-goal-icon'>
        <Icon name='leaf_incomplete.svg' size='small' />
      </div>
      <div className='priority-quadrant-goal-content'>
        <div className='priority-quadrant-goal-titleANDinfo'>
          <div className='priority-quadrant-goal-title'>{goal.content}</div>
          <div className='priority-quadrant-goal-info'>
              {goal.time_frame && (
                <div className='priority-quadrant-goal-timeframe'>
                  <Icon name='calendar_898989.svg' size='very-small' className='grey not-hoverable' />
                  {fromDate && fromDate.format('MMM D, YYYY')}
                  {toDate && ' - '}
                  {toDate && toDate.format('MMM D, YYYY')}
                </div>
              )}
            <div className='priority-quadrant-goal-squirrels'>
              {goal.members
                ? goal.members.map((goalMember, index) => (
                    <Avatar
                      key={index}
                      avatar_url={goalMember.avatar_url}
                      small
                    />
                  ))
                : null}
            </div>
          </div>
        </div>
        <div className='priority-quadrant-goal-right-menu'>
          <div className='priority-quadrant-goal-view-mode-icons'>
            <NavLink to='/board/map'>
              <Icon name='map_aaaaa.svg' size='view-mode-small' className='grey' />
            </NavLink>
            <Icon name='timeline_aaaaa.svg' size='view-mode-small' className='grey' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PriorityGoal
