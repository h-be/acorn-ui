import './EmptyState.css'
import React from 'react'

function EmptyState() {
  /* <img src='img/squirrel_illustration_empty.png' /> */
  return (
    <div className='empty_state_wrapper'>
      <div className='empty_state'>
        <div class='outer'>
          <div class='middle'>
            <div class='main clearfix'>
              <div class='squirrel'>
                <div class='tail'>
                  <span class='circle'></span>
                  <span class='square'>
                    <span class='sh'></span>
                  </span>
                </div>
                <span class='skin'></span>
                <span class='belly'></span>
                <span class='ear left'></span>
                <span class='ear right'></span>
                <span class='nose'></span>
                <div class='mouth'>
                  <span class='tooth'></span>
                </div>
                <div class='eye left'>
                  <span></span>
                </div>
                <div class='eye right'>
                  <span></span>
                </div>
                <span class='leg left'></span>
                <span class='leg right'></span>
                <div class='nut'>
                  <span class='hood'></span>
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
