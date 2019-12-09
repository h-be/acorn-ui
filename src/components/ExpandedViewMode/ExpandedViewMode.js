import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import './ExpandedViewMode.css'
import Icon from '../Icon/Icon'

import { updateGoal } from '../../goals/actions'

import ExpandedViewModeHeader from './ExpandedViewModeHeader/ExpandedViewModeHeader'
import RightMenu from './RightMenu/RightMenu'
import ExpandedViewModeContent from './ExpandedViewModeContent/ExpandedViewModeContent'
import ExpandedViewModeFooter from './ExpandedViewModeFooter/ExpandedViewModeFooter'

function ExpandedViewMode({ goalAddress, goal, updateGoal, onClose, squirrels }) {
  return (
    <div className='expanded_view_overlay'>
      <div className={`expanded_view_wrapper border_${goal.status}`}>
        <Icon
          onClick={onClose}
          name='x_a3a3a3.svg'
          size='small-close'
          className='grey'
        />
        <ExpandedViewModeHeader
          goalAddress={goalAddress}
          goal={goal}
          updateGoal={updateGoal}
        />
        <div className='expanded_view_main'>
          <ExpandedViewModeContent
            goalAddress={goalAddress}
            updateGoal={updateGoal}
            goal={goal}
            squirrels={squirrels}
          />
          <RightMenu
            goalAddress={goalAddress}
            goal={goal}
            updateGoal={updateGoal}
          />
        </div>
        <ExpandedViewModeFooter />
      </div>
    </div>
  )
}

ExpandedViewMode.propTypes = {
  onClose: PropTypes.func,
  goalAddress: PropTypes.string.isRequired,
  goal: PropTypes.shape({
    content: PropTypes.string.isRequired,
    user_hash: PropTypes.string.isRequired,
    unix_timestamp: PropTypes.number.isRequired,
    hierarchy: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
  updateGoal: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  const goal = state.goals[state.ui.expandedView.goalAddress]
  const squirrels = Object.keys(state.goalMembers)
    .map(address => state.goalMembers[address])
    .filter(goalMember => goalMember.goal_address === goal.address)
    .map(goalMember => state.agents[goalMember.agent_address])

  return {
    goalAddress: state.ui.expandedView.goalAddress,
    goal,
    squirrels,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateGoal: (goal, address) => {
      return dispatch(updateGoal.create({ address, goal }))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExpandedViewMode)
