import React, { Component } from 'react'
import './ActivityHistory.css'
import { fetchGoalHistory } from '../../../../goal-history/actions'
import { connect } from 'react-redux'

class ActivityHistory extends Component {
  componentDidMount = () => {
    this.props.fetchGoalHistory({
      address: this.props.goalAddress,
    })
  }
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

function mapStateToProps(state) {
  const goalAddress = state.ui.expandedView.goalAddress
  return {
    goalAddress,
    avatarAddress: state.whoami.entry.address,
    avatarUrl: state.whoami.entry.avatar_url,
    agents: state.agents,
    state: state,
  }
}
function mapDispatchToProps(dispatch) {
  return {
    fetchGoalHistory: address => {
      return dispatch(fetchGoalHistory.create(address))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ActivityHistory)
