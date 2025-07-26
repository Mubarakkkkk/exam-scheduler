import { Link, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { PlusIcon, CircleGauge, CalendarDays, Calendar, List, SquareX, SaveIcon, ArrowBigRightIcon, AlertTriangle } from "lucide-react";

import { Dashboard } from '../components/Dashboard';
import { CalendarView } from '../components/CalendarView';
import { ListView } from '../components/ListView';

import rawData from '../components/ui/utils';

export const AdminPage = () => {

    // Exam modal form switching variale
    const [modal, setModal] = useState(false);
    const [scheduleExamDetails, setScheduleExamDetails] = useState([]);
    // 
    const [examDetails, setExamDetails] = useState(
        {
            course_title: '',
            course_code: '',
            class_level: '',
            department: '',
            exam_date: '',
            venue: '',
            duration: '',
            start_time: '',
            lecturer: '',
            additional_notes: ''
        }
    )
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
    })

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

    const handleChange = (e) => {
        setExamDetails({ ...examDetails, [e.target.name]: e.target.value });
    };
    
    /// handle submision of the scheduled exam
    const handleScheduleExam = (evt) => {
        evt.preventDefault();
        

        // Generate unique ID
        let examId = scheduleExamDetails.length ? scheduleExamDetails[scheduleExamDetails.length - 1].exam_id + 1 : 1;
        const status = 'upcoming'
        const examDate = new Date(examDetails.exam_date);
        const today = new Date();

        if(
            !examDetails.course_title ||
            !examDetails.course_code ||
            !examDetails.class_level ||
            !examDetails.department ||
            !examDetails.exam_date ||
            !examDetails.venue ||
            !examDetails.duration ||
            !examDetails.start_time ||
            !examDetails.lecturer ||
            !examDetails.additional_notes
        ) {
            alert('All fields must be filled');
            return;
        }
        else if (examDate.getDate() === today.getDate() - 1) {
            alert('Sorry you can not have exam to the previous day');
            return;
        }

        // handle conflict function
        if(handleConflict()) {
            return;
        }
        
       
           
        const saveExam = {
            exam_id: examId,
            course_title: examDetails.course_title,
            course_code: examDetails.course_code,
            class_level: examDetails.class_level,
            department: examDetails.department,
            exam_date: examDetails.exam_date,
            venue: examDetails.venue,
            duration: examDetails.duration + ' minutes',
            start_time: examDetails.start_time,
            lecturer: examDetails.lecturer,
            additional_notes: examDetails.additional_notes,
            status
        }

        // add new exam to the array
        scheduleExamDetails.push(saveExam);
        // 
        localStorage.setItem('schedule_exam', JSON.stringify(scheduleExamDetails)) ?? [];
       
        // Reset form after submission 
        setExamDetails(
            {
                course_title: '',
                course_code: '',
                class_level: '',
                department: '',
                exam_date: '',
                venue: '',
                duration: '',
                start_time: '',
                lecturer: '',
                additional_notes: ''
            }
        )
    }

    // handle conflict
    const handleConflict = () => {
        const examVenue = scheduleExamDetails.find( (examIdVenue) => examIdVenue.venue === examDetails.venue );
        if(examVenue) {
            alert('Sorry... there is VENUE conflict');
            return;
        }
    }

    //localStorage.removeItem('schedule_exam');
  return (
    <div className = "admin">
        <header className = "header">
            <div className = "header__title">
                <Calendar />
                <h3 className = "header__name">Exam Scheduling System</h3>
            </div>

            <div className = "header__nav">
                <button type = "button" className = "header__btn" onClick = { () => setModal( (bool) => !bool ) }>
                    <span className = "header__plus-icon"><PlusIcon /></span>
                    Schedule Exam
                </button>
                <Link to = "/" className = "header__logout" title = "Log Out" >
                    <span className = "header__arrow-icon"><ArrowBigRightIcon /></span>
                </Link>
            </div>
        </header>

        <div className = "body">
            <div className = "body__sidebar">
                <div className = "body__nav">
                    <h3 className = "body__nav-title">Navigation</h3>
                    <div className = "body__link-box">
                        <span className = "body__nav-icon"><CircleGauge /></span>
                        <Link to = "/admin/dashboard" className = "body__link">Dashboard</Link>
                    </div>
                    <div className = "body__link-box">
                        <span className = "body__nav-icon"><CalendarDays /></span>
                        <Link to = "/admin/calendar" className = "body__link">Calendar View</Link>
                    </div>
                    <div className = "body__link-box">
                        <span className = "body__nav-icon"><List /></span>
                        <Link to = "/admin/list" className = "body__link">List View</Link>
                    </div>
                    <div className = "body__link-box">
                        <span className = "body__nav-icon"><ArrowBigRightIcon /></span>
                        <Link to = "/" className = "body__link">Log Out</Link>
                    </div>
                </div>
                <div className = "body__statistics">
                    <h3 className = "body__nav-title">Quick Statistics</h3>
                    <div className = "body__stat">
                        <span className = "body__text">Upcoming Exam</span> <strong className = "body__num">{upcomingExams}</strong>
                    </div>
                    <div className = "body__stat">
                        <span className = "body__text">Completed Exams</span> <strong className = "body__num">{completedExams}</strong>
                    </div>
                    <div className = "body__stat">
                        <span className = "body__text">Total Exams</span> <strong className = "body__num">{totalExams}</strong>
                    </div>
                </div>
            </div>
            <main className = "body__content">
                <Routes>
                    <Route path = "dashboard" element = {<Dashboard />} />
                    <Route path = "calendar" element = { <CalendarView /> } />
                    <Route path = "list" element = { <ListView /> } />
                    {/* Adding a default route */}
                    <Route index element = {<Dashboard />} />
                </Routes>
            </main>
        </div> 

        {/* Exam Schedule modal form */}
        <div className = { modal ? 'modal active' : 'modal' }>
            <form onSubmit = {handleScheduleExam} className = "modal__form">
                <div className = "modal__heading">
                    <h3 className = "modal__title">Schedule New Exam</h3>
                    <span className = "modal__icon-cancel" onClick = { () => setModal( (bool) => !bool ) }><SquareX /></span>
                </div>
                <div className = "modal__details">
                    <div className = "modal__wrapper">
                        <div className = "modal__group">
                            <label htmlFor="" className = "modal__label">Course Title</label>
                            <input type="text" name="course_title" className = "modal__input" onChange = {handleChange} value = {examDetails.course_title} placeholder = "Enter course title" />
                        </div>
                    </div>
                    <div className = "modal__wrapper">
                        <div className = "modal__group">
                            <label htmlFor="" className = "modal__label">Course Code</label>
                            <input type="text" name="course_code" className = "modal__input" onChange = {handleChange} value = {examDetails.course_code} placeholder = "Enter course code" />
                        </div>
                    </div>
                    <div className = "modal__wrapper">
                        <div className = "modal__group">
                            <label htmlFor="" className = "modal__label">Class</label>
                            <select name="class_level" className = "modal__input" onChange = {handleChange} value = {examDetails.class_level}>
                                <option value="" className = "modal__op-placeholder" selected = "selected">Choose Class</option>
                                {
                                    rawData.length > 0 &&
                                    Object.keys(rawData[0].class).map((key, value) => (
                                        <option key = { key } value = { key }>{ rawData[0].class[key] }</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className = "modal__group">
                            <label htmlFor="" className = "modal__label">Department</label>
                            <select name="department" className = "modal__input" onChange = {handleChange} value = {examDetails.department}>
                                <option value="" className = "modal__op-placeholder" selected = "selected">Choose Department</option>
                                {
                                    rawData.length > 0 &&
                                    Object.keys(rawData[0].dpt).map((key, value) => (
                                        <option key = { key } value = { key }>{ rawData[0].dpt[key] }</option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>
                    <div className = "modal__wrapper">
                        <div className = "modal__group">
                            <label htmlFor="" className = "modal__label">Exam Date</label>
                            <input type="date" name="exam_date" className = "modal__input" onChange = {handleChange} value = {examDetails.exam_date} />
                        </div>
                        <div className = "modal__group">
                            <label htmlFor="" className = "modal__label">Venue</label>
                            <select name="venue" className = "modal__input" onChange = {handleChange} value = {examDetails.venue}>
                                <option value="" className = "modal__op-placeholder" selected = "selected">Choose Venue</option>
                                {
                                rawData.length > 0 &&
                                rawData[0].venue.map( (item, idx) => (
                                    <option key = { item.value } value = {item.value}>{item.label}</option>
                                ) )
                            }
                            </select>
                        </div>
                    </div>
                    <div className = "modal__wrapper">
                        <div className = "modal__group">
                            <label htmlFor="" className = "modal__label">Duration</label>
                            <select name="duration" className = "modal__input" onChange = {handleChange} value = {examDetails.duration}>
                            <option value="" className = "modal__op-placeholder" selected = "selected">Choose Duration</option>
                            {
                                rawData.length > 0 &&
                                rawData[0].duration.map( (item, idx) => (
                                    <option key = { item.value } value = {item.value}>{item.label}</option>
                                ) )
                            }
                            </select>
                        </div>
                        <div className = "modal__group">
                            <label htmlFor="" className = "modal__label">Start Time</label>
                            <input type="time" name="start_time" className = "modal__input" onChange = {handleChange} value = {examDetails.start_time} />
                        </div>
                    </div>
                    <div className = "modal__wrapper">
                        <div className = "modal__group">
                            <label htmlFor="" className = "modal__label">Lecturer</label>
                            <select name="lecturer" className = "modal__input" onChange = {handleChange} value = {examDetails.lecturer}>
                                <option value="" className = "modal__op-placeholder" selected = "selected">Choose Lecturer</option>
                                {
                                rawData.length > 0 &&
                                rawData[0].lecturer.map( (item) => (
                                    <option key = { item.value } value = {item.value}>{item.label}</option>
                                ) )
                            }
                            </select>
                        </div>
                    </div>
                    <div className = "modal__wrapper">
                        <div className = "modal__group">
                            <label htmlFor="" className = "modal__label">Additional Notes</label>
                            <textarea name="additional_notes" className = "modal__input" onChange = {handleChange} value = {examDetails.additional_notes} placeholder = "Any special instrucions or notes..."></textarea>
                        </div>
                    </div>
                    <div className = "modal__btn-wrapper">
                        <div className = "modal__btns">
                            <button type = "button" className = "modal__btn-conflict" onClick = { handleConflict }>Check Conflict</button>
                            <button type = "button" className = "modal__btn-cancel" onClick = { () => setModal( (bool) => !bool ) }>Cancel</button>
                            <button type = "submit" className = "modal__btn-schedule">
                                <span className = "modal__btn-schedule--icon"><SaveIcon /> </span>
                                Schedule Exam</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
  )
}
