import React from 'react';
import { Paper } from '@mui/material';
import YearlyCalendar from './YearlyCalendar';

const Calendar = () => {
  return (
    <Paper elevation={3} style={{ padding: '16px', margin: '16px' }}>
      <YearlyCalendar />
    </Paper>
  );
};

export default Calendar;
