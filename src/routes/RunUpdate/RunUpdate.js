import React, { useState } from 'react'
import './RunUpdate.css'

function RunUpdate() {
  /* 0 = 0, 45 = 90, 90 = 135, 135 = 180 */
  /* transform: rotate(45deg); */
  const [progress, setProgress] = useState(10) // percent
  const deg = Math.round((progress / 100) * 180)
  const progressCss = {
    transform: `rotate(${deg}deg)`,
  }
  return (
    <div className='run-update-screen-wrapper'>
      <div className='run-update-screen'>
        <div className='circle-wrap'>
          <div className='circle'>
            <div className='mask full' style={progressCss}>
              <div className='fill' style={progressCss}></div>
            </div>
            <div className='mask half'>
              <div className='fill' style={progressCss}></div>
            </div>
            <div className='inside-circle'>
              <img src='img/acorn-logo.svg' />
            </div>
          </div>
        </div>

        <div className='run-update-screen-heading'>Preparing your update</div>
        <div className='run-update-screen-subheading'>
          Migrating your data. The app will restart shortly.
        </div>
      </div>
    </div>
  )
}

export default RunUpdate
