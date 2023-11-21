import React, { useState } from "react";
import {
  Modal,
  Typography,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Select,
  MenuItem,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import { CalendarToday } from "@mui/icons-material";
import "./styles/YearlyCalendar.css";

const YearlyCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedHour, setSelectedHour] = useState({ hour: 0, minute: 0 });
  const [note, setNote] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dateStack, setDateStack] = useState([]);
  const [hourStack, setHourStack] = useState([]);
  const [noteStack, setNoteStack] = useState([]);

  const handleDateClick = (date) => {
    setSelectedDate(date);
    openModal();
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const handleHourChange = (event) => {
    setSelectedHour(event.target.value);
  };

  const handleNoteChange = (event) => {
    setNote(event.target.value);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveTasks = () => {
    if (selectedDate && selectedHour && note) {
      setDateStack([...dateStack, selectedDate]);
      setHourStack([...hourStack, selectedHour]);
      setNoteStack([...noteStack, note]);
    }

    // setDateStack([]);
    // setHourStack([]);
    // setNoteStack([]);

    closeModal();
  };
  console.log("Dates:", dateStack);
  console.log("Hours:", hourStack);
  console.log("Notes:", noteStack);

  const getDayOfWeek = (dayIndex) => {
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return daysOfWeek[dayIndex];
  };

  const generateYears = (startYear, endYear) => {
    const years = [];
    for (let year = startYear; year <= endYear; year++) {
      years.push(year);
    }
    return years;
  };

  const getDaysInMonth = (year, month) => {
    const daysInMonth = [];
    const startDate = new Date(year, month, 1);

    for (let day = 1; day <= new Date(year, month + 1, 0).getDate(); day++) {
      const currentDate = new Date(
        startDate.getFullYear(),
        startDate.getMonth(),
        day
      );
      daysInMonth.push(currentDate);
    }

    return daysInMonth;
  };

  const generateMonths = () => {
    const months = [];
    for (let month = 0; month < 12; month++) {
      const daysInMonth = getDaysInMonth(selectedYear, month);
      months.push({
        monthName: daysInMonth[0].toLocaleString("default", { month: "long" }),
        days: daysInMonth,
      });
    }
    return months;
  };

  const months = generateMonths();

  const generateWeeks = (daysInMonth) => {
    const weeks = [];
    let currentWeek = [];

    daysInMonth.forEach((date, index) => {
      if (index > 0 && date.getDay() === 0) {
        weeks.push([...currentWeek]);
        currentWeek = [];
      }
      currentWeek.push(date);

      if (index === daysInMonth.length - 1) {
        for (let i = currentWeek.length; i < 7; i++) {
          currentWeek.push(null);
        }
        weeks.push([...currentWeek]);
      }
    });

    return weeks;
  };

  return (
    <div className="yearly-calendar-container">
      <h1>
        <IconButton color="primary">
          <CalendarToday />
        </IconButton>
        Yearly Calendar
      </h1>
      <Select
        value={selectedYear}
        onChange={handleYearChange}
        style={{ marginBottom: "20px" }}
      >
        {generateYears(
          new Date().getFullYear(),
          new Date().getFullYear() + 7
        ).map((year) => (
          <MenuItem key={year} value={year}>
            {year}
          </MenuItem>
        ))}
      </Select>
      <div className="calendar">
        {months.map((month, index) => (
          <div key={index}>
            <Table className="month-table">
              <TableHead>
                <TableRow>
                  <TableCell colSpan={7}>{month.monthName}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {generateWeeks(month.days).map((week, weekIndex) => (
                  <TableRow key={weekIndex}>
                    {week.map((date, dateIndex) => (
                      <TableCell
                        key={dateIndex}
                        onClick={() => handleDateClick(date)}
                      >
                        {date ? (
                          <div>
                            <div>{date.getDate()}</div>
                            <div>{getDayOfWeek(date.getDay())}</div>
                          </div>
                        ) : (
                          ""
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ))}
      </div>
      <Modal open={isModalOpen} onClose={closeModal}>
        <Paper className="day-details-modal">
          <Typography variant="h6">Day Details</Typography>
          <Typography>{selectedDate?.toDateString()}</Typography>
          <Select
            value={selectedHour}
            onChange={handleHourChange}
            style={{ marginBottom: "10px" }}
          >
            {Array.from({ length: 24 * 4 }).map((_, index) => {
              const hour = Math.floor((index * 15) / 60);
              const minute = (index * 15) % 60;
              return (
                <MenuItem key={index} value={index * 15}>
                  {String(hour).padStart(2, "0")}:
                  {String(minute).padStart(2, "0")}
                </MenuItem>
              );
            })}
          </Select>
          <TextField
            label="Note"
            variant="outlined"
            fullWidth
            multiline
            value={note}
            onChange={handleNoteChange}
            style={{ marginBottom: "10px" }}
          />
          <Button variant="contained" color="primary" onClick={handleSaveTasks}>
            Save Tasks
          </Button>
          <Button variant="contained" color="secondary" onClick={closeModal}>
            Close
          </Button>
        </Paper>
      </Modal>
    </div>
  );
};

export default YearlyCalendar;
