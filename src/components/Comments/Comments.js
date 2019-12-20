import React, { useState } from 'react'
import { connect } from 'react-redux'
import {
  addCommentOfGoal,
  fetchGoalComments,
  archiveCommentOfGoal,
  updateGoalComment,
} from '../../goal-comments/actions'
import moment from 'moment'
import './Comments.css'
import Avatar from '../Avatar/Avatar'
import Button from '../Button/Button'

function Comment({ comment, agent }) {
  return (
    <div className='comment'>
      <div className='avatar_comment_container'>
        <Avatar avatar_url={agent.avatar_url} />{' '}
      </div>
      <div>
        <div className='info'>
          <span>{agent.first_name + ' ' + agent.last_name}</span>
          <span className='date'>
            {moment.unix(comment.unix_timestamp).format('Do,hh:mm a')}
          </span>
        </div>
        <span>{comment.content}</span>
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

  const buttonClick = e => {
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
      <div>
        <div className='avatar_comment_container'>
          <Avatar avatar_url={avatarUrl} />
        </div>
        <div className='input_comment_row'>
          <input
            className='input_comment'
            type='text'
            value={value}
            onChange={e => setValue(e.target.value)}
          />
          <Button
            text='Save'
            color='green'
            size='small'
            onClick={buttonClick}
          />
        </div>
      </div>
      <div className='scroll'>
        {Object.keys(comments).map(key => (
          <Comment
            key={key}
            comment={comments[key]}
            agent={agents[comments[key].agent_address]}
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
