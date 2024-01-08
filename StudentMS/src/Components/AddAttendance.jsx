import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AddAttendance = () => {
  const navigate = useNavigate();

  const [attendancelist, setAttendancelist] = useState({
    student_name: '',
    class: '',
    section: '',
    date: '',
    attendance: '',
    remarks: ''
  });

  const [category, setCategory] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/auth/category')
      .then(result => {
        if (result.data.Status) {
          setCategory(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch(err => console.log(err));
  }, []);

  const handleSubmit = (e) => {




    e.preventDefault();
    const formData = new FormData();

    formData.append('studentname', attendancelist.student_name);
    formData.append('class', attendancelist.class);
    formData.append('section', attendancelist.section);
    formData.append('date', attendancelist.date);
    formData.append('attendance', attendancelist.attendance);
    formData.append('remarks', attendancelist.remarks);
    
    console.log("Data to be Sent:", attendancelist);

    axios.post('http://localhost:3000/auth/add_attendance', attendancelist)
      .then(result => {
        if (result.data.Status) {
          navigate('/dashboard/attendance');
        } else {
          alert(result.data.Error);
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <div className='container mt-5'>
      <div className='row justify-content-center'>
        <div className='col-md-6'>
          <div className='card'>
            <div className='card-body'>
              <h2 className='card-title text-center mb-4'>Add Attendance</h2>
              <form onSubmit={handleSubmit}>

                <div className="mb-3">
                  <label htmlFor="studentname" className="form-label"><strong>Student Name:</strong></label>
                  <input type="text" name="studentname" placeholder="Enter Student name"
                    onChange={(e) => setAttendancelist({ ...attendancelist, student_name: e.target.value })}
                    className="form-control rounded-0" />
                </div>
                <div className="mb-3">
                  <label htmlFor="class" className="form-label"><strong>Class:</strong></label>
                  <input type="text" name="class" placeholder="Enter Class"
                    onChange={(e) => setAttendancelist({ ...attendancelist, class: e.target.value })}
                    className="form-control rounded-0" />
                </div>
                <div className="mb-3">
                  <label htmlFor="section" className="form-label"><strong>Section:</strong></label>
                  <input type="text" name="section" placeholder="Enter Section"
                    onChange={(e) => setAttendancelist({ ...attendancelist, section: e.target.value })}
                    className="form-control rounded-0" />
                </div>

                <div className="mb-3">
                  <label htmlFor="date" className="form-label">
                    <strong>Date:</strong>
                  </label>
                  <input
                    type="date"
                    name="date"
                    onChange={(e) =>
                      setAttendancelist({ ...attendancelist, date: e.target.value })
                    }
                    className="form-control rounded-0"
                  />
                </div>


                <div className="mb-3">
                  <label htmlFor="attendance" className="form-label"><strong>Attendance:</strong></label>
                  <select
                    name="attendance"
                    onChange={(e) => setAttendancelist({ ...attendancelist, attendance: e.target.value })}
                    className="form-control rounded-0"
                  >
                    <option value="">Select Attendance</option>
                    <option value="present">Present</option>
                    <option value="absent">Absent</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="remarks" className="form-label"><strong>Remarks:</strong></label>
                  <input type="text" name="remarks" placeholder="Enter Remarks"
                    onChange={(e) => setAttendancelist({ ...attendancelist, remarks: e.target.value })}
                    className="form-control rounded-0" />
                </div>
                <button className='btn btn-success w-100 rounded-0 mb-2'>Add Attendance</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddAttendance;
