import React from 'react'
import './LoadingScreen.css'

function LoadingScreen() {
  throw new Error('eh')
  return (
    <div className='loading_screen_wrapper'>
      <div className='loading_screen'>
        <img src='img/acorn-logo.svg' />
        <div>collecting your acorns...</div>
      </div>
    </div>
  )
}

export default LoadingScreen
