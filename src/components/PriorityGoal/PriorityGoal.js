import React, { useState } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import './PriorityGoal.css'
import { NavLink } from 'react-router-dom'

import Avatar from '../Avatar/Avatar'
import Icon from '../Icon/Icon'
import HierarchyIcon from '../HierarchyIcon/HierarchyIcon'
import Button from '../Button/Button'
import { addVoteOfGoal } from '../../goal-votes/actions'

import Priority from '../PriorityPicker/PriorityPicker'
import PriorityPicker from '../PriorityPicker/PriorityPicker'

function PriorityGoal({ whoami, goal, votes, createGoalVote }) {
  const fromDate = goal.time_frame
    ? moment.unix(goal.time_frame.from_date)
    : null
  const toDate = goal.time_frame ? moment.unix(goal.time_frame.to_date) : null

  // you can use these as values for
  // testing/ development, instead of `squirrels`
  // const testSquirrels = [
  //  { avatar_url: 'img/profile.png' },
  //  { avatar_url: 'img/profile.png' },
  //  { avatar_url: 'img/profile.png' },
  //]

  const [priorityPickerOpen, setPriorityPickerOpen] = useState(false)

  const handleWeighIn = async () => {
    await createGoalVote({
      goal_vote: {
        urgency: 0.5,
        importance: 0.5,
        impact: 0.5,
        effort: 0.5,
        goal_address: goal.address,
        agent_address: whoami.entry.address,
        unix_timestamp: moment().unix(),
      },
    })
    setPriorityPickerOpen(true)
  }

  const myVote =
    whoami &&
    votes.find(value => {
      return value.agent_address === whoami.entry.address
    })

  return (
    <div className='priority-quadrant-goal-item'>
      <div className='priority-quadrant-goal-iconANDmark'>
        <div className='priority-quadrant-goal-icon'>
          <HierarchyIcon
            size='small'
            hierarchy={goal.hierarchy}
            status={goal.status}
          />
        </div>
        {myVote && <div className='priority-myvote-mark' />}
      </div>
      <div className='priority-quadrant-goal-content'>
        <div className='priority-quadrant-goal-titleANDinfo'>
          <div className='priority-quadrant-goal-title'>{goal.content}</div>
          <div className='priority-quadrant-goal-info'>
            {goal.time_frame && (
              <div className='priority-quadrant-goal-timeframe'>
                <Icon
                  name='calendar_898989.svg'
                  size='very-small'
                  className='grey not-hoverable'
                />
                {fromDate && fromDate.format('MMM D, YYYY')}
                {toDate && ' - '}
                {toDate && toDate.format('MMM D, YYYY')}
              </div>
            )}
            <div className='priority-quadrant-goal-squirrels'>
              {goal.members
                ? goal.members.map((goalMember, index) => (
                    <Avatar
                      key={index}
                      avatar_url={goalMember.avatar_url}
                      small
                    />
                  ))
                : null}
            </div>
          </div>
        </div>
        <div className='priority-quadrant-goal-right-menu'>
          <div className='weigh_in_button'>
            <Button
              key='priority'
              size='small'
              color='purple'
              text={myVote ? 'See My Vote' : 'Weigh In'}
              onClick={
                myVote ? () => setPriorityPickerOpen(true) : handleWeighIn
              }
            />
          </div>

          <div className='priority-quadrant-goal-view-mode-icons'>
            <NavLink to='/board/map'>
              <Icon
                name='map_aaaaa.svg'
                size='view-mode-small'
                className='grey'
              />
            </NavLink>
            <Icon
              name='timeline_aaaaa.svg'
              size='view-mode-small'
              className='grey'
            />
          </div>
        </div>
        {priorityPickerOpen && (
          <Priority
            openToMyVote={true}
            goalAddress={goal.address}
            onClose={() => setPriorityPickerOpen(false)}
          />
        )}
      </div>
    </div>
  )
}

function mapStateToProps(state, ownProps) {
  const { goal } = ownProps
  // filters all the GoalVotes down to a list
  // of only the Votes on the selected Goal
  const allVotesArray = Object.values(state.goalVotes)
  const votes = allVotesArray.filter(function(goalVote) {
    return goalVote.goal_address === goal.address
  })
  return {
    // name of the key 'whoami' MUST match the prop name
    // expected on the component
    whoami: state.whoami,
    votes,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    createGoalVote: goal_vote => {
      return dispatch(addVoteOfGoal.create(goal_vote))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PriorityGoal)
