import { useState, useEffect, use } from 'react'
import { Link, Routes, Route } from 'react-router-dom';

import { StudentDashboard } from '../components/StudentDashboard';
import { StudentCalendarView } from '../components/StudentCalendarView';
import { StudentListView } from '../components/StudentListView';

import { CircleGauge, CalendarDays, Calendar, List, ArrowBigRightIcon, MessageCircleMoreIcon, SquareXIcon, ArrowRight } from "lucide-react";

export const StudentPage = () => {
    const [scheduleExamDetails, setScheduleExamDetails] = useState([]);
    /// get the total exams
    const [totalExams, setTotalExams] = useState(0);
    const [upcomingExams, setUpcomingExams] = useState(0);
    const [completedExams, setCompletedExams] = useState(0);
    const [notificationModal, setNotificationModal] = useState(false);
    const [dpt, setDpt] = useState('');
    const [notificationModalDetails, setNotificationModalDetails] = useState(false)
    const [examDetails, setExamDetails] = useState([])
    const [notification, setNotification] = useState(0);
    const [computerScienceNotification, setComputerScienceNotification] = useState(0);
    const [softwareNotification, setSoftwareNotification] = useState(0);
    const [artificialIntelligentNotification, setArtificialIntelligentNotification] = useState(0);
    const [networkingNotification, setNetworkingNotification] = useState(0);
    const [cyberSecurityNotification, setCyberSecurityNotification] = useState(0);

    // Load data from localStorage on component mount
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('schedule_exam')) ?? [];
        setScheduleExamDetails(data);
    }, []);

    useEffect(() => {
        const total = scheduleExamDetails.length;
        setTotalExams(total);
    })

    // count for notification and 
    useEffect(() => {
        const upComingExam = scheduleExamDetails.filter(upcomig => upcomig.status === 'upcoming');
        const countUpcomingExam = upComingExam.length;
        setUpcomingExams(countUpcomingExam);
        setNotification(countUpcomingExam);
    })

    // Show status on COMPLETED EXAMS
    useEffect(() => {
        let completedExam = scheduleExamDetails.filter(completedExams => completedExams.status === 'completed');
        let countCompletedExam = completedExam.length;
        setCompletedExams(countCompletedExam);
    })
        

    /// selected exams that will apper at notification
    useEffect( () => {
        if (dpt && scheduleExamDetails.length > 0) {
            const selectedSomeExams = scheduleExamDetails.filter( (d) => d.status === 'upcoming' && d.department === dpt );
            setExamDetails(selectedSomeExams);
        }
        setNotificationModalDetails(true);
    }, [dpt] );
    
    // Show notification for each department
    useEffect(() => {
        const notiComputerScience = scheduleExamDetails.filter(exam => exam.status === 'upcoming' && exam.department === 'COM' );
        const countComputerScience = notiComputerScience.length;
        setComputerScienceNotification(countComputerScience);
       
    })

    useEffect(() => {
        const notiSoftware = scheduleExamDetails.filter(exam => exam.status === 'upcoming' && exam.department === 'SWD' );
        const countSoftware = notiSoftware.length;
        setSoftwareNotification(countSoftware);
       
    })

    useEffect(() => {
        const notiArtificialIntelligent = scheduleExamDetails.filter(exam => exam.status === 'upcoming' && exam.department === 'AIT' );
        const countArtificialIntelligent = notiArtificialIntelligent.length;
        setArtificialIntelligentNotification(countArtificialIntelligent);
       
    })

    useEffect(() => {
        const notiNetworking = scheduleExamDetails.filter(exam => exam.status === 'upcoming' && exam.department === 'NCC' );
        const countNetworking = notiNetworking.length;
        setNetworkingNotification(countNetworking);
       
    })

    useEffect(() => {
        const notiCyberSecurity = scheduleExamDetails.filter(exam => exam.status === 'upcoming' && exam.department === 'CYS' );
        const countCyberSecurity = notiCyberSecurity.length;
        setCyberSecurityNotification(countCyberSecurity);
       
    })

  return (
    <div className = "admin">

        {/* Header part */}
        <header className = "header">
            <div className = "header__title">
                <Calendar />
                <h3 className = "header__name">Exam Scheduling System</h3>
            </div>

            <div className = "header__nav">
                    <div className = "header__notification">
                        <span className = "header__noti" onClick={ () => setNotificationModal(true) }>
                            <span className = "header__notify">{notification}</span>
                            <MessageCircleMoreIcon size = { 22 } />    
                        </span>
                    </div>
                    <Link to = "/" className = "header__logout" title = "Log Out" >
                        <span className = "header__arrow-icon"><ArrowBigRightIcon /></span>
                    </Link>
            </div>
        </header>

        {/* Body content  */}
        <div className = "body">
            <div className = "body__sidebar">
                <div className = "body__nav">
                    <h3 className = "body__nav-title">Navigation</h3>
                    <div className = "body__link-box">
                        <span className = "body__nav-icon"><CircleGauge /></span>
                        <Link to = "/student/dashboard" className = "body__link">Dashboard</Link>
                    </div>
                    <div className = "body__link-box">
                        <span className = "body__nav-icon"><CalendarDays /></span>
                        <Link to = "/student/calendar" className = "body__link">Calendar View</Link>
                    </div>
                    <div className = "body__link-box">
                        <span className = "body__nav-icon"><List /></span>
                        <Link to = "/student/list" className = "body__link">List View</Link>
                    </div>
                    <div className = "body__link-box">
                        <span className = "body__nav-icon"><ArrowBigRightIcon /></span>
                        <Link to = "/" className = "body__link">Log Out</Link>
                        </div>
                </div>
                <div className = "body__statistics">
                    <h3 className = "body__nav-title">Quick Statistics</h3>
                    <div className = "body__stat">
                        <span className = "body__text">Upcoming Exams</span> <strong className = "body__num">{upcomingExams}</strong>
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
                    <Route path = "dashboard" element = {<StudentDashboard />} />
                    <Route path = "calendar" element = { <StudentCalendarView /> } />
                    <Route path = "list" element = { <StudentListView /> } />
                    {/* Adding a default route */}
                    <Route index element = {<StudentDashboard />} />
                </Routes>
            </main>
        </div> 

        {/* Exam Schedule modal form */}
        {/* <div className = { modal ? 'modal active' : 'modal' }>
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
                            <button type = "button" className = "modal__btn-conflict" >Conflict</button>
                            <button type = "button" className = "modal__btn-cancel" onClick = { () => setModal( (bool) => !bool ) }>Cancel</button>
                            <button type = "submit" className = "modal__btn-schedule">
                                <span className = "modal__btn-schedule--icon"><SaveIcon /> </span>
                                Schedule Exam</button>
                        </div>
                    </div>
                </div>
            </form>
        </div> */}

        {/* Notification Modal */}
        {
            notificationModal &&
            (
                <div className = "notification">
                    <div className = "notification__cancel" onClick = { () => { setNotificationModal(false); setNotificationModalDetails(false) } }>
                        <SquareXIcon />
                    </div>
                    <div className = "notification__items" onClick = { () => setDpt('COM') }>
                        <span className = "notification__number">{computerScienceNotification}</span>
                        <span className = "notification__text">Computer Science</span>
                    </div>
                    <div className = "notification__items" onClick = { () => setDpt('SWD') }>
                        <span className = "notification__number">{softwareNotification}</span>
                        <span className = "notification__text">Software & Web Development</span>
                    </div>
                    <div className = "notification__items" onClick = { () => setDpt('AIT') }>
                        <span className = "notification__number">{artificialIntelligentNotification}</span>
                        <span className = "notification__text">Artificial Intelligent</span>
                    </div>
                    <div className = "notification__items" onClick = { () => setDpt('NCC') }>
                        <span className = "notification__number">{networkingNotification}</span>
                        <span className = "notification__text">Networking</span>
                    </div>
                    <div className = "notification__items" onClick = { () => setDpt('CYS') }>
                        <span className = "notification__number">{cyberSecurityNotification}</span>
                        <span className = "notification__text">Cyber Security</span>
                    </div>
                   
                </div>
            )
        }

        {/* Notitification details for each dpt */}
        {
            notificationModalDetails && (
                <form 
                    className = {`notification__surbodinate 
                    ${dpt === 'COM' ? 'notification__comp' : ''} 
                    ${dpt === 'SWD' ? 'notification__swd' : ''} 
                    ${dpt === 'AIT' ? 'notification__ait' : ''} 
                    ${dpt === 'NCC' ? 'notification__ncc' : ''} 
                    ${dpt === 'CYS' ? 'notification__cys' : ''} `
                    }
                >
                    <input type="hidden" name="" value = { dpt } />
                   {
                    examDetails.map( ex => (
                        <div className = "notification__wrapper">
                            <strong className = "notification__detail">{ex.course_title}</strong> <br />
                            <span className = "notification__detail">{ex.course_code}</span>
                            <span className = "notification__detail">{ex.class_level}</span> <br />
                            <span className = "notification__detail">{ex.department}</span>
                        </div>
                    ) )
                   }
                </form>
            )
        }
    </div>
  )
}
