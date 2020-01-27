import React, { memo, useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import './Notifications.css'
import { fetchGoalHistory } from '../../goal-history/actions'
import moment from 'moment'
import Avatar from '../Avatar/Avatar'
import Icon from '../Icon/Icon'
import StatusIcon from '../StatusIcon/StatusIcon'
import HierarchyIcon from '../HierarchyIcon/HierarchyIcon'
import { element } from 'prop-types'

export default memo(() => {
  const dispatch = useDispatch()
  const fetch_goalHistory = useCallback(address =>
    dispatch(fetchGoalHistory.create({ address }))
  )
  const [indice, setIndice] = useState([])
  const { goalsAddress, agents, notifications, goals } = useSelector(state => {
    const goalsAddress = Object.keys(state.goals)
    let notifications = []
    goalsAddress.forEach(goalAddress => {
      if (state.ui.goalHistory[goalAddress]) {
        notifications.push(state.ui.goalHistory[goalAddress])
      }
    })
    return {
      goalsAddress,
      goals: state.goals,
      agents: state.agents,
      notifications,
    }
  })
  useEffect(() => {
    goalsAddress.forEach(goalAddress => {
      fetch_goalHistory(goalAddress)
    })
    const id = setInterval(() => {
      goalsAddress.forEach(goalAddress => {
        fetch_goalHistory(goalAddress)
      })
    }, 3000)

    return () => {
      clearInterval(id)
    }
  }, [])
  return (
    <div className='notifications'>
      <h2 className='notifications-title'>notifications</h2>
      <div className='notifications-content'>
        <ul>
          {differents(notifications, agents, goals)
            .sort((a, b) => {
              if (a.time < b.time) {
                return 1
              } else if (a.time > b.time) return -1
              else return 0
            })
            .map((value, index) => (
              <li
                className={
                  indice.find(element => element === index) === undefined
                    ? ''
                    : 'white'
                }
                onClick={() => {
                  if (indice.find(element => element == index) === undefined) {
                    indice.push(index)
                    setIndice(indice)
                  }
                }}
                key={index}>
                <div className='notifications-Body-Container'>
                  {value.statusIcon && (
                    <StatusIcon
                      status={value.statusIcon}
                      className='status-icon-activity-notifications'
                      notHoverable
                      hideTooltip
                    />
                  )}
                  {!value.statusIcon && !value.hierarchyIcon && (
                    <Icon
                      name={value.icon}
                      size='small'
                      className='grey not-hoverable'
                    />
                  )}
                  {value.hierarchyIcon && (
                    <HierarchyIcon
                      hierarchy={value.hierarchyIcon}
                      size='small'
                      className='grey'
                    />
                  )}
                  <div className='notifications-Body-Avatar'>
                    <Avatar
                      avatar_url={agents[value.user].avatar_url}
                      small={true}
                    />
                  </div>

                  <div className='notifications-Body'>
                    <div className='notifications-Header'>
                      <span className='notifications-date'>
                        {moment.unix(value.time).calendar(null, {
                          lastDay: '[Yesterday at] LT',
                          sameDay: '[Today at] LT',
                          nextDay: '[Tomorrow at] LT',
                          lastWeek: '[last] dddd [at] LT',
                          nextWeek: 'dddd [at] LT',
                          sameElse: 'MMM Do YYYY [at] LT',
                        })}
                      </span>
                    </div>
                    <div>
                      <p className='notifications-info'>
                        <span className='notifications-Author'>
                          {agents[value.user].first_name +
                            ' ' +
                            agents[value.user].last_name}
                        </span>{' '}
                        {value.comment}
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </div>
      <span
        onClick={() => {
          setIndice([...Array(5).keys()])
        }}>
        clear all
      </span>
    </div>
  )
})

function checkTimeframeSame(oldTimeframe, newTimeframe) {
  if (newTimeframe && !oldTimeframe) {
    return false
  } else if (oldTimeframe && !newTimeframe) {
    return false
  } else if (!oldTimeframe && !newTimeframe) {
    return true
  } else if (
    oldTimeframe.from_date === newTimeframe.from_date &&
    oldTimeframe.to_date === newTimeframe.to_date
  ) {
    return true
  }
}

function FormatTimeframeDisplay({ timeframe }) {
  const fromDate = timeframe ? moment.unix(timeframe.from_date) : null
  const toDate = timeframe ? moment.unix(timeframe.to_date) : null

  return (
    <>
      {fromDate && fromDate.format('MMM D, YYYY')}
      {toDate && ' - '}
      {toDate && toDate.format('MMM D, YYYY')}
      {!fromDate && !toDate && 'not set'}
    </>
  )
}

function differents(notifications, agents, goals) {
  let vector = []

  if (notifications && Object.keys(notifications).length > 0) {
    notifications.map(item =>
      item.entries.map((entry, index) => {
        if (entry.timestamp_updated === null) {
          vector.push({
            user: entry.user_hash,
            time: entry.timestamp_created,
            comment: 'created this goal',
          })
        } else {
          const previousGoalVersion = item.entries[index - 1]

          if (!previousGoalVersion) {
            return
          }

          // title/content
          if (previousGoalVersion.content !== entry.content) {
            vector.push({
              user: entry.user_edit_hash,
              time: entry.timestamp_updated,
              comment: `changed title of the card "${previousGoalVersion.content}" to "${entry.content}" `,
              icon: 'font.svg',
            })
          }
          // hierarchy
          if (previousGoalVersion.hierarchy !== entry.hierarchy) {
            vector.push({
              user: entry.user_edit_hash,
              time: entry.timestamp_updated,
              comment: `changed hierachy from "${previousGoalVersion.hierarchy}" to "${entry.hierarchy}" `,
              hierarchyIcon: entry.hierarchy,
            })
          }
          // description
          if (previousGoalVersion.description !== entry.description) {
            vector.push({
              user: entry.user_edit_hash,
              time: entry.timestamp_updated,
              comment: `changed description from "${previousGoalVersion.description}" to "${entry.description}"`,
              icon: 'font.svg',
            })
          }
          // status
          if (previousGoalVersion.status !== entry.status) {
            vector.push({
              user: entry.user_edit_hash,
              time: entry.timestamp_updated,
              comment: `changed the ${entry.content} status from "${previousGoalVersion.status}" to "${entry.status}"`,
              statusIcon: entry.status,
            })
          }
          // tags
          if (previousGoalVersion.tags !== entry.tags) {
            vector.push({
              user: entry.user_edit_hash,
              time: entry.timestamp_updated,
              comment: 'changed the tags for ' + entry.tags,
            })
          }
          // timeframe added
          if (!previousGoalVersion.time_frame && entry.time_frame) {
            vector.push({
              user: entry.user_edit_hash,
              time: entry.timestamp_updated,
              comment: (
                <>
                  added the timeframe{' '}
                  {<FormatTimeframeDisplay timeframe={entry.time_frame} />} to
                  this goal
                </>
              ),
              icon: 'calendar.svg',
            })
          } else if (
            !checkTimeframeSame(
              previousGoalVersion.time_frame,
              entry.time_frame
            )
          ) {
            vector.push({
              user: entry.user_edit_hash,
              time: entry.timestamp_updated,
              comment: (
                <>
                  changed timeframe from{' '}
                  {
                    <FormatTimeframeDisplay
                      timeframe={previousGoalVersion.time_frame}
                    />
                  }{' '}
                  to {<FormatTimeframeDisplay timeframe={entry.time_frame} />}
                </>
              ),
              icon: 'calendar.svg',
            })
          }
        }
      })
    )
    notifications.map(item =>
      item.members.map(members => {
        members.map((member, index) => {
          if (index === 0) {
            vector.push({
              user: member.user_edit_hash,
              time: member.unix_timestamp,
              comment: `added "${agents[member.agent_address].first_name} ${
                agents[member.agent_address].last_name
              }" as a squirrel to ${goals[member.goal_address].content}`,
              icon: 'squirrel.svg',
            })
          }
          if (index === 1) {
            vector.push({
              user: member.user_edit_hash,
              time: member.unix_timestamp,
              comment: `removed "${agents[member.agent_address].first_name} ${
                agents[member.agent_address].last_name
              }" as a squirrel to ${goals[member.goal_address].content}`,
            })
          }
        })
      })
    )
  }

  return vector
}
