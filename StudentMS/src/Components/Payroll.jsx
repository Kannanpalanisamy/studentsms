import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Payroll = () => {
  const [payroll, setPayrollDetails] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3000/auth/payroll')
      .then((result) => {
        if (result.data.Status) {
          setPayrollDetails(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3000/auth/delete_payroll/${id}`)
      .then((result) => {
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
        <h3 className='text-primary'>Payroll List</h3>
        <Link to='/dashboard/add_payroll' className='btn btn-success'>
          Add Pay
        </Link>
      </div>
      <table className='table table-striped'>
        <thead className='bg-info text-white'>
          <tr>
            <th>ID</th>
            <th>Staffname</th>
            <th>LeaveDays</th>
            <th>AttendanceDays</th>
            <th>PaymentDate</th>
            <th>TotalAmount</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {payroll.map((c, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-light' : ''}>
              <td>{c.id}</td>
              <td>{c.staff_name}</td>
              <td>{c.leave_days}</td>
              <td>{c.attendance_days}</td>
              <td>{c.payment_date}</td>
              <td>{c.total_amount}</td>
              <td>
                <Link to={`/dashboard/edit_payroll/${c.id}`} className='btn btn-info btn-sm mr-2'>
                  Edit
                </Link>
                <button className='btn btn-danger btn-sm' onClick={() => handleDelete(c.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Payroll;
