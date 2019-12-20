import React, { Component } from 'react'
import './ActivityHistory.css'
import { fetchGoalHistory } from '../../../../goal-history/actions'
import { connect } from 'react-redux'
import moment from 'moment'
import Avatar from '../../../Avatar/Avatar'

class ActivityHistory extends Component {
  constructor(props) {
    super(props)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.differents = this.differents.bind(this)
  }
  componentDidMount() {
    this.props.fetchGoalHistory({
      address: this.props.goalAddress,
    })
  }
  differents(history) {
    let vector = []

    if (Object.keys(history).length > 0) {
      Object.values(history).map(value => {
        value.entries.map((entry, index) => {
          if (entry.timestamp_updated === null) {
            vector.push({
              user: entry.user_hash,
              time: entry.timestamp_created,
              comment: 'create the goal',
            })
          } else {
            if (value.entries[index - 1].content !== entry.content) {
              vector.push({
                user: entry.user_edit_hash,
                time: entry.timestamp_updated,
                comment: 'change the conten for ' + entry.content,
              })
            }
            if (value.entries[index - 1].hierarchy !== entry.hierarchy) {
              vector.push({
                user: entry.user_edit_hash,
                time: entry.timestamp_updated,
                comment: 'change the hierachy for ' + entry.hierarchy,
              })
            }
            if (value.entries[index - 1].description !== entry.description) {
              vector.push({
                user: entry.user_edit_hash,
                time: entry.timestamp_updated,
                comment: 'change the description for ' + entry.description,
              })
            }
            if (value.entries[index - 1].status !== entry.status) {
              vector.push({
                user: entry.user_edit_hash,
                time: entry.timestamp_updated,
                comment: 'change the status for ' + entry.status,
              })
            }
            if (value.entries[index - 1].tags !== entry.tags) {
              vector.push({
                user: entry.user_edit_hash,
                time: entry.timestamp_updated,
                comment: 'change the tags for ' + entry.tags,
              })
            }
          }
        })
      })
    }
    return vector
  }
  render() {
    return (
      <div className='history'>
        {this.differents(this.props.goalHistory).map((value, index) => (
          <React.Fragment key={index}>
            <Avatar
              avatar_url={this.props.agents[value.user].avatar_url}
              small={true}
            />
            <div className='history-Body'>
              {console.log('value', value)}
              <div className='history-Header'>
                <span className='history-Date'>
                  {moment.unix(value.time).format(' MMMM Do, YYYY  h:mma')}
                </span>
              </div>
              <div className='history-content'>
                <h3 className='history-Author'>
                  {this.props.agents[value.user].first_name +
                    ' ' +
                    this.props.agents[value.user].last_name}
                </h3>
                <span className='history-Comment'>{value.comment}</span>
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
    )
  }
}

function mapStateToProps(state) {
  const goalAddress = state.ui.expandedView.goalAddress
  console.log(state.ui.goalHistory)
  return {
    goalAddress,

    agents: state.agents,
    goalHistory: state.ui.goalHistory,
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
