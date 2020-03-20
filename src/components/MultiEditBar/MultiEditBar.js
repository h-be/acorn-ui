import React, { useState, useEffect } from 'react'
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
import PeoplePicker from '../PeoplePicker/PeoplePicker'
import DatePicker from '../DatePicker/DatePicker'
import HierarchyPicker from '../HierarchyPicker/HierarchyPicker'
import AlertPopupTemplate from '../AlertPopupTemplate/AlertPopupTemplate'

function MultiEditBar({
  selectedGoals = [],
  updateGoal,
  hasSelection,
  archiveGoal,
}) {
  const defaultViews = {
    status: false,
    squirrels: false,
    timeframe: false,
    hierarchy: false,
    archive: false,
  }
  const [popup, setPopup] = useState(false)
  const [viewsOpen, setViews] = useState(defaultViews)

  const [statusColor, setStatusColor] = useState(
    selectedGoals.length ? selectedGoals[0].status : 'Uncertain'
  )

  useEffect(() => {
    if (selectedGoals.length) {
      setStatusColor(selectedGoals[0].status)
    }
  }, [selectedGoals])

  // close any popups if you deselect
  useEffect(() => {
    if (!hasSelection) {
      setViews({ ...defaultViews })
    }
  }, [hasSelection])

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

  const archiveGoals = () => {
    selectedGoals.forEach(goal => archiveGoal(goal.address))
  }

  const multiEditBarSquirrelsClass = viewsOpen.squirrels ? 'active' : ''
  const multiEditBarHierarchyClass = viewsOpen.hierarchy ? 'active' : ''
  const multiEditBarTimeframeClass = viewsOpen.timeframe ? 'active' : ''
  const multiEditBarArchiveClass = viewsOpen.archive ? 'active' : ''

  const toggleView = key => {
    if (!viewsOpen[key]) {
      setPopup(true)
    }
    setViews({ ...defaultViews, [key]: !viewsOpen[key] })
  }

  const reset = () => {
    setPopup(false)
    setViews({ ...defaultViews })
  }

  const statusAlertContent = (
    <div>
      This function will override the statuses on all selected cards. Proceed?
    </div>
  )

  const squirrelsAlertContent = (
    <div>
      This function will override the existing associated members on all
      selected cards. Proceed?
    </div>
  )

  const timeframeAlertContent = (
    <div>
      This function will override the existing timeframes set on all selected
      cards. Proceed?
    </div>
  )

  const hierarchyAlertContent = (
    <div>
      This function will override the existing hierarchy levels on all selected
      cards. Proceed?
    </div>
  )

  const archiveContent = (
    <div>
      You're about to archive the following {selectedGoals.length} card(s):
      <div className='alert-popup-goals-list'>
        {selectedGoals.map(goal => (
          <div>{goal.content}</div>
        ))}
      </div>
      You will be able to see these cards in the archive view mode in the
      future. Proceed?
    </div>
  )

  /* timeframe consts */

  const updateTimeframe = (start, end) => {
    let timeframe = null

    if (start && end) {
      timeframe = {
        from_date: start,
        to_date: end,
      }
    }

    updateGoals('time_frame')(timeframe)
  }

  return (
    <>
      <div className={`multi-edit-bar ${hasSelection ? 'has-selection' : ''}`}>
        {/* status */}
        <StatusIcon
          size='small-MultiEditBar'
          key='status'
          notHoverable
          hideTooltip
          status={statusColor}
          onClick={() => toggleView('status')}
        />
        {viewsOpen.status && (
          <StatusPicker
            statusClicked={updateGoals('status')}
            onClose={() => setViews({ ...defaultViews })}
          />
        )}
        {/* squirrels */}
        {/* TODO: connect multi edit squirrels */}
        {/* <Icon
          name='squirrel.svg'
          size='medium-MultiEditBar'
          className={multiEditBarSquirrelsClass}
          key='squirrels'
          onClick={() => toggleView('squirrels')}
        />
        {viewsOpen.squirrels && (
          <PeoplePicker onClose={() => setViews({ ...defaultViews })} />
        )} */}
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
        {viewsOpen.hierarchy && selectedGoals.length > 0 && (
          <HierarchyPicker
            selectedHierarchy={selectedGoals[0].hierarchy}
            hierarchyClicked={updateGoals('hierarchy')}
            onClose={() => setViews({ ...defaultViews })}
          />
        )}
        {/* archive */}
        <Icon
          name='archive.svg'
          key='archive'
          className={multiEditBarArchiveClass}
          onClick={() => toggleView('archive')}
        />
      </div>
      {selectedGoals.length > 1 && popup && (
        <>
          {viewsOpen.status && (
            <AlertPopupTemplate
              onClose={reset}
              className='status-popup'
              heading='Setting Status for Multiple Cards'
              content={statusAlertContent}
              popupIcon='status-unknown.svg'
              primaryButton='Yes, Proceed'
              altButton='Nevermind'
              primaryButtonAction={() => setPopup(false)}
              altButtonAction={reset}
            />
          )}
          {viewsOpen.squirrels && (
            <AlertPopupTemplate
              onClose={reset}
              className='squirrel-popup'
              heading='Associating Members for Multiple Cards'
              content={squirrelsAlertContent}
              popupIcon='squirrel.svg'
              primaryButton='Yes, Proceed'
              altButton='Nevermind'
              primaryButtonAction={() => setPopup(false)}
              altButtonAction={reset}
            />
          )}
          {viewsOpen.timeframe && (
            <AlertPopupTemplate
              onClose={reset}
              className='timeframe-popup'
              heading='Setting Timeframe for Multiple Cards'
              content={timeframeAlertContent}
              popupIcon='calendar.svg'
              primaryButton='Yes, Proceed'
              altButton='Nevermind'
              primaryButtonAction={() => setPopup(false)}
              altButtonAction={reset}
            />
          )}
          {viewsOpen.hierarchy && (
            <AlertPopupTemplate
              onClose={reset}
              className='hierarchy-popup'
              heading='Setting Hierarchy for Multiple Cards'
              content={hierarchyAlertContent}
              popupIcon='hierarchy.svg'
              primaryButton='Yes, Proceed'
              altButton='Nevermind'
              primaryButtonAction={() => setPopup(false)}
              altButtonAction={reset}
            />
          )}
        </>
      )}
      {viewsOpen.archive && (
        <AlertPopupTemplate
          onClose={reset}
          className='archive-popup'
          heading='Archiving'
          content={archiveContent}
          popupIcon='archive.svg'
          primaryButton='Yes, Archive'
          altButton='Nevermind'
          primaryButtonAction={archiveGoals}
          altButtonAction={reset}
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
    archiveGoal: address => {
      return dispatch(archiveGoal.create({ address }))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MultiEditBar)
