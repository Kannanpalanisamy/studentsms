import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddPayroll = () => {

  const navigate = useNavigate();
  
  const [payroll, setPayroll] = useState({
    staff_name: '',
    leave_days: '',
    attendance_days: '',
    payment_date: '',
    total_amount: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/auth/add_payroll', payroll)
      .then(result => {
        if (result.data.Status) {
          navigate('/dashboard/payroll');
        } else {
          alert(result.data.Error);
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Payroll Details</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="staff_name" className="form-label">
                    <strong>Staff Name:</strong>
                  </label>
                  <input
                    type="text"
                    name="staff_name"
                    placeholder="Enter Staff Name"
                    onChange={(e) => setPayroll({ ...payroll, staff_name: e.target.value })}
                    className="form-control"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="leave_days" className="form-label">
                    <strong>Leave:</strong>
                  </label>
                  <input
                    type="text"
                    name="leave_days"
                    placeholder="Enter Leave Days"
                    onChange={(e) => setPayroll({ ...payroll, leave_days: e.target.value })}
                    className="form-control rounded-0"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="attendance_days" className="form-label">
                    <strong>Attendance Days:</strong>
                  </label>
                  <input
                    type="text"
                    name="attendance_days"
                    placeholder="Enter Attendance Days"
                    onChange={(e) => setPayroll({ ...payroll, attendance_days: e.target.value })}
                    className="form-control rounded-0"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="payment_date" className="form-label">
                    <strong>Payment Date:</strong>
                  </label>
                  <input
                    type="date"
                    name="payment_date"
                    onChange={(e) => setPayroll({ ...payroll, payment_date: e.target.value })}
                    className="form-control rounded-0"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="total_amount" className="form-label">
                    <strong>Total Amount:</strong>
                  </label>
                  <input
                    type="text"
                    name="total_amount"
                    placeholder="Enter Total Amount"
                    onChange={(e) => setPayroll({ ...payroll, total_amount: e.target.value })}
                    className="form-control rounded-0"
                  />
                </div>

                <button type="submit" className="btn btn-success w-100">
                  Add Payment
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPayroll;
