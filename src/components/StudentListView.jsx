import { useState, useEffect } from 'react'

import { EditIcon, DeleteIcon } from "lucide-react";

import rawData from './ui/utils';

export const StudentListView = () => {

    const [getScheduleExam, setGetScheduleExam] = useState([]);

    // Load data from localStorage on component mount
    useEffect(() => {
      const data = JSON.parse(localStorage.getItem('schedule_exam')) ?? [];
      setGetScheduleExam(data);
    }, []);

  return (
    <div className = "student-exam-list ">
          <h3 className = "student-exam-list__heading size-big"> Examination List</h3>
          {/* <div className = "student-exam-list__wrapper"> */}
            <div className = "student-exam-list__table m-t-big">
              <div className="student-exam-list__header student-exam-list__header--row">
                {
                  rawData[0].tableTitle2.map(header => (
                    <strong className = "student-exam-list__head">{header.label}</strong>
                  ))
                }
              </div>
              <div className = "student-exam-list__body">
                {
                  getScheduleExam.map(({course_title,course_code,class_level,department,exam_date,start_time,duration,venue,additional_notes,status, exam_id}) => (
                    <div key = {exam_id} className = "student-exam-list__tr">
                      <div className = "student-exam-list__data">
                        <strong className = "student-exam-list__strong">{course_title}</strong> <br />
                        <span className = "student-exam-list__span">{course_code}</span> <span className = "student-exam-list__span">{class_level}</span> <br />
                        <span className = "student-exam-list__span">{department}</span>
                      </div>
                      <div className = "student-exam-list__data">
                        <strong className = "student-exam-list__strong">{exam_date}</strong> <br />
                        <span className = "student-exam-list__span">{start_time}</span>
                      </div>
                      <div className = "student-exam-list__data">
                        <strong className = "student-exam-list__strong">{duration}</strong>
                      </div>
                      <div className = "student-exam-list__data">
                        <strong className = "student-exam-list__strong">{venue}</strong>
                      </div>
                      <div className = "student-exam-list__data">
                        <strong className = "student-exam-list__strong">{additional_notes}</strong>
                      </div>
                      <div className = "student-exam-list__data">
                        <strong className = "student-exam-list__strong">{status}</strong>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
          {/* </div> */}
    
    </div>
  )
}
