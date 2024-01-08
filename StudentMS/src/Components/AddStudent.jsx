import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddStudent = () => {
  const navigate = useNavigate();

  const [studentDetails, setStudentDetails] = useState({
    name: '',
    class: '',
    address: '',
    contact: '',
    bloodgroup: '',
    fathername: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post('http://localhost:3000/auth/add_student', { student: studentDetails })
      .then((result) => {
        if (result.data.Status) {
          navigate('/dashboard/student');
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Add Student</h2>
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
                      setStudentDetails({
                        ...studentDetails,
                        name: e.target.value,
                      })
                    }
                    className="form-control rounded-0"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="class" className="form-label">
                    <strong>Class:</strong>
                  </label>
                  <input
                    type="text"
                    name="class"
                    placeholder="Enter Class"
                    onChange={(e) =>
                      setStudentDetails({
                        ...studentDetails,
                        class: e.target.value,
                      })
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
                      setStudentDetails({
                        ...studentDetails,
                        address: e.target.value,
                      })
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
                      setStudentDetails({
                        ...studentDetails,
                        contact: e.target.value,
                      })
                    }
                    className="form-control rounded-0"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="bloodgroup" className="form-label">
                    <strong>Blood Group:</strong>
                  </label>
                  <input
                    type="text"
                    name="bloodgroup"
                    placeholder="Enter Blood Group"
                    onChange={(e) =>
                      setStudentDetails({
                        ...studentDetails,
                        bloodgroup: e.target.value,
                      })
                    }
                    className="form-control rounded-0"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="fathername" className="form-label">
                    <strong>Father's Name:</strong>
                  </label>
                  <input
                    type="text"
                    name="fathername"
                    placeholder="Enter Father's Name"
                    onChange={(e) =>
                      setStudentDetails({
                        ...studentDetails,
                        fathername: e.target.value,
                      })
                    }
                    className="form-control rounded-0"
                  />
                </div>
                <button className="btn btn-success w-100 rounded-0 mb-2">
                  Add Student
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddStudent;
