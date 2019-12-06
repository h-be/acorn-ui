import React, { useState } from 'react'
import PropTypes from 'prop-types'

import 'react-dates'
import {
  DateRangePicker,
  SingleDatePicker,
  DayPickerRangeController,
} from 'react-dates'
import {
  START_DATE
} from 'react-dates/constants'
import 'react-dates/lib/css/_datepicker.css'
import 'react-dates/initialize'

import Icon from '../Icon'

import './DatePicker.css'

function DatePicker({onClose}) {
  const [dates, setDates] = useState({
    startDate: null,
    endDate: null,
  })
  const [focusedInput, setFocusedInput] = useState(START_DATE)

  const closeIcon = <button className='clear_button'>clear all</button>

  // const DateRangePicker = true

  return (
    <div className='date_picker_wrapper'>
      <Icon
        className='vertical_action_close'
        name='x_a3a3a3.svg'
        size='small-close'
        onClick={() => onClose()}
      />
      <div className='popup_title'>timeframe</div>
      <div className='date_picker_content'>
        <DateRangePicker
          numberOfMonths={1}
          minimumNights={0}
          onClose={() => {}}
          showClearDates
          keepOpenOnDateSelect
          customCloseIcon={closeIcon}
          startDate={dates.startDate} // momentPropTypes.momentObj or null,
          startDateId='your_unique_start_date_id' // PropTypes.string.isRequired,
          endDate={dates.endDate} // momentPropTypes.momentObj or null,
          endDateId='your_unique_end_date_id' // PropTypes.string.isRequired,
          onDatesChange={({ startDate, endDate }) =>
            setDates({ startDate, endDate })
          } // PropTypes.func.isRequired,
          focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
          onFocusChange={(focusedInput) => {
            if (!focusedInput) return // doesn't update the focusedInput if it is trying to close the DRP
            setFocusedInput(focusedInput)
          }}
        />
      </div>
    </div>
  )
}

DatePicker.propTypes = {
  startDatePlaceholderText: PropTypes.string,
  endDatePlaceholderText: PropTypes.string,
}

export default DatePicker
