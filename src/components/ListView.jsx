import { useState, useEffect } from 'react';
import { EditIcon, DeleteIcon, SquareX, SaveIcon } from "lucide-react";

import rawData from './ui/utils';

export const ListView = () => {
    const [getScheduleExam, setGetScheduleExam] = useState([]);
    const [hiddenVal, setHiddenVal] = useState('');
    const [modal, setModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
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
            duration: selectedExam.duration || '',
            start_time: selectedExam.start_time || '',
            lecturer: selectedExam.lecturer || '',
            additional_notes: selectedExam.additional_notes || '',
            status: selectedExam.status
          });
          setIsEditing(true);
          setModal(true); // Open modal when an exam is selected
        }
      }
      
    }, [hiddenVal, getScheduleExam]);
    

    const handleChange = (e) => {
      setExamDetails({ ...examDetails, [e.target.name]: e.target.value });
    };

    const handleScheduleExistingExam = (evt) => {
      evt.preventDefault();

      if(//!examId || 
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

      let updatedExams = [...getScheduleExam];

      // Update existing exam
      if(isEditing) {
        updatedExams = updatedExams.map(exam => 
          exam.exam_id === hiddenVal ? { ...examDetails } : exam
        );
      } 
      else {
        // Add new exam
        const newExam = {
          ...examDetails,
          exam_id: Date.now().toString() // Simple unique ID
        };
        updatedExams.push(newExam);
      }

      // Save to localStorage and state
      localStorage.setItem('schedule_exam', JSON.stringify(updatedExams));
      setGetScheduleExam(updatedExams);

      // reset form
      resetForm();
      setModal(false);
    }

    const handleDeleteExam = (examId) => {
      if (window.confirm('Are you sure you want to delete this exam?')) {
        const updatedExams = getScheduleExam.filter(exam => exam.exam_id !== examId);
        
        // Save to localStorage and state
        localStorage.setItem('schedule_exam', JSON.stringify(updatedExams));
        setGetScheduleExam(updatedExams);
        
        // If deleting the currently edited exam, reset the form
        if (examId === hiddenVal) {
          resetForm();
          
        }
      }
    };

    // reset form function
    const resetForm = () => {
        setExamDetails({
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
            //status: 'Pending'
        });
        setHiddenVal('');
        setIsEditing(false);
    };

  return (
    <div className = "exam-list ">
      <h3 className = "exam-list__heading size-big"> Examination List</h3>
      {/* <div className = "exam-list__wrapper"> */}
        <div className = "exam-list__table m-t-big">
          <div className="exam-list__header exam-list__header--row">
            {
              rawData[0].tableTitle.map(header => (
                <strong className = "exam-list__head">{header.label}</strong>
              ))
            }
          </div>
          <div className = "exam-list__body">
            {
              getScheduleExam.map(({course_title,course_code,class_level,department,exam_date,start_time,duration,venue,additional_notes,status, exam_id}) => (
                <div key = {exam_id} className = "exam-list__tr">
                  <div className = "exam-list__data">
                    <strong className = "exam-list__strong">{course_title}</strong> <br />
                    <span className = "exam-list__span">{course_code}</span> <span className = "exam-list__span">{class_level}</span> <br />
                    <span className = "exam-list__span">{department}</span>
                  </div>
                  <div className = "exam-list__data">
                    <strong className = "exam-list__strong">{exam_date}</strong> <br />
                    <span className = "exam-list__span">{start_time}</span>
                  </div>
                  <div className = "exam-list__data">
                    <strong className = "exam-list__strong">{duration}</strong>
                  </div>
                  <div className = "exam-list__data">
                    <strong className = "exam-list__strong">{venue}</strong>
                  </div>
                  <div className = "exam-list__data">
                    <strong className = "exam-list__strong">{additional_notes}</strong>
                  </div>
                  <div className = "exam-list__data">
                    <strong className = "exam-list__strong">{status}</strong>
                  </div>
                  <div className = "exam-list__data exam-list__data--btns">
                    <button className = "exam-list__btn exam-list__btn--edit" onClick = {() => setHiddenVal(exam_id)}><span className = "exam-list__span-icon exam-list__span-icon--edit"><EditIcon /></span>Edit</button>
                    <button 
                      className = "exam-list__btn exam-list__btn--delete"
                      onClick={() => handleDeleteExam(exam_id)}
                    >
                      <span className = "exam-list__span-icon exam-list__span-icon--delete"><DeleteIcon /></span>Delete
                    </button>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      {/* </div> */}

      {/* Exam Schedule modal form */}
      {
        modal && (
          <div className = "update-existing-modal">
            <form onSubmit = {handleScheduleExistingExam} className = "update-existing-modal__form">
                <input type="hidden" name="" value = {hiddenVal} />
                <div className = "update-existing-modal__heading">
                    <h3 className = "update-existing-modal__title">Update Existing Exam</h3>
                    <span className = "update-existing-modal__icon-cancel" onClick = { () => setModal(false) }><SquareX /></span>
                </div>
                <div className = "update-existing-modal__details"> 
                    <div className = "update-existing-modal__wrapper">
                        <div className = "update-existing-modal__group">
                            <label htmlFor="" className = "update-existing-modal__label">Course Title</label>
                            <input 
                              type="text" 
                              name="course_title" 
                              className = "update-existing-modal__input" 
                              onChange = {handleChange} 
                              value = {examDetails.course_title}
                              placeholder = "Enter course title" 
                            />
                        </div>
                    </div>
                    <div className = "update-existing-modal__wrapper">
                        <div className = "update-existing-modal__group">
                            <label htmlFor="" className = "update-existing-modal__label">Course Code</label>
                            <input 
                              type="text" 
                              name="course_code" 
                              className = "update-existing-modal__input" 
                              onChange = {handleChange}
                              value = {examDetails.course_code}
                              placeholder = "Enter course code" 
                            />
                        </div>
                    </div>
                    <div className = "update-existing-modal__wrapper">
                        <div className = "update-existing-modal__group">
                            <label htmlFor="" className = "update-existing-modal__label">Class</label>
                            <select 
                              name="class_level" 
                              className = "update-existing-modal__input" 
                              onChange = {handleChange} 
                              value = {examDetails.class_level}
                              required
                            >
                              <option value="" className = "update-existing-modal__op-placeholder">Choose Class</option>
                              {
                                  rawData.length > 0 &&
                                  Object.keys(rawData[0].class).map((key, value) => (
                                      <option key = { key } value = { key }>{ rawData[0].class[key] }</option>
                                  ))
                              }
                            </select>
                        </div>
                        <div className = "update-existing-modal__group">
                            <label htmlFor="" className = "update-existing-modal__label">Department</label>
                            <select 
                              name="department" 
                              className = "update-existing-modal__input" 
                              onChange = {handleChange} 
                              value = {examDetails.department}
                              required
                            >
                              <option value="" className = "update-existing-modal__op-placeholder">Choose Department</option>
                              {
                                rawData.length > 0 &&
                                Object.keys(rawData[0].dpt).map((key, value) => (
                                  <option key = { key } value = { key }>{ rawData[0].dpt[key] }</option>
                                ))
                              }
                            </select>
                        </div>
                    </div>
                    <div className = "update-existing-modal__wrapper">
                        <div className = "update-existing-modal__group">
                            <label htmlFor="" className = "update-existing-modal__label">Exam Date</label>
                            <input 
                              type="date" 
                              name="exam_date" 
                              className = "update-existing-modal__input" 
                              onChange = {handleChange} 
                              value = {examDetails.exam_date}
                              required 
                            />
                        </div>
                        <div className = "update-existing-modal__group">
                            <label htmlFor="" className = "update-existing-modal__label">Venue</label>
                            <select 
                              name="venue" 
                              className = "update-existing-modal__input" 
                              onChange = {handleChange} 
                              value = {examDetails.venue}
                              required
                            >
                              <option value="" className = "update-existing-modal__op-placeholder">Choose Venue</option>
                              {
                              rawData.length > 0 &&
                              rawData[0].venue.map( (item, idx) => (
                                  <option key = { item.value } value = {item.value}>{item.label}</option>
                              ) )
                            }
                            </select>
                        </div>
                    </div>
                    <div className = "update-existing-modal__wrapper">
                        <div className = "update-existing-modal__group">
                            <label htmlFor="" className = "update-existing-modal__label">Duration</label>
                            <select 
                              name="duration" 
                              className = "update-existing-modal__input" 
                              onChange = {handleChange} 
                              value = {examDetails.duration}
                              required
                            >
                              <option value="" className = "update-existing-modal__op-placeholder">Choose Duration</option>
                              {
                                rawData.length > 0 &&
                                rawData[0].duration.map( (item, idx) => (
                                    <option key = { item.value } value = {item.value}>{item.label}</option>
                                ) )
                              }
                            </select>
                        </div>
                        <div className = "update-existing-modal__group">
                          <label htmlFor="" className = "update-existing-modal__label">Start Time</label>
                          <input 
                            type="time" 
                            name="start_time" 
                            className = "update-existing-modal__input" 
                            onChange = {handleChange} 
                            value = {examDetails.start_time} 
                            required
                          />
                        </div>
                    </div>
                    <div className = "update-existing-modal__wrapper">
                        <div className = "update-existing-modal__group">
                          <label htmlFor="" className = "update-existing-modal__label">Lecturer</label>
                          <select 
                            name="lecturer" 
                            className = "update-existing-modal__input" 
                            onChange = {handleChange} 
                            value = {examDetails.lecturer}
                          >
                            <option value="" className = "update-existing-modal__op-placeholder" >Choose Lecturer</option>
                            {
                              rawData.length > 0 &&
                              rawData[0].lecturer.map( (item) => (
                                <option key = { item.value } value = {item.value}>{item.label}</option>
                              ) )
                            }
                          </select>
                        </div>
                    </div>
                    <div className = "update-existing-modal__wrapper">
                        <div className = "update-existing-modal__group">
                          <label htmlFor="" className = "update-existing-modal__label">Additional Notes</label>
                          <textarea 
                            name="additional_notes" 
                            className = "update-existing-modal__input" 
                            onChange = {handleChange} 
                            value = {examDetails.additional_notes} 
                            placeholder = "Any special instrucions or notes..."
                            required
                          ></textarea>
                        </div>
                    </div>
                    <div className = "update-existing-modal__btn-wrapper">
                        <div className = "update-existing-modal__btns">
                          <button type = "button" className = "update-existing-modal__btn-conflict" >Conflict</button>
                          <button type = "button" className = "update-existing-modal__btn-cancel" onClick = { () => setModal(false) }>Cancel</button>
                          <button type = "submit" className = "update-existing-modal__btn-schedule">
                            <span 
                              className = "update-existing-modal__btn-schedule--icon"><SaveIcon /> 
                            </span>
                           {isEditing ? 'Update Exam' : 'Schedule Exam'}
                          </button>
                        </div>
                    </div>
                </div>
            </form>
          </div>
        )
      }

    </div>
  )
}
