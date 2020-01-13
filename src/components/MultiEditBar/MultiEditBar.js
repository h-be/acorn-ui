import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import useOnClickOutside from 'use-onclickoutside'
import { updateGoal } from '../../goals/actions'
import moment from 'moment'

import './MultiEditBar.css'

import Icon from '../Icon/Icon'
import Avatar from '../Avatar/Avatar'
import StatusIcon from '../StatusIcon/StatusIcon'

import StatusPicker from '../StatusPicker'
import HierarchyPicker from '../HierarchyPicker/HierarchyPicker'
import PeoplePicker from '../PeoplePicker'

function MultiEditBar({ selectedGoals, updateGoal }) {
  const defaultViews = {
    status: false,
    squirrels: false,
    hierarchy: false,
  }
  const [viewsOpen, setViews] = useState(defaultViews)

  const updateGoals = key => val => {
    selectedGoals.forEach(goal => {
      updateGoal(
        {
          ...goal,
          timestamp_updated: moment().unix(),
          [key]: val,
        },
        goal.address
      )
    })
  }

  const multiEditBarSquirrelsClass = viewsOpen.squirrels ? 'active' : ''
  const multiEditBarHierarchyClass = viewsOpen.hierarchy ? 'active' : ''
  const multiEditBarTimeframeClass = viewsOpen.timeframe ? 'active' : ''

  const toggleView = key => {
    setViews({ ...defaultViews, [key]: !viewsOpen[key] })
  }

  return (
    <div className='multi_edit_bar'>
      {/* status */}
      <StatusIcon
        size='small'
        key='squirrels'
        notHoverable
        hideTooltip
        status={selectedGoals[0].status}
        onClick={() => toggleView('status')}
      />
      {viewsOpen.status && (
        <StatusPicker
          statusClicked={updateGoals('status')}
          onClose={() => setViews({ ...defaultViews })}
        />
      )}
      {/* squirrels */}
      <Icon
        name='squirrel.svg'
        className={multiEditBarSquirrelsClass}
        key='squirrels'
        onClick={() => toggleView('squirrels')}
      />
      {viewsOpen.squirrels && (
        <PeoplePicker onClose={() => setViews({ ...defaultViews })} />
      )}
      {/* hierarchy */}
      <Icon
        name='hierarchy.svg'
        className={multiEditBarHierarchyClass}
        key='hierarchy'
        onClick={() => toggleView('hierarchy')}
      />
      {viewsOpen.hierarchy && (
        <HierarchyPicker
          selectedHierarchy={selectedGoals[0].hierarchy}
          hierarchyClicked={updateGoals('hierarchy')}
          onClose={() => setViews({ ...defaultViews })}
        />
      )}
    </div>
  )
}

MultiEditBar.propTypes = {
  selectedGoals: PropTypes.arrayOf(
    PropTypes.shape({
      content: PropTypes.string.isRequired,
      user_hash: PropTypes.string.isRequired,
      timestamp_created: PropTypes.number.isRequired,
      timestamp_updated: PropTypes.number.isRequired,
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
