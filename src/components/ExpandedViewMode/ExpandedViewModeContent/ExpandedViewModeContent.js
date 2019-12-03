import React from 'react'
import './ExpandedViewModeContent.css'

export default function ExpandedViewModeContent({ goal }) {
  return (
    <div className='expanded_view_content'>
      <div className='expanded_view_title'>{goal.content}</div>
      <div className='expanded_view_tags'>tags</div>
      <div className='squirrels_timeframe_row'>
        <div className='expanded_view_squirrels'>squirrels</div>
        <div className='expanded_view_timeframe'>timeframe</div>
      </div>
      <div className='expanded_view_description'>add description here...</div>
      <div className='expanded_view_tabs'>
        <div className='expanded_view_priority'></div>
        <div className='expanded_view_comments'></div>
        <div className='expanded_view_acitivity_history'></div>
        <div className='expanded_view_attachments'></div>
      </div>
    </div>
  )
}
