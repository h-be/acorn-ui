import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './Priority.css'
import Icon from '../Icon'
import Button from '../Button/Button'

import Slider from '@material-ui/core/Slider'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    color: '#6600FF',
    height: 4,
    borderRadius: 10,
    border: 0,
    padding: '20px 0',
  },
  marked: {
    margin: '10px 20px 10px 20px;s',
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
    top: '-4px',
    position: 'absolute',
    fontSize: '12px',
    fontFamily: '"rennerbook", "Helvetica", "Arial", "sans-serif"',
    lineHeight: '1',
  },
  markLabelHidden: {
    display: 'none',
  },
  offset: {
    fontFamily: '"rennerbook", "Helvetica", "Arial", "sans-serif"',
  },
  track: {
    height: 4,
    borderRadius: 10,
  },
})

const marks = [
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

function valuetext(value) {
  return `${value}%`;
}

function Priority({ goalAddress, onClose }) {

  const classes = useStyles()

  const [openMyVote, setOpenMyVote] = useState(false)

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
      <Icon className='vertical_action_close' name='x_a3a3a3.svg' size='small-close' onClick={() => onClose()} />
      <div className="popup_title">priority</div>


      <div className="priority_tabs">
        <div className={aggClassName} onClick={() => setOpenMyVote(false)}>Aggregated Priority</div>
        <div className={myVoteClassName} onClick={() => setOpenMyVote(true)}>My Vote</div>
      </div>
      {!openMyVote && <div className="aggregated_priority">
        <div className="aggregated_priority_inputs">Based on 5 inputs</div>
       
        <div className="priority_item">
          <Icon className='priority_item_icon' name='urgency.svg' size='small' />
          <div className="priority_item_title">Urgency</div>
          <Slider
            defaultValue={50}
            getAriaValueText={valuetext}
            aria-labelledby="discrete-slider-custom"
            step={25}
            valueLabelDisplay="auto"
            marks={marks}
            classes={{
              root: classes.root, // class name, e.g. `classes-nesting-root-x`
              marked: classes.marked,
              label: classes.label, // class name, e.g. `classes-nesting-label-x`
              rail: classes.rail,
              mark: classes.mark,
              markLabel: classes.markLabel,
              offset: classes.offset,
              track: classes.track,
            }}
          />
        </div>
        <div className="priority_item">
          <Icon className='priority_item_icon' name='importance.svg' size='small' />
          <div className="priority_item_title">Importance</div>
          <Slider
            defaultValue={50}
            getAriaValueText={valuetext}
            aria-labelledby="discrete-slider-custom"
            step={25}
            valueLabelDisplay="auto"
            marks={marks}
            classes={{
              root: classes.root, // class name, e.g. `classes-nesting-root-x`
              marked: classes.marked,
              label: classes.label, // class name, e.g. `classes-nesting-label-x`
              rail: classes.rail,
              mark: classes.mark,
              markLabel: classes.markLabel,
              offset: classes.offset,
              track: classes.track,
            }}
          />
        </div>
        <div className="priority_item">
          <Icon className='priority_item_icon' name='impact.svg' size='small' />
          <div className="priority_item_title">Impact</div>
          <Slider
            defaultValue={50}
            getAriaValueText={valuetext}
            aria-labelledby="discrete-slider-custom"
            step={25}
            valueLabelDisplay="auto"
            marks={marks}
            classes={{
              root: classes.root, // class name, e.g. `classes-nesting-root-x`
              marked: classes.marked,
              label: classes.label, // class name, e.g. `classes-nesting-label-x`
              rail: classes.rail,
              mark: classes.mark,
              markLabel: classes.markLabel,
              offset: classes.offset,
              track: classes.track,
            }}
          />
        </div>
        <div className="priority_item">
          <Icon className='priority_item_icon' name='effort.png' size='small' />
          <div className="priority_item_title">Effort</div>
          <Slider
            defaultValue={50}
            getAriaValueText={valuetext}
            aria-labelledby="discrete-slider-custom"
            step={25}
            valueLabelDisplay="auto"
            marks={marks}
            classes={{
              root: classes.root, // class name, e.g. `classes-nesting-root-x`
              marked: classes.marked,
              label: classes.label, // class name, e.g. `classes-nesting-label-x`
              rail: classes.rail,
              mark: classes.mark,
              markLabel: classes.markLabel,
              offset: classes.offset,
              track: classes.track,
            }}
          />
        </div>
        <div className="priority_wrapper_button">
        <Button size="small" color="purple" text="Weigh In" onClick={() => setOpenMyVote(true)} />
        </div>
        <div className="priority_wrapper_footer">
        <Icon size="small" name='priority_4d4d4d.svg' />
        Locate this card on priority view mode
        </div>
      </div>}

      {openMyVote && <div className="my_vote">
        
        <div className="priority_item">
          <Icon className='priority_item_icon' name='urgency.svg' size='small' />
          <div className="priority_item_title">Urgency</div>
          <Slider
            defaultValue={50}
            getAriaValueText={valuetext}
            aria-labelledby="discrete-slider-custom"
            step={25}
            valueLabelDisplay="auto"
            marks={marks}
            classes={{
              root: classes.root, // class name, e.g. `classes-nesting-root-x`
              marked: classes.marked,
              label: classes.label, // class name, e.g. `classes-nesting-label-x`
              rail: classes.rail,
              mark: classes.mark,
              markLabel: classes.markLabel,
              offset: classes.offset,
              track: classes.track,
            }}
          />
        </div>
        <div className="priority_item">
          <Icon className='priority_item_icon' name='importance.svg' size='small' />
          <div className="priority_item_title">Importance</div>
          <Slider
            defaultValue={50}
            getAriaValueText={valuetext}
            aria-labelledby="discrete-slider-custom"
            step={25}
            valueLabelDisplay="auto"
            marks={marks}
            classes={{
              root: classes.root, // class name, e.g. `classes-nesting-root-x`
              marked: classes.marked,
              label: classes.label, // class name, e.g. `classes-nesting-label-x`
              rail: classes.rail,
              mark: classes.mark,
              markLabel: classes.markLabel,
              offset: classes.offset,
              track: classes.track,
            }}
          />
        </div>
        <div className="priority_item">
          <Icon className='priority_item_icon' name='impact.svg' size='small' />
          <div className="priority_item_title">Impact</div>
          <Slider
            defaultValue={50}
            getAriaValueText={valuetext}
            aria-labelledby="discrete-slider-custom"
            step={25}
            valueLabelDisplay="auto"
            marks={marks}
            classes={{
              root: classes.root, // class name, e.g. `classes-nesting-root-x`
              marked: classes.marked,
              label: classes.label, // class name, e.g. `classes-nesting-label-x`
              rail: classes.rail,
              mark: classes.mark,
              markLabel: classes.markLabel,
              offset: classes.offset,
              track: classes.track,
            }}
          />
        </div>
        <div className="priority_item">
          <Icon className='priority_item_icon' name='effort.png' size='small' />
          <div className="priority_item_title">Effort</div>
          <Slider
            defaultValue={50}
            getAriaValueText={valuetext}
            aria-labelledby="discrete-slider-custom"
            step={25}
            valueLabelDisplay="auto"
            marks={marks}
            classes={{
              root: classes.root, // class name, e.g. `classes-nesting-root-x`
              marked: classes.marked,
              label: classes.label, // class name, e.g. `classes-nesting-label-x`
              rail: classes.rail,
              mark: classes.mark,
              markLabel: classes.markLabel,
              offset: classes.offset,
              track: classes.track,
            }}
          />
        </div>
        
        <div className="priority_wrapper_button">
        <Button size="small" color="purple" text="Remove My Input" onClick={() => setOpenMyVote(false)} />
        </div>
        <div className="my_vote_info priority_wrapper_footer">Last modified Aug 23, 2019 12:33pm</div>
      </div>}

    </div >

  )
}

Priority.propTypes = {
  onClose: PropTypes.func.isRequired,
}

export default Priority