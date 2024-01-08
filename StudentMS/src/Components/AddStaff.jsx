import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const AddStaff = () => {
  const navigate = useNavigate();

  const [staffDetails, setStaff] = useState({
   
   
    staff_name: '',
    address: '',
    contact: '',
    dob: '',
    email: '',
    gender: '',
    postion: ''
  
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    
      axios.post('http://localhost:3000/auth/add_staff', staffDetails)
     .then(result => {
      if (result.data.Status) {
        navigate('/dashboard/staff');
      } else {
        alert(result.data.Error);
      }
     })
     .catch(err => console.log(err))
  }
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Add Staff</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    <strong>Name:</strong>
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter Name"
                    onChange={(e) =>
                      setStaff({ ...staffDetails, staff_name: e.target.value })
                    }
                    className="form-control rounded-0"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="address" className="form-label">
                    <strong>Address:</strong>
                  </label>
                  <input
                    type="text"
                    name="address"
                    placeholder="Enter Address"
                    onChange={(e) =>
                      setStaff({ ...staffDetails, address: e.target.value })
                    }
                    className="form-control rounded-0"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="contact" className="form-label">
                    <strong>Contact:</strong>
                  </label>
                  <input
                    type="text"
                    name="contact"
                    placeholder="Enter Contact"
                    onChange={(e) =>
                      setStaff({ ...staffDetails, contact: e.target.value })
                    }
                    className="form-control rounded-0"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="dob" className="form-label">
                    <strong>DOB:</strong>
                  </label>
                  <input
                    type="date"
                    name="dob"
                    onChange={(e) =>
                      setStaff({ ...staffDetails, dob: e.target.value })
                    }
                    className="form-control rounded-0"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    <strong>Email:</strong>
                  </label>
                  <input
                    type="text"
                    name="email"
                    placeholder="Enter Email"
                    onChange={(e) =>
                      setStaff({ ...staffDetails, email: e.target.value })
                    }
                    className="form-control rounded-0"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="gender" className="form-label">
                    <strong>Gender:</strong>
                  </label>
                  <input
                    type="text"
                    name="gender"
                    placeholder="Enter Gender"
                    onChange={(e) =>
                      setStaff({ ...staffDetails, gender: e.target.value })
                    }
                    className="form-control rounded-0"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="position" className="form-label">
                    <strong>Position:</strong>
                  </label>
                  <input
                    type="text"
                    name="position"
                    placeholder="Enter Position"
                    onChange={(e) =>
                      setStaff({ ...staffDetails, postion: e.target.value })
                    }
                    className="form-control rounded-0"
                  />
                </div>
                <button className="btn btn-success w-100 rounded-0 mb-2">
                  Add Staff
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddStaff;
