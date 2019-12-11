import React from 'react'
import { connect } from 'react-redux'
import {
  addCommentOfGoal,
  fetchGoalComments,
  archiveCommentOfGoal,
  updateGoalComment,
} from '../../goal-comments/actions'
import moment from 'moment'
import Icon from '../Icon'
import './Comments.css'
import Avatar from '../Avatar/Avatar'
function Comment(props) {
  return (
    <div className='comment'>
      {console.log(props.avatarUrl)}
      <div className='avatar_comment_container'>
        <Avatar avatar_url={props.avatarUrl} />{' '}
      </div>
      <div>
        <div className='info'>
          <p>{props.name}</p>
          <p>
            {moment
              .unix(props.unix)
              .tz('America/Caracas')
              .format('Do,hh:mm a')}
          </p>
        </div>
        <span>{props.content}</span>
      </div>
    </div>
  )
}
function Comments(props) {
  // props
  //   .addCommentOfGoal({
  //     goal_address: props.goalAddress,
  //     content: 'String',
  //     agent_address: props.avatarAddress,
  //     unix_timestamp: moment().unix(),
  //   })
  //   .then(value => console.log(value))
  return (
    <div className='comments'>
      {Object.keys(props.comments).map(key =>
        props.comments[key].goal_address === props.goalAddress ? (
          <Comment
            key={key}
            avatarUrl={
              props.agents[props.comments[key].agent_address].avatar_url
            }
            name={props.agents[props.comments[key].agent_address].first_name}
            unix={props.comments[key].unix_timestamp}
            agentAddress={props.comments[key].agent_address}
            content={props.comments[key].content}
          />
        ) : null
      )}
    </div>
  )
}
function mapStateToProps(state) {
  return {
    comments: state.goalComments,
    goalAddress: state.ui.expandedView.goalAddress,
    avatarAddress: state.whoami.entry.address,
    agents: state.agents,
  }
}
function mapDispatchToProps(dispatch) {
  return {
    addCommentOfGoal: goal_comment => {
      return dispatch(addCommentOfGoal.create({ goal_comment }))
    },
    fetchGoalComments: () => {
      return dispatch(fetchGoalComments.create({}))
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
