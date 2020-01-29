import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import './PriorityPicker.css'
import Icon from '../Icon/Icon'
import Button from '../Button/Button'
import PickerTemplate from '../PickerTemplate/PickerTemplate'
import { connect } from 'react-redux'
import moment from 'moment'
import Slider from '@material-ui/core/Slider'
import { makeStyles } from '@material-ui/core/styles'
import {
  addVoteOfGoal,
  archiveVoteOfGoal,
  updateGoalVote,
} from '../../goal-votes/actions'
const useStyles = makeStyles({
  root: {
    color: '#6600FF',
    height: 4,
    borderRadius: 10,
    border: 0,
    padding: '10px 0',
    margin: '10px 20px 10px 20px',
    width: '150px',
  },
  rail: {
    height: 4,
    borderRadius: 10,
  },
  mark: {
    height: 4,
    width: 4,
    borderRadius: 4,
    margin: '0 0 0 -2px',
  },
  markLabel: {
    top: '-18px',
    position: 'absolute',
    fontSize: '12px',
    fontFamily: '"CircularStd-book", "Helvetica", "Arial", "sans-serif"',
    lineHeight: '1',
    color: '#4d4d4d',
  },
  track: {
    height: 4,
    borderRadius: 10,
  },
})

const marksWithLabels = [
  {
    value: 0,
    label: 'low',
  },
  {
    value: 25,
    label: '',
  },
  {
    value: 50,
    label: 'medium',
  },
  {
    value: 75,
    label: '',
  },
  {
    value: 100,
    label: 'high',
  },
]

const marksWithoutLabels = [
  {
    value: 0,
    label: '',
  },
  {
    value: 25,
    label: '',
  },
  {
    value: 50,
    label: '',
  },
  {
    value: 75,
    label: '',
  },
  {
    value: 100,
    label: '',
  },
]
function valuetext(value) {
  return `${value}%`
}

const priorityItems = [
  { icon: 'importance.svg', title: 'Importance' },
  { icon: 'urgency.svg', title: 'Urgency' },
  { icon: 'impact.svg', title: 'Impact' },
  { icon: 'effort.png', title: 'Effort' },
]

function PrioritySlider({
  icon,
  title,
  withLabels,
  value,
  onChange = () => {},
  onChangeCommitted = () => {},
}) {
  const classes = useStyles()
  return (
    <div className='priority_item'>
      <Icon
        className='priority_item_icon not-hoverable'
        name={icon}
        size='small'
      />
      <div className='priority_item_title'>{title}</div>
      <Slider
        onChange={onChange}
        onChangeCommitted={onChangeCommitted}
        defaultValue={50}
        value={value}
        getAriaValueText={valuetext}
        aria-labelledby='discrete-slider-custom'
        step={25}
        valueLabelDisplay='auto'
        marks={withLabels ? marksWithLabels : marksWithoutLabels}
        classes={{
          root: classes.root, // class name, e.g. `classes-nesting-root-x`
          label: classes.label, // class name, e.g. `classes-nesting-label-x`
          rail: classes.rail,
          mark: classes.mark,
          markLabel: classes.markLabel,
          offset: classes.offset,
          track: classes.track,
        }}
      />
    </div>
  )
}

function Aggregated({ votes }) {
  let averageValues = [0, 0, 0, 0]
  if (votes.length > 0) {
    votes.forEach(element => {
      averageValues[0] += element.urgency * 100
      averageValues[1] += element.importance * 100
      averageValues[2] += element.impact * 100
      averageValues[3] += element.effort * 100
    })
    averageValues[0] /= votes.length
    averageValues[1] /= votes.length
    averageValues[2] /= votes.length
    averageValues[3] /= votes.length
  } else {
    averageValues = [50, 50, 50, 50]
  }

  return priorityItems.map(({ icon, title }, index) => {
    return (
      <PrioritySlider
        icon={icon}
        title={title}
        withLabels={index === 0}
        value={averageValues[index]}
      />
    )
  })
}

function WeighIn({ myVote, onUpdate }) {
  myVote = myVote || {
    urgency: 0.5,
    importance: 0.5,
    impact: 0.5,
    effort: 0.5,
  }
  const [values, setValues] = useState(myVote)
  const indexToKey = {
    0: 'urgency',
    1: 'importance',
    2: 'impact',
    3: 'effort',
  }
  return priorityItems.map(({ icon, title }, index) => {
    const key = indexToKey[index]
    return (
      <PrioritySlider
        icon={icon}
        title={title}
        withLabels={index === 0}
        value={values[key] * 100}
        onChange={(e, value) => setValues({ ...values, [key]: value / 100 })}
        onChangeCommitted={() => onUpdate(values)}
      />
    )
  })
}

