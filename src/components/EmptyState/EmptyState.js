import './EmptyState.css'
import React from 'react'

function EmptyState() {
  return (
    <div className='empty_state_wrapper'>
      <div className='empty_state'>
        <div className='empty_state_squirrel_outer'>
          <div className='empty_state_squirrel_middle'>
            <div className='empty_state_squirrel_main clearfix'>
              <div className='squirrel'>
                <div className='tail'>
                  <span className='circle'></span>
                  <span className='square'>
                    <span className='tail_square_right'></span>
                  </span>
                </div>
                <span className='skin'></span>
                <span className='belly'></span>
                <span className='ear left'></span>
                <span className='ear right'></span>
                <span className='nose'></span>
                <div className='mouth'>
                  <span className='tooth'></span>
                </div>
                <div className='eye left'>
                  <span></span>
                </div>
                <div className='eye right'>
                  <span></span>
                </div>
                <span className='leg left'></span>
                <span className='leg right'></span>
                <div className='nut'>
                  <span className='hood'></span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <h1>Welcome to Acorn!</h1>
        <p>
          Hold G and left click anywhere on canvas to create your first goal
          card.
        </p>
        <p>Happy squirreling :)</p>
      </div>
    </div>
  )
}

export default EmptyState
