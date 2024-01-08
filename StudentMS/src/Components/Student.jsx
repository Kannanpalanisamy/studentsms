import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Student = () => {
  const [student, setStudentDetails] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3000/auth/student')
      .then(result => {
        if (result.data.Status) {
          setStudentDetails(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch(err => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/auth/delete_student/${id}`)
      .then(result => {
        if (result.data.Status) {
          window.location.reload();
        } else {
          alert(result.data.Error);
        }
      });
  };

  return (
    <div className='container mt-5'>
      <div className='d-flex justify-content-between align-items-center mb-4'>
        <h3 className='text-primary'>Student List</h3>
        <Link to="/dashboard/add_student" className='btn btn-success'>Add Student</Link>
      </div>
      <table className='table table-striped'>
        <thead className='bg-info text-white'>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Class</th>
            <th>Contact</th>
            <th>Blood Group</th>
            <th>Father's Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {student.map((c, index) => (
            <tr key={c.id} className={index % 2 === 0 ? 'bg-light' : ''}>
              <td>{c.id}</td>
              <td>{c.name}</td>
              <td>{c.class}</td>
              <td>{c.contact}</td>
              <td>{c.bloodgroup}</td>
              <td>{c.fathername}</td>
              <td>
                <Link to={`/dashboard/edit_student/${c.id}`} className='btn btn-info btn-sm mr-2'>Edit</Link>
                <button className='btn btn-danger btn-sm' onClick={() => handleDelete(c.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Student;
