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

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Priority from '../ExpandedViewModeContent/Priority/Priority'
import Comments from '../ExpandedViewModeContent/comments/Comments'
import ActivityHistory from '../ExpandedViewModeContent/activity history/ActivityHistory'
import Attachments from '../ExpandedViewModeContent/attachments/Attachments'
import NavBar from './NavBar/NavBar'

function SquirrelInfoPopup({ squirrel, onClose }) {
  const ref = useRef()
  useOnClickOutside(ref, onClose)
// TODO : connect "squirrel-info-popup-name" div to the member's profile page
// TODO : connect "remove from goal" button to holochain
  return (
    <div className='squirrel-info-popup-wrapper' ref={ref}>
      <div className='squirrel-info-popup-nameANDhandle'>
        <div className='squirrel-info-popup-name'>
          {squirrel.first_name} {squirrel.last_name}
        </div>
        <div className='squirrel-info-popup-handle'>{squirrel.handle}</div>
      </div>
      <div className='remove-squirrel-btn'>remove from goal</div>
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

  const [activeTab, setActiveTab] = useState('comments')
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
          ...goal,
          timestamp_updated: moment().unix(),
          content,
          description,
        },
        goalAddress
      )
    }
    setEditTitle(false)
    setEditDescription(false)
  }

  const updateTimeframe = (start, end) => {
    updateGoal(
      {
        ...goal,
        timestamp_updated: moment().unix(),
        time_frame: {
          from_date: start,
          to_date: end
        }
      },
      goalAddress
    )
  }

  const handleOnChangeTitle = ({ target }) => {
    setContent(target.value)
  }
  const handleOnChangeDescription = ({ target }) => {
    setDescription(target.value)
  }

  const fromDate = goal.time_frame ? moment.unix(goal.time_frame.from_date) : null
  const toDate = goal.time_frame ? moment.unix(goal.time_frame.to_date) : null

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
            {fromDate && fromDate.format('MMM Do, YYYY')}{toDate && ' - '}{toDate && toDate.format('MMM Do, YYYY')}
            {!fromDate && !toDate && 'not set'}
          </div>
          {editTimeframe && (
            <DatePicker onClose={() => setEditTimeframe(false)}
              onSet={updateTimeframe}
              fromDate={fromDate}
              toDate={toDate} />
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
      <NavBar activeTab={activeTab} onChange={newTab => setActiveTab(newTab)} />

      <div className='expanded_view_tabs'>
        {activeTab === 'priority' && (
          <div className='expanded_view_priority'>
            {/* TODO: replace this with real priority section */}
            priority
          </div>
        )}
        {activeTab === 'comments' && (
          <div className='expanded_view_comments'>
            {/* TODO: replace this with real comments section */}
            comments
          </div>
        )}
        {activeTab === 'activity history' && (
          <div className='expanded_view_activity_history'>activity history</div>
        )}
        {activeTab === 'attachments' && (
          <div className='expanded_view_attachments'>attachments</div>
        )}
      </div>
    </div>
  )
}
