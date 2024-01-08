import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditPayroll = () => {
  const { id } = useParams();
  const [payroll, setPayroll] = useState({
    staff_name: '',
    leave_days: '',
    attendance_days: '',
    payment_date: '',
    total_amount: ''
  });


  const [category, setCategory] = useState([]);
  const navigate = useNavigate();

  
  useEffect(() => {

    axios.get(`http://localhost:3000/auth/payroll/${id}`)
      .then(result => {
        setPayroll({
          ...payroll,
          staff_name: result.data.Result[0].staff_name,
          leave_days: result.data.Result[0].leave_days,
          attendance_days: result.data.Result[0].attendance_days,
          payment_date: result.data.Result[0].payment_date,
          total_amount: result.data.Result[0].total_amount,
        });
      })
      .catch(err => console.log(err));

  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    axios.put(`http://localhost:3000/auth/edit_payroll/${id}`, payroll)
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
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Edit Payroll Details</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="staff_name" className="form-label">
                    <strong>Staff Name:</strong>
                  </label>
                  <input
                    type="text"
                    name="staff_name"
                    value={payroll.staff_name}
                    onChange={(e) => setPayroll({ ...payroll, staff_name: e.target.value })}
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="leave_days" className="form-label">
                    <strong>Leave Days:</strong>
                  </label>
                  <input
                    type="text"
                    name="leave_days"
                    value={payroll.leave_days}
                    onChange={(e) => setPayroll({ ...payroll, leave_days: e.target.value })}
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="attendance_days" className="form-label">
                    <strong>Attendance Days:</strong>
                  </label>
                  <input
                    type="text"
                    name="attendance_days"
                    value={payroll.attendance_days}
                    onChange={(e) => setPayroll({ ...payroll, attendance_days: e.target.value })}
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="payment_date" className="form-label">
                    <strong>Payment Date:</strong>
                  </label>
                  <input
                    type="date"
                    name="payment_date"
                    value={payroll.payment_date}
                    onChange={(e) => setPayroll({ ...payroll, payment_date: e.target.value })}
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="total_amount" className="form-label">
                    <strong>Total Amount:</strong>
                  </label>
                  <input
                    type="text"
                    name="total_amount"
                    value={payroll.total_amount}
                    onChange={(e) => setPayroll({ ...payroll, total_amount: e.target.value })}
                    className="form-control"
                  />
                </div>
                
                <button className='btn btn-success w-100 rounded-0 mb-2'>Edit Payroll</button>

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPayroll;
