import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link,  } from 'react-router-dom';

const Attendance = () => {
  const [attendance, setAttendance] = useState([]);
  

  useEffect(() => {
    axios.get('http://localhost:3000/auth/attendance')
      .then(result => {
        if (result.data.Status) {
          setAttendance(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch(err => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/auth/delete_attendance/${id}`)
      .then(result => {
        if (result.data) {
          window.location.reload();
        } else {
          alert(result.data.Error);
        }
      });
  };

  return (
    <div className='container mt-5'>
      <div className='d-flex justify-content-between align-items-center mb-4'>
        <h3 className="text-danger">Attendance List</h3>
        <Link to="/dashboard/add_attendance" className='btn btn-success'>Add Attendance</Link>
      </div>
      <div className='mt-3'>
        <table className='table table-bordered table-striped'>
          <thead className="bg-warning text-dark">
            <tr>
              <th>ID</th>
              <th>Student Name</th>
              <th>Class</th>
              <th>Section</th>
              <th>Date</th>
              <th>Attendance</th>
              <th>Remarks</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {attendance.map(e => (
              <tr key={e.id}>
                <td>{e.id}</td>
                <td>{e.student_name}</td>
                <td>{e.class}</td>
                <td>{e.section}</td>
                <td>{e.date}</td>
                <td>{e.attendance}</td>
                <td>{e.remarks}</td>
                <td>
                  <Link to={`/dashboard/edit_attendance/${e.id}`} className='btn btn-info btn-sm me-2'>Edit</Link>
                  <button className='btn btn-danger btn-sm' onClick={() => handleDelete(e.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Attendance;
