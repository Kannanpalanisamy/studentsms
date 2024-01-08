import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const TimeTable = () => {
  const [timetable, setTimetable] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3000/auth/timetable')
      .then(result => {
        if (result.data.Status) {
          setTimetable(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch(err => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/auth/delete_timetable/${id}`)
      .then(result => {
        if (result.data.Status) {
          window.location.reload();
        } else {
          alert(result.data.Error);
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <div className='container mt-5'>
      <div className='d-flex justify-content-between align-items-center mb-4'>
        <h3 className="text-primary">Timetable List</h3>
        <Link to="/dashboard/add_timetable" className='btn btn-success'>Add Timetable</Link>
      </div>
      <div className='mt-3'>
        <table className='table table-bordered table-striped'>
          <thead className="bg-primary text-white">
            <tr>
              <th>ID</th>
              <th>Staff Name</th>
              <th>Subject Name</th>
              <th>Class</th>
              <th>Section</th>
              <th>Date</th>
              <th>Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {timetable.map(c => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.staffname}</td>
                <td>{c.subjectname}</td>
                <td>{c.class}</td>
                <td>{c.section}</td>
                <td>{new Date(c.date).toLocaleDateString()}</td>
                <td>{c.time}</td>
                <td>
                  <Link to={`/dashboard/edit_timetable/${c.id}`} className="btn btn-info btn-sm me-2">Edit</Link>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(c.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TimeTable;
