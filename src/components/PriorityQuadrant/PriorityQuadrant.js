import React from 'react'
import './PriorityQuadrant.css'
import PriorityGoal from '../PriorityGoal/PriorityGoal'
import {
  NavLink
} from 'react-router-dom'

import Avatar from '../Avatar/Avatar'
import Icon from '../Icon'


function PriorityQuadrant({ title, titleClassname, goals }) {
  return <div className="priority-quadrant">
    <div className={`priority-quadrant-title ${titleClassname}`}>
      {title}
    </div>
    <div>
      <div className="priority-quadrant-goals">
        <div className="priority-quadrant-goal-item">
          <div className="priority-quadrant-goal-title">
            <Icon name='leaf_incomplete.svg' size='small' />
            {goals.map((goal) => {
              return <PriorityGoal key={goal.content} goal={goal} />
            })}
          </div>
          <div className="priority-quadrant-goal-info">
            <Icon name='calendar_898989.svg' size='very-small' />
            <span>Aug 14 - Aug 20</span>
            <Icon name='profile.png' size='small' />
            <Avatar />
          </div>
          <div className="priority-quadrant-goal-right-menu">
            <div className="priority-quadrant-goal-view-mode-icons">
              <NavLink to="/board/map"><Icon name="map_aaaaa.svg" size="view-mode-small" /></NavLink>
              <Icon name="timeline_aaaaa.svg" size="view-mode-small" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
}

export default PriorityQuadrant