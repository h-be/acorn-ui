import React, { Component } from 'react'
import './ActivityHistory.css'
class ActivityHistory extends Component {
  render() {
    return (
      <div>
        <div className='history'>
          <img src='#' className='history-Pic' alt='user Pic' />
          <div className='history-Body'>
            <div className='history-Header'>
              <span className='history-Date'>fecha</span>
            </div>
            <div className='history-Content'>
              <h3 className='history-Author'>Nombre user</h3>
              <span className='history-Comment'>comentario</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ActivityHistory
