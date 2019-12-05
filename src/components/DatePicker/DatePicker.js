import React, { Component } from 'react'
import PropTypes from 'prop-types'

import 'react-dates'
import {
  DateRangePicker,
  SingleDatePicker,
  DayPickerRangeController,
} from 'react-dates'
import 'react-dates/lib/css/_datepicker.css'
import 'react-dates/initialize'

import Icon from '../Icon'

import './DatePicker.css'

class DatePicker extends Component {

  constructor(props) {
    super(props)
    this.state = {
      startDate: null,
      endDate: null,
    }
  }

  render() {
    return (
      <div className='date_picker_wrapper'>
        <div className='popup_title'>timeframe</div>
        <div className='date_picker_content'>
          <DateRangePicker
            startDate={this.state.startDate} // momentPropTypes.momentObj or null,
            startDateId='your_unique_start_date_id' // PropTypes.string.isRequired,
            endDate={this.state.endDate} // momentPropTypes.momentObj or null,
            endDateId='your_unique_end_date_id' // PropTypes.string.isRequired,
            onDatesChange={({ startDate, endDate }) =>
              this.setState({ startDate, endDate })
            } // PropTypes.func.isRequired,
            focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
            onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
          />
        </div>
      </div>
    )
  }
}

export default DatePicker
