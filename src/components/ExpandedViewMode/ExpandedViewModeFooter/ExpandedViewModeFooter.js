import React from 'react'
import moment from 'moment-timezone'
import './ExpandedViewModeFooter.css'

import Icon from '../../Icon/Icon'

export default function ExpandedViewModeFooter({ goal, creator }) {
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
        {`Created by ${creator.first_name} ${creator.last_name}  ${moment
          .unix(goal.timestamp_created)
          .format('| MMMM Do, YYYY | h:mma')}`}
      </div>
    </div>
  )
}
