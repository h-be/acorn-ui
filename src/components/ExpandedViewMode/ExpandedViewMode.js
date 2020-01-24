import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import './ExpandedViewMode.css'
import Icon from '../Icon/Icon'

import { updateGoal } from '../../goals/actions'

import ExpandedViewModeHeader from './ExpandedViewModeHeader/ExpandedViewModeHeader'
import RightMenu from './RightMenu/RightMenu'
import ExpandedViewModeContent from './ExpandedViewModeContent/ExpandedViewModeContent'

import { archiveMemberOfGoal } from '../../goal-members/actions'

import ExpandedViewModeFooter from './ExpandedViewModeFooter/ExpandedViewModeFooter'

function ExpandedViewMode({
  goalAddress,
  goal,
  updateGoal,
  onClose,
  creator,
  squirrels,
  archiveMemberOfGoal,
}) {
  const [goalState, setGoalState] = useState()
  const [squirrelsState, setSquirrelsState] = useState()
  const [creatorState, setCreatorState] = useState()
  const [showing, setShowing] = useState(false)

  useEffect(() => {
    if (showing && !goalAddress) {
      setShowing(false)
    } else if (!showing && goalAddress) {
      setShowing(true)
    }
  }, [goalAddress])

  useEffect(() => {
    if (goal) {
      setGoalState({ ...goal })
    }
  }, [goal])

  useEffect(() => {
    if (squirrels) {
      setSquirrelsState([...squirrels])
    }
  }, [squirrels])

  useEffect(() => {
    if (creator) {
      setCreatorState({ ...creator })
    }
  }, [creator])

  return (
    <>
      <div
        className={`expanded-view-overlay ${showing ? 'fully-expanded' : ''}`}
      />
      {goalState && (
        <div
          className={`expanded-view-wrapper border_${goalState.status} ${
            showing ? 'fully-expanded' : ''
          }`}>
          <Icon
            onClick={onClose}
            name='x.svg'
            size='small-close'
            className='grey'
          />
          <ExpandedViewModeHeader
            goalAddress={goalAddress}
            goal={goalState}
            updateGoal={updateGoal}
          />
          <div className='expanded-view-main'>
            <ExpandedViewModeContent
              squirrels={squirrelsState}
              goalAddress={goalAddress}
              updateGoal={updateGoal}
              goal={goalState}
              archiveMemberOfGoal={archiveMemberOfGoal}
            />
            <RightMenu
              goalAddress={goalAddress}
              goal={goalState}
              updateGoal={updateGoal}
            />
          </div>
          <ExpandedViewModeFooter goal={goalState} creator={creatorState} />
        </div>
      )}
    </>
  )
}

function mapStateToProps(state) {
  let goal,
    creator = null,
    squirrels = []

  if (state.ui.expandedView.goalAddress) {
    goal = state.goals[state.ui.expandedView.goalAddress]
    squirrels = Object.keys(state.goalMembers)
      .map(address => state.goalMembers[address])
      .filter(goalMember => goalMember.goal_address === goal.address)
      .map(goalMember => {
        const squirrel = state.agents[goalMember.agent_address]
        squirrel.goalMemberAddress = goalMember.address
        return squirrel
      })
    Object.keys(state.agents).forEach(value => {
      if (state.agents[value].address === goal.user_hash)
        creator = state.agents[value]
    })
  }

  return {
    goalAddress: state.ui.expandedView.goalAddress,
    creator,
    goal,
    squirrels,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateGoal: (goal, address) => {
      return dispatch(updateGoal.create({ address, goal }))
    },
    archiveMemberOfGoal: address => {
      return dispatch(archiveMemberOfGoal.create({ address }))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExpandedViewMode)
