
import React from 'react';
import { memo } from 'react'
import "@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css";
import { Calendar, utils } from "@hassanmojab/react-modern-calendar-datepicker";

const DateRange = ( { selectedDayRange, setSelectedDayRange } ) => {
  return (
    <Calendar
      value={ selectedDayRange }
      onChange={ setSelectedDayRange }
      shouldHighlightWeekends={ true }
      minimumDate={ utils().getToday() }
      colorPrimary="#0fbcf9" // added this
      colorPrimaryLight="rgba(75, 207, 250, 0.4)"
    />
  )
}

export default memo( DateRange )
