import { useState, useEffect } from 'react'
import {CalendarDays, TimerIcon, SquareCheck } from "lucide-react";

export const Dashboard = () => {

  const [scheduleExamDetails, setScheduleExamDetails] = useState([]);
  /// get the total exams
  const [totalExams, setTotalExams] = useState(0);
  const [upcomingExams, setUpcomingExams] = useState(0);
  const [completedExams, setCompletedExams] = useState(0);

  useEffect(() => {
    // Get current date at midnight for accurate comparison
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Update exams with completed status
    const updatedExams = scheduleExamDetails.map(exam => {
      const examDate = new Date(exam.exam_date);
      examDate.setHours(0, 0, 0, 0); // Compare just dates, ignore time
      
      return {
        ...exam,
        status: examDate.getDate() === today.getDate() ? 'completed' : exam.status
      };
      
    });
  

    // Only update if changes were made
    if (JSON.stringify(updatedExams) !== JSON.stringify(scheduleExamDetails)) {
      setScheduleExamDetails(updatedExams);
      // Optionally save to localStorage if needed
      localStorage.setItem('schedule_exam', JSON.stringify(updatedExams));
    }
  }, [scheduleExamDetails]); // Empty dependency array to run only once on mount

  useEffect(() => {
    let total = scheduleExamDetails.length;
    setTotalExams(total);
  })

  // 
  useEffect(() => {
    let upComingExam = scheduleExamDetails.filter(upcomig => upcomig.status === 'upcoming');
    let countUpcomingExam = upComingExam.length;
    setUpcomingExams(countUpcomingExam);
  })
  ///
  useEffect(() => {
    let completedExam = scheduleExamDetails.filter(completedExams => completedExams.status === 'completed');
    let countCompletedExam = completedExam.length;
    setCompletedExams(countCompletedExam);
  })

  // Load data from localStorage on component mount
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('schedule_exam')) ?? [];
    setScheduleExamDetails(data);
  }, []);

  return (
    <div className = "dashboard">
      <h3 className = "dashboard__heading size-big">Dashboard</h3>
      <div className = "dashboard__wrapper m-t-big">
        <div className = "dashboard__box">
          <span className = "dashboard__icon dashboard__icon--calendar "><CalendarDays /></span>
          <div className = "dashboard__content">
            <span className = "dashboard__text">Total Exams</span>
            <strong className = "dashboard__num">{totalExams}</strong>
          </div>
        </div>
        <div className = "dashboard__box">
          <span className = "dashboard__icon dashboard__icon--timer"><TimerIcon /></span>
          <div className = "dashboard__content">
            <span className = "dashboard__text">Upcoming Exams</span>
            <strong className = "dashboard__num">{upcomingExams}</strong>
          </div>
        </div>
        <div className = "dashboard__box">
          <span className = "dashboard__icon dashboard__icon--square"><SquareCheck /></span>
          <div className = "dashboard__content">
            <span className = "dashboard__text">Completed Exams</span>
            <strong className = "dashboard__num">{completedExams}</strong>
          </div>
        </div>
        
      </div>
    </div>
  )
}
