import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import StatusPicker from './StatusPicker'
import StatusIcon from './StatusIcon'
import Icon from './Icon/Icon'

import { updateGoal } from '../goals/actions'
import HierarchyPicker from './HierarchyPicker/HierarchyPicker'

function MultiEditBar({ selectedGoals, updateGoal }) {
  const defaultViews = {
    status: false,
    squirrels: false,
  }
  const [viewsOpen, setViews] = useState(defaultViews)

  const updateGoals = key => val => {
    selectedGoals.forEach(goal => {
      updateGoal(
        {
          ...goal,
          [key]: val
        },
        goal.address
      )
    })
  }

  return (
    <>
      {viewsOpen.hierarchy && (
        <HierarchyPicker
          selectedHierarchy={selectedGoals[0].hierarchy}
          hierarchyClicked={updateGoals('hierarchy')}
        />
      )}

      <div className='multi_edit_bar'>
        <div
          className='multi_edit_bar_item'
          onClick={() =>
            setViews({ ...defaultViews, status: !viewsOpen.status })
          }>
          <StatusIcon
            size='medium'
            hideTooltip
            status={selectedGoals[0].status}
          />
          {viewsOpen.status && (
            <StatusPicker statusClicked={updateGoals('status')} />
          )}
        </div>
        <div
          className='multi_edit_bar_item'
          onClick={() =>
            setViews({ ...defaultViews, hierarchy: !viewsOpen.hierarchy })
          }>
          <Icon name='hierarchy_5F65FF.png' size='medium' />
        </div>
      </div>
    </>
  )
}

MultiEditBar.propTypes = {
  selectedGoals: PropTypes.arrayOf(
    PropTypes.shape({
      content: PropTypes.string.isRequired,
      user_hash: PropTypes.string.isRequired,
      unix_timestamp: PropTypes.number.isRequired,
      hierarchy: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      address: PropTypes.string,
    })
  ).isRequired,
  updateGoal: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  return {
    selectedGoals: state.ui.selection.selectedGoals.map(
      address => state.goals[address]
    ),
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateGoal: (goal, address) => {
      return dispatch(updateGoal.create({ address, goal }))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MultiEditBar)
