import React from 'react'
import './ExpandedViewModeFooter.css'

import Icon from '../../Icon'

export default function ExpandedViewModeFooter({
  goalAddress,
  goal,
  onArchiveClick,
  updateGoal,
  onClose,
}) {
  return (
    <div className='expanded_view_footer'>
      <div className='footer_children_info'>
        <div className='footer_leaf_completes'>
          <Icon name='leaf_complete.svg' size='small' /> 81/164
        </div>
        <div className='footer_status_unknowns'>
          <Icon name='status_unknown.svg' size='small' /> 127
        </div>
      </div>
      <div className='footer_card_info'>
        Created by Pegah Vaezi | Aug 7, 2019 | 12:33pm EDT
      </div>
    </div>
  )
}
