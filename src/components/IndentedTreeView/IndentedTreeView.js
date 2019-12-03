import React, { useState } from 'react'
import Icon from '../Icon'

import './IndentedTreeView.css'

export default function IndentedTreeView({ goalTree }) {
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
      {goalTree.map(goal => {
        return <p>{goal.content}</p>
      })}
    </div>
  )
}
