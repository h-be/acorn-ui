import React, { useState } from 'react'
import './ExpandedViewModeHeader.css'

import Icon from '../../Icon/Icon'
import StatusPicker from '../../StatusPicker'
import StatusIcon from '../../StatusIcon'

export default function ExpandedViewModeHeader({
  goalAddress,
  goal,
  updateGoal,
}) {
  const defaultViews = {
    status: false,
  }
  const [viewsOpen, setViews] = useState(defaultViews)

  const updateGoalStatus = status => {
    updateGoal(
      {
        content: goal.content,
        user_hash: goal.user_hash,
        unix_timestamp: Date.now(),
        hierarchy: goal.hierarchy,
        description: '',
        status,
      },
      goalAddress
    )
  }

  return (
    <div className='expanded_view_header'>
      <div className='expanded_view_status_icon'>
        <StatusIcon
          size='small'
          status={goal.status}
          hideTooltip
          onClick={() =>
            setViews({ ...defaultViews, status: !viewsOpen.status })
          }
        />
      </div>
      {viewsOpen.status && (
        <StatusPicker
          selectedStatus={goal.status}
          statusClicked={updateGoalStatus}
          onClose={() => setViews({ ...defaultViews })}
        />
      )}
      <Icon
        name='lock_closed_4d4d4d.svg'
        className='edibility_permission feature-in-development'
        size='medium-expanded-view'
      />
      <Icon
        name='eye_4d4d4d.svg'
        className='visiblity feature-in-development'
        size='medium-expanded-view'
      />
      <Icon
        name='notification_4d4d4d.svg'
        className='follow feature-in-development'
        size='medium-expanded-view'
      />
    </div>
  )
}
