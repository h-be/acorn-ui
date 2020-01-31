import React, { useState } from 'react'
import { useLocation, NavLink } from 'react-router-dom'
import Icon from '../Icon/Icon'

import HierarchyIcon from '../HierarchyIcon/HierarchyIcon'

import './IndentedTreeView.css'

// Recursive because we don't know
// how deep the nesting goes
function NestedTreeGoal({ goal, level, filterText }) {
  level = level || 1
  // set expanded open by default only if
  // at the first or second level
  const [expanded, setExpanded] = useState(level < 3)

  const location = useLocation()

  const match =
    !filterText.length ||
    (goal.content && goal.content.toLowerCase().includes(filterText))

  const searchParams = new URLSearchParams(location.search)
  const isUsingGoalAsContext = searchParams.get('contextGoal') === goal.address

  return (
    <div className='indented-view-goal'>
      {match && (
        <div className='indented-view-goal-item'>
          <div className='indented-view-goal-item-arrow'>
            <Icon
              name={expanded ? 'line-angle-down.svg' : 'line-angle-right.svg'}
              size='very-small'
              className='grey'
              onClick={() => setExpanded(!expanded)}
            />
          </div>
          <NavLink
            to={
              location.pathname +
              (isUsingGoalAsContext ? '' : `?contextGoal=${goal.address}`)
            }
            className='indented-view-goal-content'
            isActive={match => match && isUsingGoalAsContext}>
            <div className='indented-view-goal-content-text'>
              <HierarchyIcon
                size='very-small'
                hierarchy={goal.hierarchy}
                status={goal.status}
              />
              {goal.content}
            </div>
          </NavLink>
        </div>
      )}
      {/* if there's a filter, expand everything */}
      {/* since only what matches the filter will show anyways */}
      {(filterText.length || expanded) && goal.children
        ? goal.children.map((childGoal, index) => (
            <div className='indented-view-nested-goal' key={index}>
              <NestedTreeGoal
                filterText={filterText}
                goal={childGoal}
                level={level + 1}
              />
            </div>
          ))
        : null}
    </div>
  )
}

const testGoalTrees = [
  {
    content: 'gg',
    children: [
      {
        content: 'tt',
        children: [
          {
            content: 'test',
          },
        ],
      },
      {
        content: 'xx',
      },
    ],
  },
]

export default function IndentedTreeView({ goalTrees }) {
  const [filterText, setFilterText] = useState('')

  return (
    <div className='indented-view-wrapper'>
      <div className='indented-view-search'>
        <Icon name='search.svg' size='very-small' />
        <input
          type='text'
          onChange={e => setFilterText(e.target.value.toLowerCase())}
          value={filterText}
          placeholder='Search a card or subtree'
          autoFocus
        />
        {filterText !== '' && (
          <button
            onClick={() => {
              setFilterText('')
            }}
            className='clear_button'>
            clear
          </button>
        )}
      </div>
      <div className='indented-view-goals'>
        {/* {testGoalTrees.map(goal => (
          <NestedTreeGoal goal={goal} />
        ))} */}
        {goalTrees.map((goal, index) => (
          <NestedTreeGoal filterText={filterText} goal={goal} key={index} />
        ))}
      </div>
    </div>
  )
}
