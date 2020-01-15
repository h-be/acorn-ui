import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import useOnClickOutside from 'use-onclickoutside'
import { archiveGoal, updateGoal } from '../../goals/actions'
import moment from 'moment'

import './MultiEditBar.css'

import Icon from '../Icon/Icon'
import Avatar from '../Avatar/Avatar'
import StatusIcon from '../StatusIcon/StatusIcon'

import StatusPicker from '../StatusPicker'
import PeoplePicker from '../PeoplePicker'
import DatePicker from '../DatePicker/DatePicker'
import HierarchyPicker from '../HierarchyPicker/HierarchyPicker'
import AlertPopupTemplate from '../AlertPopupTemplate/AlertPopupTemplate'

function MultiEditBar({ selectedGoals, updateGoal }) {
  const defaultViews = {
    status: false,
    squirrels: false,
    timeframe: false,
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
  const multiEditBarArchiveClass = viewsOpen.archive ? 'active' : ''

  const toggleView = key => {
    setViews({ ...defaultViews, [key]: !viewsOpen[key] })
  }

  const archiveContent = (
    <div>
      You’re about to archive the {selectedGoals.length} following cards:
      {selectedGoals.map(goal => (
        <div>{goal.content}</div>
      ))}
      You will be able to see this card in the archive view mode in the
      future. Proceed?
    </div>
  )

  /* timeframe consts */

  const updateTimeframe = (start, end) => {
    updateGoals('time_frame')({
      from_date: start,
      to_date: end,
    })
  }

  return (
    <>
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
          size='medium-MultiEditBar'
          className={multiEditBarSquirrelsClass}
          key='squirrels'
          onClick={() => toggleView('squirrels')}
        />
        {viewsOpen.squirrels && (
          <PeoplePicker onClose={() => setViews({ ...defaultViews })} />
        )}
        {/* timeframe */}
        <Icon
          name='calendar.svg'
          size='medium-MultiEditBar'
          className={multiEditBarTimeframeClass}
          key='timeframe'
          onClick={() => toggleView('timeframe')}
        />
        {viewsOpen.timeframe && (
          <DatePicker
            onClose={() => setViews({ ...defaultViews })}
            onSet={updateTimeframe}
          />
        )}
        {/* hierarchy */}
        <Icon
          name='hierarchy.svg'
          size='medium-MultiEditBar'
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
        {/* archive */}
        <Icon
          name='archive.svg'
          className={multiEditBarArchiveClass}
          onClick={() => toggleView('archive')}
        />
      </div>
      {viewsOpen.archive && (
        <AlertPopupTemplate
          onClose={() => setViews({ ...defaultViews })}
          className='archive_popup'
          heading='Archiving'
          content={archiveContent}
          popupIcon='archive.svg'
          primaryButton='Yes, Archive'
          altButton='Nevermind'
          primaryButtonAction={() => onArchiveClick(goalAddress)}
          altButtonAction={() => setViews({ ...defaultViews })}
        />
      )}
    </>
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
    onArchiveClick: address => {
      return dispatch(archiveGoal.create({ address }))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MultiEditBar)
