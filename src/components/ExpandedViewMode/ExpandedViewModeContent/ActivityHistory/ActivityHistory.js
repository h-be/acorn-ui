import React, { Component } from 'react'
import './ActivityHistory.css'
class ActivityHistory extends Component {
  render() {
    return (
      <div className='history'>
        <img src='#' className='historyPic' alt='user Pic' />
        <div className='historyBody'>
          <div className='historyHeader'>
            <span className='historyDate'>fecha</span>
          </div>
          <div style={{ display: 'flex' }}>
            <h3
              className='historyAuthor'
              style={{ margin: '0', marginRight: '15px' }}>
              Nombre user
            </h3>
            <span className='historyContent'>comentario</span>
          </div>
        </div>
      </div>
    )
  }
}

export default ActivityHistory
