import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import './Priority.css'
import Icon from '../Icon'
import Button from '../Button/Button'
import { connect } from 'react-redux'

import Slider from '@material-ui/core/Slider'
import { makeStyles } from '@material-ui/core/styles'
import {
  addVoteOfGoal,
  fetchGoalVotes,
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
  label: {
    textTransform: 'capitalize',
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
    top: '-14px',
    position: 'absolute',
    fontSize: '12px',
    fontFamily: '"rennerbook", "Helvetica", "Arial", "sans-serif"',
    lineHeight: '1',
  },
  offset: {
    fontFamily: '"rennerbook", "Helvetica", "Arial", "sans-serif"',
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
function Priority({
  goalAddress,
  onClose,
  createGoalVote,
  whoami,
  fetchGoalVotes,
  updateGoalVote,
  votes,
}) {
  const classes = useStyles()

  const priorityItemVars = [
    { priorityIcon: 'urgency.svg', priorityItemTitle: 'Urgency' },
    { priorityIcon: 'importance.svg', priorityItemTitle: 'Importance' },
    { priorityIcon: 'impact.svg', priorityItemTitle: 'Impact' },
    { priorityIcon: 'effort.png', priorityItemTitle: 'Effort' },
  ]
  const [values, setValues] = useState({
    Urgency: 50,
    Importance: 50,
    Impact: 50,
    Effort: 50,
  })
  const [openMyVote, setOpenMyVote] = useState(false)
  const handleOnChange = (e, value) => {
    console.log('value', value)
    if (!openMyVote) return
    if (
      values[e.target.parentElement.parentElement.children[1].textContent] !==
      value
    ) {
      setValues({
        ...values,
        [e.target.parentElement.parentElement.children[1].textContent]: value,
      })
    }
  }
  useEffect(() => {
    if (!openMyVote) return
    let goal_vote = {
      goal_address: goalAddress,
      urgency: values['Urgency'] / 100,
      importance: values['Importance'] / 100,
      impact: values['Impact'] / 100,
      effort: values['Effort'] / 100,
      agent_address: whoami.entry.address,
      unix_timestamp: Date.now(),
    }
    const addresses = Object.keys(votes)
      .map(value => {
        return {
          address: value,
          bool: votes[value].goal_address === goalAddress,
        }
      })
      .filter(value => {
        return value.bool
      })

    const voteAdrress = addresses.find(v => {
      return votes[v.address].agent_address === whoami.entry.address
    })

    if (addresses.length > 0 && voteAdrress !== undefined) {
      updateGoalVote(goal_vote, voteAdrress.address).then(value => {})
    } else {
      createGoalVote({ goal_vote }).then(value => {
        console.log('create', value)
      })
    }
  }, [values])
  const priorityItems = priorityItemVars.map((priorityItem, index) => (
    <div key={index} className='priority_item'>
      <Icon
        key={index}
        className='priority_item_icon'
        name={priorityItem.priorityIcon}
        size='small'
      />
      <div key={index} className='priority_item_title'>
        {priorityItem.priorityItemTitle}
      </div>
      <Slider
        key={index}
        onChange={handleOnChange}
        defaultValue={50}
        getAriaValueText={valuetext}
        aria-labelledby='discrete-slider-custom'
        step={25}
        valueLabelDisplay='auto'
        marks={index === 0 ? marksWithLabels : marksWithoutLabels}
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
  ))

  // aggregated_priority_title
  // my_vote_title
  const priorityTabClassname = 'priority_tab'
  let aggClassName = priorityTabClassname
  let myVoteClassName = priorityTabClassname
  if (openMyVote) {
    myVoteClassName += ' active'
  } else {
    aggClassName += ' active'
  }

  return (
    <div className='priority_wrapper vertical_action_overlay'>
      <Icon
        className='vertical_action_close'
        name='x_a3a3a3.svg'
        size='small-close'
        onClick={() => onClose()}
      />
      <div className='popup_title'>priority</div>
      <div className='priority_tabs'>
        <div className={aggClassName} onClick={() => setOpenMyVote(false)}>
          Aggregated Priority
        </div>
        <div className={myVoteClassName} onClick={() => setOpenMyVote(true)}>
          My Vote
        </div>
      </div>
      {/* TODO : Ensure aggregated priority items are display ONLY */}
      {!openMyVote && (
        <div className='aggregated_priority'>
          <div className='aggregated_priority_inputs'>Based on 5 inputs</div>
          {priorityItems}
          <div className='priority_wrapper_button'>
            <Button
              size='small'
              color='purple'
              text='Weigh In'
              onClick={() => setOpenMyVote(true)}
            />
          </div>
          <div className='priority_wrapper_footer'>
            <Icon size='small' name='priority_4d4d4d.svg' />
            Locate this card on priority view mode
          </div>
        </div>
      )}

      {openMyVote && (
        <div className='my_vote'>
          {priorityItems}
          <div className='priority_wrapper_button'>
            <Button
              size='small'
              color='purple'
              text='Remove My Input'
              onClick={() => setOpenMyVote(false)}
            />
          </div>
          <div className='my_vote_info priority_wrapper_footer'>
            Last modified Aug 23, 2019 12:33pm
          </div>
        </div>
      )}
    </div>
  )
}

Priority.propTypes = {
  onClose: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  return {
    whoami: state.whoami,
    goalAddress: state.ui.goalForm.editAddress,
    votes: state.goalVotes,
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
    fetchGoalVotes: () => {
      return dispatch(fetchGoalVotes.create({}))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Priority)
