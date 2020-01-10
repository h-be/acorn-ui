import React, { useState } from 'react'
import moment from 'moment'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Icon from './Icon/Icon'
import StatusPicker from './StatusPicker'
import PeoplePicker from './PeoplePicker'
import DatePicker from './DatePicker/DatePicker'
import HierarchyPicker from './HierarchyPicker/HierarchyPicker'
import PriorityPicker from './PriorityPicker/PriorityPicker'
import StatusIcon from './StatusIcon'

import { archiveGoal, updateGoal } from '../goals/actions'
import { closeGoalForm } from '../goal-form/actions'
import AlertPopupTemplate from './AlertPopupTemplate/AlertPopupTemplate'

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
    timeframe: false,
    priority: false,
    hierarchy: false,
  }
  const [viewsOpen, setViews] = useState(defaultViews)

  const innerUpdateGoal = key => val => {
    updateGoal(
      {
        ...goal,
        timestamp_updated: moment().unix(),
        [key]: val,
      },
      goalAddress
    )
  }

  const toggleView = key => {
    setViews({ ...defaultViews, [key]: !viewsOpen[key] })
  }

  const archiveContent = (
    <div>
      You’re about to archive the card "<b>{goal.content}</b>
      ". You will be able to see this card in the archive view mode in the
      future. Proceed?
    </div>
  )

  // timeframe consts

  const updateTimeframe = (start, end) => {
    updateGoal(
      {
        ...goal,
        timestamp_updated: moment().unix(),
        time_frame: {
          from_date: start,
          to_date: end,
        },
      },
      goalAddress
    )
  }

  const fromDate = goal.time_frame
    ? moment.unix(goal.time_frame.from_date)
    : null
  const toDate = goal.time_frame ? moment.unix(goal.time_frame.to_date) : null

  return (
    <div className='vertical_actions_list'>
      <VerticalActionListItem
        label='status'
        icon={<StatusIcon size='small' status={goal.status} hideTooltip />}
        onClick={() => toggleView('status')}
      />
      <VerticalActionListItem
        label='squirrels'
        icon={<Icon name='squirrel.svg' className='white not-hoverable' />}
        onClick={() => toggleView('squirrels')}
      />
      <VerticalActionListItem
        label='timeframe'
        icon={<Icon name='calendar.svg' className='white not-hoverable' />}
        onClick={() => toggleView('timeframe')}
      />
      <VerticalActionListItem
        label='hierarchy'
        icon={
          <Icon name='hierarchy_white.svg' className='white not-hoverable' />
        }
        onClick={() => toggleView('hierarchy')}
      />
      <VerticalActionListItem
        label='priority'
        icon={
          <Icon name='priority_white.svg' className='white not-hoverable' />
        }
        onClick={() => toggleView('priority')}
      />
      <VerticalActionListItem
        label='archive'
        icon={<Icon name='archive_white.svg' className='white not-hoverable' />}
        onClick={() => toggleView('archive')}
      />
      {viewsOpen.status && (
        <StatusPicker
          selectedStatus={goal.status}
          statusClicked={innerUpdateGoal('status')}
          onClose={() => setViews({ ...defaultViews })}
        />
      )}
      {viewsOpen.squirrels && (
        <PeoplePicker onClose={() => setViews({ ...defaultViews })} />
      )}
      {viewsOpen.timeframe && (
        <DatePicker
          onClose={() => setViews({ ...defaultViews })}
          onSet={updateTimeframe}
          fromDate={fromDate}
          toDate={toDate}
        />
      )}
      {viewsOpen.hierarchy && (
        <HierarchyPicker
          onClose={() => setViews({ ...defaultViews })}
          selectedHierarchy={goal.hierarchy}
          hierarchyClicked={innerUpdateGoal('hierarchy')}
        />
      )}
      {viewsOpen.priority && (
        <PriorityPicker
          goalAddress={goalAddress}
          onClose={() => setViews({ ...defaultViews })}
        />
      )}
      {viewsOpen.archive && (
        <AlertPopupTemplate
          onClose={() => setViews({ ...defaultViews })}
          className='archive_popup'
          heading='Archiving'
          content={archiveContent}
          popupIcon='archive_4d4d4d.svg'
          primaryButton='Yes, Archive'
          altButton='Nevermind'
          primaryButtonAction={() => onArchiveClick(goalAddress)}
          altButtonAction={() => setViews({ ...defaultViews })}
        />
      )}
    </div>
  )
}

VerticalActionsList.propTypes = {
  goalAddress: PropTypes.string.isRequired,
  goal: PropTypes.shape({
    content: PropTypes.string.isRequired,
    user_hash: PropTypes.string.isRequired,
    timestamp_created: PropTypes.number.isRequired,
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
