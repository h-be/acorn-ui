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

function ExpandedViewMode({
  goalAddress,
  goal,
  onArchiveClick,
  updateGoal,
  onClose,
}) {
  return (
    <div className='expanded_view_overlay'>
      <div className={`expanded_view_wrapper border_${goal.status}`}>
        <Icon
          onClick={onClose}
          name='x_a3a3a3.svg'
          size='small'
          className='close_icon'
        />
        <ExpandedViewModeHeader
          goalAddress={goalAddress}
          goal={goal}
          updateGoal={updateGoal}
        />
        <div className='expanded_view_main'>
          <ExpandedViewModeContent goalAddress={goalAddress} updateGoal={updateGoal} goal={goal} />
          <RightMenu />
        </div>
        <ExpandedViewModeFooter />
      </div>
    </div>
  )
}

ExpandedViewMode.propTypes = {
  onClose: PropTypes.func,
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
  return {
    goalAddress: state.ui.expandedView.goalAddress,
    goal: state.goals[state.ui.expandedView.goalAddress],
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
