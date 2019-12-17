import React, { useState } from 'react'
import Icon from '../Icon/Icon'

import './IndentedTreeView.css'

// Recursive because we don't know
// how deep the nesting goes
function NestedTreeGoal({ goal, level }) {
  level = level || 1
  // set expanded open by default only if
  // at the first or second level
  const [expanded, setExpanded] = useState(level < 3)
  return (
    <div className='indented-view-goal'>
      <div className='indented-view-goal-item'>
        <Icon
          name={expanded ? 'line-angle-up.svg' : 'line-angle-down.svg'}
          size='small'
          className='grey'
          onClick={() => setExpanded(!expanded)}
        />
        <div className='indented-view-goal-content'>{goal.content}</div>
      </div>
      {expanded && goal.children
        ? goal.children.map((childGoal, index) => (
            <div className='indented-view-nested-goal' key={index}>
              <NestedTreeGoal goal={childGoal} level={level + 1} />
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
          onChange={e => setFilterText(e.target.value)}
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
          <NestedTreeGoal goal={goal} key={index} />
        ))}
      </div>
    </div>
  )
}
