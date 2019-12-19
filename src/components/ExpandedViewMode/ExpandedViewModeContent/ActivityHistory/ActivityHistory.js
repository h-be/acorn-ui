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
