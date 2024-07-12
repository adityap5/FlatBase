// src/components/Calendar.js
import React from 'react';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

const Calendar = ({ selectionRange, handleSelect }) => {
  return (
    <DateRangePicker
      ranges={[selectionRange]}
      onChange={handleSelect}
    />
  );
};

export default Calendar;
