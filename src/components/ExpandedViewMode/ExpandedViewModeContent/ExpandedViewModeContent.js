import React, { useState, useRef } from 'react'
import { connect } from 'react-redux'
import useOnClickOutside from 'use-onclickoutside'
import Avatar from '../../Avatar/Avatar'
import Icon from '../../Icon/Icon'

import './ExpandedViewModeContent.css'
import moment from 'moment'

import TextareaAutosize from 'react-textarea-autosize'

import DatePicker from '../../DatePicker/DatePicker'
import PeoplePicker from '../../PeoplePicker'

function SquirrelInfoPopup({ squirrel, onClose }) {
  const ref = useRef()
  useOnClickOutside(ref, onClose)

  return (
    <div className='squirrel-info-popup-wrapper' ref={ref}>
      <div className='squirrel-info-popup-nameANDhandle'>
        <div className='squirrel-info-popup-name'>
          {squirrel.first_name} {squirrel.last_name}
        </div>
        <div className='squirrel-info-popup-handle'>{squirrel.handle}</div>
      </div>
      <div className='remove-squirrel-btn'>remove from card</div>
    </div>
  )
}

export default function ExpandedViewModeContent({
  goalAddress,
  goal,
  updateGoal,
  squirrels,
}) {
  // you can use these as values for
  // testing/ development, instead of `squirrels`
  const testSquirrels = [
    { avatar_url: 'img/profile.png' },
    { avatar_url: 'img/profile.png' },
    { avatar_url: 'img/profile.png' },
  ]

  const [editSquirrels, setEditSquirrels] = useState(false)
  const [squirrelInfoPopup, setSquirrelInfoPopup] = useState(null)
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
          timestamp_created: moment().unix(),
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
      <div className='expanded_view_title'>
        <TextareaAutosize
          defaultValue={content}
          onBlur={updateContent}
          onChange={handleOnChangeTitle}
          onKeyPress={handleOnChangeTitle}
        />
      </div>

      <div className='expanded_view_tags'>tags</div>
      <div className='squirrels_timeframe_row'>
        <div className='expanded_view_squirrels_wrapper'>
          <div className='expanded_view_squirrels_title'>squirrels</div>
          <div className='expanded_view_squirrels_content'>
            {squirrels.map((squirrel, index) => {
              const highlighted = squirrelInfoPopup
                ? squirrelInfoPopup.address === squirrel.address
                : false
              return (
                <Avatar
                  key={index}
                  avatar_url={squirrel.avatar_url}
                  medium
                  clickable
                  onClick={() =>
                    setSquirrelInfoPopup(squirrelInfoPopup ? null : squirrel)
                  }
                  highlighted={highlighted}
                />
              )
            })}
            {squirrelInfoPopup && (
              <SquirrelInfoPopup
                onClose={() => setSquirrelInfoPopup(null)}
                squirrel={squirrelInfoPopup}
              />
            )}
            <div className='expanded_view_squirrels_add_wrapper'>
              <Icon
                className='add_squirrel_plus_icon'
                name='plus.svg'
                size='medium'
                onClick={() => setEditSquirrels(!editSquirrels)}
              />
              {editSquirrels && (
                <PeoplePicker onClose={() => setEditSquirrels(false)} />
              )}
            </div>
          </div>
        </div>
        <div className='timeframe_wrapper'>
          <div className='expanded_view_timeframe_title'>timeframe</div>
          <div
            className='expanded_view_timeframe_display'
            onClick={() => setEditTimeframe(!editTimeframe)}>
            Feb 12, 2019 - Feb 20, 2019
          </div>
          {editTimeframe && (
            <DatePicker onClose={() => setEditTimeframe(false)} />
          )}
        </div>
      </div>

      <div className='expanded_view_description'>
        <TextareaAutosize
          placeholder='add description here'
          defaultValue={description}
          onBlur={updateContent}
          onChange={handleOnChangeDescription}
        />
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