function Priority({
  goalAddress,
  onClose,
  hideWeighIn,
  createGoalVote,
  openToMyVote,
  whoami,
  updateGoalVote,
  votes,
  archiveVoteOfGoal,
}) {
  const [openMyVote, setOpenMyVote] = useState(openToMyVote)

  const myVote = votes.find(value => {
    return value.agent_address === whoami.entry.address
  })
  const onUpdateVote = vote => {
    const goal_vote = {
      ...vote,
      goal_address: goalAddress,
      agent_address: whoami.entry.address,
      unix_timestamp: moment().unix(),
    }
    updateGoalVote(goal_vote, vote.address)
  }

  const createVote = async () => {
    await createGoalVote({
      goal_vote: {
        urgency: 0.5,
        importance: 0.5,
        impact: 0.5,
        effort: 0.5,
        goal_address: goalAddress,
        agent_address: whoami.entry.address,
        unix_timestamp: moment().unix(),
      },
    })
    setOpenMyVote(true)
  }

  // aggregated_priority_title
  // my_vote_title
  const priorityTabClassname = 'priority_tab'
  let aggClassName = priorityTabClassname
  let myVoteClassName = priorityTabClassname
  if (!myVote) {
    myVoteClassName += ' disabled'
  }
  if (openMyVote) {
    myVoteClassName += ' active'
  } else {
    aggClassName += ' active'
  }
  const handleArchive = () => {
    const vote = votes.find(value => {
      return value.agent_address === whoami.entry.address
    })
    if (!vote) return
    archiveVoteOfGoal(vote.address).then(() => {
      setOpenMyVote(false)
    })
  }
  return (
    <PickerTemplate
      className='priority_picker_wrapper'
      heading='priority'
      onClose={onClose}>
      <div className='priority_tabs'>
        <div className={aggClassName} onClick={() => setOpenMyVote(false)}>
          Aggregated Priority
        </div>
        <div
          className={myVoteClassName}
          onClick={() => myVote && setOpenMyVote(true)}>
          My Vote
        </div>
      </div>
      {/* Aggregated Priority */}
      {!openMyVote && (
        <div className='aggregated_priority'>
          <div className='aggregated_priority_inputs'>
            Based on {votes.length} inputs
          </div>
          <Aggregated votes={votes} />
          {!hideWeighIn && (
            <div className='priority_wrapper_button'>
              <Button
                size='small'
                color='purple'
                text={myVote ? 'See My Vote' : 'Weigh In'}
                onClick={myVote ? () => setOpenMyVote(true) : createVote}
              />
            </div>
          )}
          <div className='priority_wrapper_footer'>
            <Icon size='small' name='priority_4d4d4d.svg' />
            Locate this card on priority view mode
          </div>
        </div>
      )}

      {/* Weigh In / Vote */}
      {openMyVote && (
        <div className='my_vote'>
          <WeighIn myVote={myVote} onUpdate={onUpdateVote} />
          <div className='priority_wrapper_button'>
            <Button
              size='small'
              color='purple'
              text='Remove My Input'
              onClick={handleArchive}
            />
          </div>
          <div className='my_vote_info priority_wrapper_footer'>
            Last Modified{' '}
            {moment.unix(myVote.unix_timestamp).calendar(null, {
              lastDay: '[Yesterday at] LT',
              sameDay: '[Today at] LT',
              nextDay: '[Tomorrow at] LT',
              lastWeek: '[last] dddd LT',
              nextWeek: 'dddd LT',
              sameElse: 'L LT',
            })}
          </div>
        </div>
      )}
    </PickerTemplate>
  )
}

Priority.propTypes = {
  onClose: PropTypes.func.isRequired,
}

function mapStateToProps(state, ownProps) {
  const { goalAddress } = ownProps
  // filters all the GoalVotes down to a list
  // of only the Votes on the selected Goal
  const allVotesArray = Object.values(state.goalVotes)
  const votes = allVotesArray.filter(function(goalVote) {
    return goalVote.goal_address === goalAddress
  })
  return {
    whoami: state.whoami,
    goalAddress,
    votes,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    createGoalVote: goal_vote => {
      return dispatch(addVoteOfGoal.create(goal_vote))
    },
    updateGoalVote: (goal_vote, address) => {
      return dispatch(updateGoalVote.create({ goal_vote, address }))
    },
    archiveVoteOfGoal: address => {
      return dispatch(archiveVoteOfGoal.create({ address }))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Priority)
