import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditAttendance = () => {
    const { id } = useParams();
    const [attendancelist, setAttendancelist] = useState({
        student_name: '',
        class: '',
        section: '',
        date: '',
        attendance: '',
        remarks: ''
    });

    const [category, setCategory] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {


        axios.get(`http://localhost:3000/auth/attendance/${id}`)
            .then(result => {
                setAttendancelist({
                    ...attendancelist,

                    student_name: result.data.Result[0].student_name,
                    class: result.data.Result[0].class,
                    section: result.data.Result[0].section,
                    date: result.data.Result[0].date,
                    attendance: result.data.Result[0].attendance,
                    remarks: result.data.Result[0].remarks
                });
            })
            .catch(err => console.log(err));
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:3000/auth/edit_attendance/${id}`, attendancelist)
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
        <div className='d-flex justify-content-center align-items-center vh-100'>
            <div className='p-4 rounded w-50 border shadow'>
                <h2 className='mb-4 text-center'>Edit Attendance</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor='studentname'><strong>Student Name:</strong></label>
                        <input
                            type='text'
                            name='studentname'
                            placeholder='Enter Student name'
                            value={attendancelist.student_name}
                            onChange={(e) => setAttendancelist({ ...attendancelist, student_name: e.target.value })}
                            className='form-control rounded-0'
                        />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='class'><strong>Class:</strong></label>
                        <input
                            type='text'
                            name='class'
                            placeholder='Enter Class'
                            value={attendancelist.class}
                            onChange={(e) => setAttendancelist({ ...attendancelist, class: e.target.value })}
                            className='form-control rounded-0'
                        />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='section'><strong>Section:</strong></label>
                        <input
                            type='text'
                            name='section'
                            placeholder='Enter Section'
                            value={attendancelist.section}
                            onChange={(e) => setAttendancelist({ ...attendancelist, section: e.target.value })}
                            className='form-control rounded-0'
                        />
                    </div>
                    <div className="mb-3">
                
                  <label htmlFor="date" className="form-label">
                    <strong>Date:</strong>
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={attendancelist.date }
                    onChange={(e) =>
                      setAttendancelist({ ...attendancelist, date: e.target.value })
                    }
                    className="form-control rounded-0"
                  />
                </div>



                    <div className='mb-3'>
                        <label htmlFor='attendance'><strong>Attendance:</strong></label>
                        <select
                            name='attendance'
                            value={attendancelist.attendance}
                            onChange={(e) => setAttendancelist({ ...attendancelist, attendance: e.target.value })}
                            className='form-control rounded-0'
                        >
                            <option value=''>Select Attendance</option>
                            <option value='present'>Present</option>
                            <option value='absent'>Absent</option>
                        </select>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='remarks'><strong>Remarks:</strong></label>
                        <input
                            type='text'
                            name='remarks'
                            placeholder='Enter Remarks'
                            value={attendancelist.remarks}
                            onChange={(e) => setAttendancelist({ ...attendancelist, remarks: e.target.value })}
                            className='form-control rounded-0'
                        />
                    </div>
                    <button className='btn btn-success w-100 rounded-0 mt-3'>Edit Attendance</button>
                </form>
            </div>
        </div>
    );
};

export default EditAttendance;
