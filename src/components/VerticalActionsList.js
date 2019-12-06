import React, { useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Icon from './Icon/Icon'
import PeoplePicker from './PeoplePicker'
import StatusPicker from './StatusPicker'
import HierarchyPicker from './HierarchyPicker/HierarchyPicker'
import Priority from './Priority/Priority'
import StatusIcon from './StatusIcon'

import { archiveGoal, updateGoal } from '../goals/actions'
import { closeGoalForm } from '../goal-form/actions'

function VerticalActionListItem({ onClick, label, icon }) {
  return (
    <div className='action_list_item' onClick={onClick}>
      {icon}
      <span>{label}</span>
    </div>
  )
}

function VerticalActionsList({
  goalAddress,
  goal,
  onArchiveClick,
  updateGoal,
}) {
  const defaultViews = {
    status: false,
    squirrels: false,
    priority: false,
    hierarchy: false,
  }
  const [viewsOpen, setViews] = useState(defaultViews)

  const innerUpdateGoal = key => val => {
    updateGoal(
      {
        ...goal,
        [key]: val,
      },
      goalAddress
    )
  }

  const toggleView = (key) => {
    setViews({ ...defaultViews, [key]: !viewsOpen[key] })
  }

  return (
    <div className='vertical_actions_list'>
      {/* status */}
      <VerticalActionListItem
        label='status'
        icon={<StatusIcon size='small' status={goal.status} hideTooltip />}
        onClick={() => toggleView('status')}
      />
      {viewsOpen.status && (
        <StatusPicker
          selectedStatus={goal.status}
          statusClicked={innerUpdateGoal('status')}
          onClose={() => setViews({ ...defaultViews })}
        />
      )}
      {/* squirrels */}
      <VerticalActionListItem
        label='squirrels'
        icon={<Icon name='squirrel_white.svg' />}
        onClick={() => toggleView('squirrels')}
      />
      {viewsOpen.squirrels && (
        <PeoplePicker onClose={() => setViews({ ...defaultViews })} />
      )}
      {/* hierarchy */}
      <VerticalActionListItem
        label='hierarchy'
        icon={<Icon name='hierarchy_white.svg' />}
        onClick={() => toggleView('hierarchy')}
      />
      {viewsOpen.hierarchy && (
        <HierarchyPicker
          onClose={() => setViews({ ...defaultViews })}
          selectedHierarchy={goal.hierarchy}
          hierarchyClicked={innerUpdateGoal('hierarchy')}
        />
      )}
      {/* priority */}
      <VerticalActionListItem
        label='priority'
        icon={<Icon name='priority_white.svg' />}
        onClick={() => toggleView('priority')}
      />
      {viewsOpen.priority && (
        <Priority
          onClose={() => setViews({ ...defaultViews })}
        />
      )}
      {/* archive */}
      <VerticalActionListItem
        label='archive'
        icon={<Icon name='archive_white.svg' />}
        onClick={() => onArchiveClick(goalAddress)}
      />
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
    status: PropTypes.string.isRequired,
  }).isRequired,
  onArchiveClick: PropTypes.func.isRequired,
  updateGoal: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  const goalAddress = state.ui.goalForm.editAddress
  return {
    goalAddress,
    goal: state.goals[goalAddress],
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onArchiveClick: address => {
      return dispatch(archiveGoal.create({ address }))
    },
    updateGoal: (goal, address) => {
      return dispatch(updateGoal.create({ address, goal }))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VerticalActionsList)
