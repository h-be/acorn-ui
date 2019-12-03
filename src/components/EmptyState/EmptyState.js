import './EmptyState.css'
import React from 'react'

function EmptyState() {
  return (
    <div className='empty_state_wrapper'>
      <div className='empty_state'>
        <img src='img/squirrel_illustration_empty.png' />
        <h1>welcome to acorn</h1>
        <h4>
          Hold G and left click anywhere on canvas to create your first goal
          card.
        </h4>
        <h4>Happy squirreling :)</h4>
      </div>
    </div>
  )
}

export default EmptyState
