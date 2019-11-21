import React, { useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Icon from './Icon'
import PeoplePicker from './PeoplePicker'
import StatusPicker from './StatusPicker'
import HierarchyPicker from './HierarchyPicker/HierarchyPicker'
import StatusIcon from './StatusIcon'

import {
  archiveGoal,
  updateGoal
} from '../goals/actions'
import {
  closeGoalForm
} from '../goal-form/actions'

function VerticalActionsList({ goalAddress, goal, onArchiveClick, updateGoal }) {

  const defaultViews = {
    status: false,
    squirrels: false
  }
  const [viewsOpen, setViews] = useState(defaultViews)

  const updateGoalStatus = (status) => {
    updateGoal({
      content: goal.content,
      user_hash: goal.user_hash,
      unix_timestamp: Date.now(),
      hierarchy: goal.hierarchy,
      status
    }, goalAddress)
  }

  const updateGoalHierarchy = hierarchy => {
    updateGoal({
      content: goal.content,
      user_hash: goal.user_hash,
      unix_timestamp: Date.now(),
      hierarchy,
      status: goal.status
    }, goalAddress)
  }

  return (
    <div className='vertical_actions_list'>
      {/* status */}
      <div className='action_list_item' key='status' onClick={() => setViews({ ...defaultViews, status: !viewsOpen.status })}>
        <StatusIcon size='small' status={goal.status} hideTooltip />
        <span>status</span>
      </div>
      {viewsOpen.status && <StatusPicker selectedStatus={goal.status} statusClicked={updateGoalStatus} onClose={() => setViews({ ...defaultViews })} />}
      {/* squirrels */}
      <div className='action_list_item' key='squirrels' onClick={() => setViews({ ...defaultViews, squirrels: !viewsOpen.squirrels })}>
        <Icon name='squirrel_white.svg' />
        <span>squirrels</span>
      </div>
      {viewsOpen.squirrels && <PeoplePicker onClose={() => setViews({ ...defaultViews })} />}
      {/* Hierarchies */}
      <div className='action_list_item' key='hierarchies' onClick={() => setViews({ ...defaultViews, hierarchy: !viewsOpen.hierarchy })}>
        <Icon name='hierarchy_white.svg' />
        <span>hierarchy</span>
      </div>
      {viewsOpen.hierarchy && <HierarchyPicker onClose={() => setViews({ ...defaultViews })} selectedHierarchy={goal.hierarchy} hierarchyClicked={updateGoalHierarchy} />}
      {/* archive */}
      <div className='action_list_item' key='archive' onClick={() => onArchiveClick(goalAddress)}>
        <Icon name='archive_white.svg' />
        <span>archive</span>
      </div>
    </div>
  )
}

VerticalActionsList.propTypes = {
  goalAddress: PropTypes.string.isRequired,
  goal: PropTypes.shape({
    content: PropTypes.string.isRequired,
    user_hash: PropTypes.string.isRequired,
    unix_timestamp: PropTypes.number.isRequired,
    hierarchy: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired
  }).isRequired,
  onArchiveClick: PropTypes.func.isRequired,
  updateGoal: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const goalAddress = state.ui.goalForm.editAddress
  return {
    goalAddress,
    goal: state.goals[goalAddress]
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onArchiveClick: (address) => {
      return dispatch(archiveGoal.create({ address }))
    },
    updateGoal: (goal, address) => {
      return dispatch(updateGoal.create({ address, goal }))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VerticalActionsList)
