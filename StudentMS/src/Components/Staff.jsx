import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Staff = () => {
  const [staff, setStaffDetails] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3000/auth/staff')
      .then(result => {
        if (result.data.Status) {
          setStaffDetails(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch(err => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/auth/delete_staff/${id}`)
      .then(result => {
        if (result.data.Status) {
          window.location.reload();
        } else {
          alert(result.data.Error);
        }
      });
  }

  return (
    <div className='container mt-5'>
      <div className='d-flex justify-content-between align-items-center mb-4'>
        <h3 className="text-primary">Staff List</h3>
        <Link to="/dashboard/add_staff" className='btn btn-success'>Add Staff</Link>
      </div>
      <table className='table table-striped'>
        <thead className="bg-info text-white">
          <tr>
            <th>ID</th>
            <th>StaffName</th>
            <th>Address</th>
            <th>Contact</th>
            <th>DOB</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Position</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {staff.map((e, index) => (
            <tr key={e.id} className={index % 2 === 0 ? 'bg-light' : ''}>
              <td>{e.id}</td>
              <td>{e.staff_name}</td>
              <td>{e.address}</td>
              <td>{e.contact}</td>
              <td>{new Date(e.dob).toLocaleDateString()}</td>
              <td>{e.email}</td>
              <td>{e.gender}</td>
              <td>{e.postion}</td>
              <td>
                <Link to={`/dashboard/edit_staff/${e.id}`} className="btn btn-info btn-sm me-2">Edit</Link>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(e.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Staff;
