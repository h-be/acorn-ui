import React, { useState, useEffect } from 'react'
import './ExpandedViewModeHeader.css'

import Icon from '../../Icon/Icon'
import HierarchyIcon from '../../HierarchyIcon/HierarchyIcon'
import StatusPicker from '../../StatusPicker'
import StatusIcon from '../../StatusIcon/StatusIcon'
import moment from 'moment'
export default function ExpandedViewModeHeader({
  goalAddress,
  goal,
  updateGoal,
}) {
  const defaultViews = {
    status: false,
  }
  const [viewsOpen, setViews] = useState(defaultViews)

  useEffect(() => {
    if (!goalAddress) {
      setViews({ ...defaultViews })
    }
  }, [goalAddress])

  const updateGoalStatus = status => {
    updateGoal(
      {
        ...goal,
        timestamp_updated: moment().unix(),
        status,
      },
      goalAddress
    )
  }

  return (
    <div className='expanded_view_header'>
      <div className='expanded_view_status_icon'>
        {goal.hierarchy === 'NoHierarchy' ? (
          <StatusIcon
            status={goal.status}
            notHoverable
            onClick={() =>
              setViews({ ...defaultViews, status: !viewsOpen.status })
            }
          />
        ) : (
          <HierarchyIcon
            hierarchy={goal.hierarchy}
            status={goal.status}
            size='medium'
            onClick={() =>
              setViews({ ...defaultViews, status: !viewsOpen.status })
            }
          />
        )}
      </div>
      {viewsOpen.status && (
        <StatusPicker
          selectedStatus={goal.status}
          statusClicked={updateGoalStatus}
          onClose={() => setViews({ ...defaultViews })}
        />
      )}
      <Icon
        name='lock-closed.svg'
        className='edibility_permission feature-in-development'
        size='medium-expanded-view'
      />
      <Icon
        name='eye.svg'
        className='visiblity feature-in-development'
        size='medium-expanded-view'
      />
      <Icon
        name='notification.svg'
        className='follow feature-in-development'
        size='medium-expanded-view'
      />
    </div>
  )
}
