import React from 'react'
import { useState, useEffect } from "react";

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { formatTime, getSubjectColor } from "./lib/utils";
import { EditIcon, DeleteIcon, SquareX, SaveIcon } from "lucide-react";
//import { formatTime } from "./lib/utils";

export const CalendarView = () => {

    const [getScheduleExam, setGetScheduleExam] = useState([]);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [modal, setModal] = useState(false);
    const [hiddenVal, setHiddenVal] = useState('');
    const [examDetails, setExamDetails] = useState({
      course_title: '',
      course_code: '',
      class_level: '',
      department: '',
      exam_date: '',
      venue: '',
      duration: '',
      start_time: '',
      lecturer: '',
      additional_notes: '',
    });

    // Load data from localStorage on component mount
    useEffect(() => {
      const data = JSON.parse(localStorage.getItem('schedule_exam')) ?? [];
      setGetScheduleExam(data);
    }, []);

    // Update examDetails when hiddenVal changes
    useEffect(() => {
      if (hiddenVal && getScheduleExam.length > 0) {
        const selectedExam = getScheduleExam.find(item => item.exam_id === hiddenVal);
        if (selectedExam) {
          setExamDetails({
            exam_id: selectedExam.exam_id,
            course_title: selectedExam.course_title || '',
            course_code: selectedExam.course_code || '',
            class_level: selectedExam.class_level || '',
            department: selectedExam.department || '',
            exam_date: selectedExam.exam_date || '',
            venue: selectedExam.venue || '',
            duration: selectedExam.duration + ' minutes' || '',
            start_time: selectedExam.start_time || '',
            lecturer: selectedExam.lecturer || '',
            additional_notes: selectedExam.additional_notes || '',
            status: selectedExam.status
          });
          setModal(true); // Open modal when an exam is selected
        }
      }
      
    }, [hiddenVal, getScheduleExam]);


  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const firstDayOfWeek = firstDayOfMonth.getDay();
  const daysInMonth = lastDayOfMonth.getDate();

  const previousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const getExamsForDate = (day) => {
    const dateString = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return getScheduleExam.filter((exam) => exam.exam_date === dateString);
  };

  const isToday = (day) => {
    const today = new Date();
    return (
      today.getFullYear() === year &&
      today.getMonth() === month &&
      today.getDate() === day
    );
  };

  const renderCalendarDays = () => {
    const days = [];

    // Previous month's days
    const prevMonth = month === 0 ? 11 : month - 1;
    const prevYear = month === 0 ? year - 1 : year;
    const daysInPrevMonth = new Date(prevYear, prevMonth + 1, 0).getDate();

    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      const day = daysInPrevMonth - i;
      days.push(
        <div key={`prev-${day}`} className="calendar__calendar-day calendar__prev-month">
          <span>{day}</span>
        </div>
      );
    }

    // Current month's days
    for (let day = 1; day <= daysInMonth; day++) {
      const dayExams = getExamsForDate(day);
      const today = isToday(day);

      days.push(
        <div
          key={day}
          className={`calendar__calendar-day m-t-small ${today ? "calendar__today" : ""}`}
        >
          <span className={today ? "today-marker" : ""}>
            {day}
          </span>
          <div className="calendar__exams-container">
            {dayExams.slice(0, 2).map((exam) => {
              const colorClass = getSubjectColor(exam.course_code);
              
              return (
                <div
                  key={exam.exam_id} 
                  className={`calendar__exam-item ${colorClass} ${exam.course_title ? "calendar__current-exam" : ""}`}
                  onClick={() => setHiddenVal(exam.exam_id)}
                  title={`${exam.course_title} - ${formatTime(exam.start_time)}`}
                >
                  {exam.course_title}
                </div>
              );
            })}
            {dayExams.length > 2 && (
              <div className="more-exams">
                +{dayExams.length - 2} more
              </div>
            )}
          </div>
        </div>
      );
    }

    // Next month's days to fill the grid
    const totalCells = 42; // 6 weeks * 7 days
    const remainingCells = totalCells - days.length;

    for (let day = 1; day <= remainingCells; day++) {
      days.push(
        <div key={`next-${day}`} className="calendar__calendar-day calendar__next-month">
          <span>{day}</span>
        </div>
      );
    }

    return days;
  };

  return (
    <div className = "calendar">
      <h3 className = "calendar__heading size-big">Calendar View</h3>
      
      <div className = "calendar__wrapper m-t-big">
        <div className="calendar__header">
          <div className="calendar__header-content">
            <h2>
              {monthNames[month]} {year}
            </h2>
            <div className="calendar__header-actions">
              <button
                onClick={previousMonth}
                className="calendar__nav-button prev-button"
              >
                <ChevronLeftIcon className="calendar__nav-icon" />
              </button>
              <button
                onClick={goToToday}
                className="calendar__today-button"
              >
                Today
              </button>
              <button
                onClick={nextMonth}
                className="calendar__nav-button next-button"
              >
                <ChevronRightIcon className="calendar__nav-icon" />
              </button>
            </div>
          </div>
        </div>

        <div className="calendar__content">
          <div className="calendar__grid">
            {/* Calendar Header */}
            {daysOfWeek.map((day) => (
              <div
                key={day}
                className="calendar__day-header m-t-medium"
              >
                {day}
              </div>
            ))}

            {/* Calendar Days */}
            {renderCalendarDays()}
          </div>
        </div>
      </div>
      {
        modal && (
          <div className="calendar-view-modal">
            <form className = "calendar-view-modal__form">
              <header className = "calendar-view-modal__head-title">
                <h3 className = "calendar-view-modal__title">Examination Details</h3>
                  <span className = "calendar-view-modal__icon-cancel" onClick={() => setModal(false)}>
                    <SquareX />
                  </span>
              </header>
              <div>
                <div className = "calendar-view-modal__group">
                  <span className = "calendar-view-modal__label">Course Title:</span>
                  <span className = "calendar-view-modal__value">{examDetails.course_title}</span>
                </div>
                <div className = "calendar-view-modal__group">
                  <span className = "calendar-view-modal__label">Course Code:</span>
                  <span className = "calendar-view-modal__value">{examDetails.course_code}</span>
                </div>
                <div className = "calendar-view-modal__group">
                  <span className = "calendar-view-modal__label">Exam Date & Time:</span>
                  <span className = "calendar-view-modal__value">{`${examDetails.exam_date} At ${examDetails.start_time}`}</span>
                </div>
                <div className = "calendar-view-modal__group">
                  <span className = "calendar-view-modal__label">Class:</span>
                  <span className = "calendar-view-modal__value">{examDetails.class_level}</span>
                </div>
                <div className = "calendar-view-modal__group">
                  <span className = "calendar-view-modal__label">Department:</span>
                  <span className = "calendar-view-modal__value">{examDetails.department}</span>
                </div>
                <div className = "calendar-view-modal__group">
                  <span className = "calendar-view-modal__label">Duration:</span>
                  <span className = "calendar-view-modal__value">{examDetails.duration}</span>
                </div>
                <div className = "calendar-view-modal__group">
                  <span className = "calendar-view-modal__label">Venue:</span>
                  <span className = "calendar-view-modal__value">{examDetails.venue}</span>
                </div>
                <div className = "calendar-view-modal__group">
                  <span className = "calendar-view-modal__label">Additional Notes:</span>
                  <span className = "calendar-view-modal__value">{examDetails.additional_notes}</span>
                </div>
              </div>
            </form>
          </div>
        )
      }
    </div>
  )
}
