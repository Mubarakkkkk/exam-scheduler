import { useState, useEffect } from 'react'

import { PlusIcon, CircleGauge, CalendarDays, Calendar, List, TimerIcon, SquareCheck, User } from "lucide-react";

export const StudentDashboard = () => {

    const [scheduleExamDetails, setScheduleExamDetails] = useState([]);
    /// get the total exams
    const [totalExams, setTotalExams] = useState(0);
    const [upcomingExams, setUpcomingExams] = useState(0);
    const [completedExams, setCompletedExams] = useState(0);
    useEffect(() => {
        const total = scheduleExamDetails.length;
        setTotalExams(total);
    })

    // 
    useEffect(() => {
        const upComingExam = scheduleExamDetails.filter(upcomig => upcomig.status === 'upcoming');
        const countUpcomingExam = upComingExam.length;
        setUpcomingExams(countUpcomingExam);
    });

    // Show status on COMPLETED EXAMS
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
