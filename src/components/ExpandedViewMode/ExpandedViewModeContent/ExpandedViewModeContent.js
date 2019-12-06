import React, { useState } from 'react'
import './ExpandedViewModeContent.css'

import DatePicker from '../../DatePicker/DatePicker'

export default function ExpandedViewModeContent({
  goalAddress,
  goal,
  updateGoal,
}) {

  const [editTimeframe, setEditTimeframe] = useState(false)
  const [editDescription, setEditDescription] = useState(false)
  const [editTitle, setEditTitle] = useState(false)

  const [content, setContent] = useState(goal.content)
  const [description, setDescription] = useState(goal.description)

  const updateContent = () => {
    if (content !== '' && description !== '') {
      updateGoal(
        {
          content,
          user_hash: goal.user_hash,
          unix_timestamp: Date.now(),
          hierarchy: goal.hierarchy,
          status: goal.status,
          description,
        },
        goalAddress
      )
    }
    setEditTitle(false)
    setEditDescription(false)
  }

  const handleOnChangeTitle = ({ target }) => {
    setContent(target.value)
  }
  const handleOnChangeDescription = ({ target }) => {
    setDescription(target.value)
  }
  return (
    <div className='expanded_view_content'>
      <div
        className='expanded_view_title'
        onClick={() => {
          setEditTitle(true)
        }}>
        {editTitle ? (
          <input
            type='text'
            autoFocus
            defaultValue={content}
            onBlur={updateContent}
            onChange={handleOnChangeTitle}
            onKeyPress={handleOnChangeTitle}
          />
        ) : (
          goal.content
        )}
      </div>
      <div className='expanded_view_tags'>tags</div>
      <div className='squirrels_timeframe_row'>
        <div className='expanded_view_squirrels'>squirrels</div>
          <div className='timeframe_wrapper'>
           <div>timeframe</div>
            <div className='expanded_view_timeframe_display' onClick={() => setEditTimeframe(!editTimeframe)}>Feb 12, 2019 - Feb 20, 2019</div>
            {editTimeframe && <DatePicker onClose={() => setEditTimeframe(false)}/>}
          </div>
        </div>
      <div
        className='expanded_view_description'
        onClick={() => {
          setEditDescription(true)
        }}>
        {editDescription ? (
          <textarea
            type='text'
            defaultValue={description}
            onBlur={updateContent}
            onChange={handleOnChangeDescription}
          />
        ) : description === '' ? (
          'add description here...'
        ) : (
          description
        )}
      </div>
      <div className='expanded_view_tabs'>
        <div className='expanded_view_priority'></div>
        <div className='expanded_view_comments'></div>
        <div className='expanded_view_acitivity_history'></div>
        <div className='expanded_view_attachments'></div>
      </div>
    </div>
  )
}
