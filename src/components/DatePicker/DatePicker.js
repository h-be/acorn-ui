import React, { useState } from 'react'
import PropTypes from 'prop-types'

import PickerTemplate from '../PickerTemplate/PickerTemplate'
import 'react-dates'
import { DateRangePicker } from 'react-dates'
import { START_DATE } from 'react-dates/constants'
import 'react-dates/lib/css/_datepicker.css'
import 'react-dates/initialize'

import './DatePicker.css'

function DatePicker({ onClose }) {
  const [dates, setDates] = useState({
    startDate: null,
    endDate: null,
  })
  const [focusedInput, setFocusedInput] = useState(START_DATE)

  return (
    <PickerTemplate
      heading='timeframe'
      className='date_picker_wrapper'
      onClose={onClose}>
      <div className='date_picker_content'>
        <DateRangePicker
          numberOfMonths={1}
          minimumNights={0}
          onClose={() => {}}
          showClearDates
          keepOpenOnDateSelect
          customCloseIcon={<button className='clear_button'>clear all</button>}
          startDate={dates.startDate} // momentPropTypes.momentObj or null,
          startDateId='your_unique_start_date_id' // PropTypes.string.isRequired,
          endDate={dates.endDate} // momentPropTypes.momentObj or null,
          endDateId='your_unique_end_date_id' // PropTypes.string.isRequired,
          onDatesChange={({ startDate, endDate }) =>
            setDates({ startDate, endDate })
          } // PropTypes.func.isRequired,
          focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
          onFocusChange={focusedInput => {
            if (!focusedInput) return // doesn't update the focusedInput if it is trying to close the DRP
            setFocusedInput(focusedInput)
          }}
        />
      </div>
    </PickerTemplate>
  )
}

DatePicker.propTypes = {
  startDatePlaceholderText: PropTypes.string,
  endDatePlaceholderText: PropTypes.string,
}

export default DatePicker
