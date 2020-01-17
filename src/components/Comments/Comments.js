import React, { useState } from 'react'
import { connect } from 'react-redux'
import {
  addCommentOfGoal,
  fetchGoalComments,
  archiveCommentOfGoal,
  updateGoalComment,
} from '../../goal-comments/actions'

import TextareaAutosize from 'react-textarea-autosize'

import moment from 'moment'
import './Comments.css'

import Icon from '../Icon/Icon'
import Avatar from '../Avatar/Avatar'
import Button from '../Button/Button'

function Comment({ comment, agent }) {
  return (
    <div className='comment_history_item'>
      <div className='avatar_comment_container'>
        <Avatar avatar_url={agent.avatar_url} medium />{' '}
      </div>
      <div>
        <div className='comment_history_info'>
          <div className='comment_history_name'>
            {agent.first_name + ' ' + agent.last_name}
          </div>
          <div className='comment_history_date'>
            {moment.unix(comment.unix_timestamp).calendar(null, {
              lastDay: '[Yesterday at] LT',
              sameDay: '[Today at] LT',
              nextDay: '[Tomorrow at] LT',
              lastWeek: '[last] dddd [at] LT',
              nextWeek: 'dddd [at] LT',
              sameElse: 'MMM Do YYYY [at] LT',
            })}
          </div>
        </div>
        <div className='comment_history_text'>{comment.content}</div>
      </div>
    </div>
  )
}

function Comments({
  goalAddress,
  avatarUrl,
  agents,
  comments,
  addCommentOfGoal,
  avatarAddress,
}) {
  const [value, setValue] = useState('')

  const sendClick = e => {
    if (value === '') {
      return
    }
    addCommentOfGoal({
      goal_address: goalAddress,
      content: value,
      agent_address: avatarAddress,
      unix_timestamp: moment().unix(),
    })
    setValue('')
  }

  return (
    <div className='comments'>
      <div className='comments_avatarANDInput_wrapper'>
        <div className='avatar_comment_container'>
          <Avatar avatar_url={avatarUrl} medium />
        </div>
        <div className='input_comment_row'>
          <div className='input_comment_wrapper'>
            <TextareaAutosize
              className='input_comment'
              type='text'
              value={value}
              placeholder='write your comment here'
              onChange={e => setValue(e.target.value)}
            />
            <div className='comment_save_button'>
              <Icon name='send.svg' onClick={sendClick} />
            </div>
          </div>
        </div>
      </div>
      <div className='comment_history_container_scrollable'>
        {Object.keys(comments)
          .map(key => comments[key])
          // order the comments by most recent, to least recent
          .sort((a, b) => (a.unix_timestamp > b.unix_timestamp ? -1 : 1))
          .map(comment => (
            <Comment
              key={comment.address}
              comment={comment}
              agent={agents[comment.agent_address]}
            />
          ))}
      </div>
    </div>
  )
}
function mapStateToProps(state) {
  const goalAddress = state.ui.expandedView.goalAddress
  return {
    comments: Object.values(state.goalComments).filter(
      goalComment => goalComment.goal_address === goalAddress
    ),
    goalAddress,
    avatarAddress: state.whoami.entry.address,
    avatarUrl: state.whoami.entry.avatar_url,
    agents: state.agents,
  }
}
function mapDispatchToProps(dispatch) {
  return {
    addCommentOfGoal: goal_comment => {
      return dispatch(addCommentOfGoal.create({ goal_comment }))
    },

    archiveCommentOfGoal: address => {
      return dispatch(archiveCommentOfGoal.create({ address }))
    },
    updateGoalComment: (goal_comment, address) => {
      return dispatch(updateGoalComment.create({ goal_comment, address }))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comments)
