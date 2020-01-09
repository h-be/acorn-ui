import React, { Component } from 'react'
import './ActivityHistory.css'
import { fetchGoalHistory } from '../../../../goal-history/actions'
import { connect } from 'react-redux'
import moment from 'moment'
import Avatar from '../../../Avatar/Avatar'
import Icon from '../../../Icon/Icon'
import StatusIcon from '../../../StatusIcon'
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

    if (history && Object.keys(history).length > 0) {
      history.entries.map((entry, index) => {
        if (entry.timestamp_updated === null) {
          vector.push({
            user: entry.user_hash,
            time: entry.timestamp_created,
            comment: 'created a new goal',
          })
        } else {
          if (history.entries[index - 1].content !== entry.content) {
            vector.push({
              user: entry.user_edit_hash,
              time: entry.timestamp_updated,
              comment: `changed card's title from "${
                history.entries[index - 1].content
              }" to "${entry.content}" `,
              icon: 'font.svg',
            })
          }
          if (history.entries[index - 1].hierarchy !== entry.hierarchy) {
            let icon = ''
            if (entry.hierarchy == 'Leaf') {
              icon = 'leaf.svg'
            } else if (entry.hierarchy == 'Branch') {
              icon = 'branch-with-leaf.png'
            } else if (entry.hierarchy == 'Trunk') {
              icon: 'trunk.png'
            } else if (entry.hierarchy == 'Root') {
              icon: 'root.png'
            } else if (entry.hierarchy == 'No Hierarchy') {
              icon: 'question-mark.svg'
            }
            vector.push({
              user: entry.user_edit_hash,
              time: entry.timestamp_updated,
              comment: `changed hierachy from "${
                history.entries[index - 1].hierarchy
              }" to "${entry.hierarchy}" `,
              icon: icon,
            })
          }
          if (history.entries[index - 1].description !== entry.description) {
            vector.push({
              user: entry.user_edit_hash,
              time: entry.timestamp_updated,
              comment: `changed description from "${
                history.entries[index - 1].description
              }" to "${entry.description}"`,
              icon: 'font.svg',
            })
          }
          if (history.entries[index - 1].status !== entry.status) {
            vector.push({
              user: entry.user_edit_hash,
              time: entry.timestamp_updated,
              comment: `changed status from "${
                history.entries[index - 1].status
              }" to "${entry.status}"`,
              statusIcon: entry.status,
            })
          }
          if (history.entries[index - 1].tags !== entry.tags) {
            vector.push({
              user: entry.user_edit_hash,
              time: entry.timestamp_updated,
              comment: 'change the tags for ' + entry.tags,
            })
          }
        }
      })
    }
    return vector
  }
  render() {
    return (
      <div className='history'>
        {this.differents(this.props.goalHistory).map((value, index) => (
          <React.Fragment key={index}>
            <div className='history-Body-Container'>
              {value.statusIcon ? (
                <StatusIcon
                  status={value.statusIcon}
                  className='custom-status-icon'
                />
              ) : (
                <Icon name={value.icon} size={'small'} />
              )}
              <div className='history-Body-Avatar'>
                <Avatar
                  avatar_url={this.props.agents[value.user].avatar_url}
                  small={true}
                />
              </div>

              <div className='history-Body'>
                <div className='history-Header'>
                  <span className='history-Date'>
                    {moment.unix(value.time).format(' MMMM Do, YYYY  h:mma')}
                  </span>
                </div>
                <div className='history-content'>
                  <p className='history-Comment'>
                    <span className='history-Author'>
                      {this.props.agents[value.user].first_name +
                        ' ' +
                        this.props.agents[value.user].last_name}
                    </span>{' '}
                    {value.comment}
                  </p>
                </div>
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
  return {
    goalAddress,

    agents: state.agents,
    goalHistory: state.ui.goalHistory[goalAddress],
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
