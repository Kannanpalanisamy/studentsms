import axios from 'axios';
import React, { useState, useEffect } from 'react';

const AddTimeTable = () => {
  const [timetable, setTimetable] = useState({
    staffname: '',
    subjectname: '',
    class: '',
    section: '',
    date: '',
    time: '',
  });

  const [category, setCategory] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/auth/category')
      .then(result => {
        if (result.data.Status) {
          setCategory(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch(err => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/auth/add_timetable', timetable)
      .then(result => console.log(result.data))
      .catch(err => console.log(err));
  };

  return (
    <div className='container mt-5'>
      <div className='row justify-content-center'>
        <div className='col-md-6'>
          <div className='card'>
            <div className='card-body'>
              <h2 className='card-title text-center mb-4'>Add Timetable</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="staffname" className="form-label"><strong>Staff Name:</strong></label>
                  <input
                    type="text"
                    name="staffname"
                    placeholder="Enter Staff Name"
                    onChange={(e) => setTimetable({ ...timetable, staffname: e.target.value })}
                    className="form-control rounded-0"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="subjectname" className="form-label"><strong>Subject Name:</strong></label>
                  <input
                    type="text"
                    name="subjectname"
                    placeholder="Enter Subject Name"
                    onChange={(e) => setTimetable({ ...timetable, subjectname: e.target.value })}
                    className="form-control rounded-0"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="class" className="form-label"><strong>Class:</strong></label>
                  <input
                    type="text"
                    name="class"
                    className="form-control rounded-0"
                    onChange={(e) => setTimetable({ ...timetable, class: e.target.value })}
                    placeholder="Enter Class"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="section" className="form-label"><strong>Section:</strong></label>
                  <input
                    type="text"
                    name="section"
                    placeholder="Enter Section"
                    onChange={(e) => setTimetable({ ...timetable, section: e.target.value })}
                    className="form-control rounded-0"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="date" className="form-label"><strong>Date:</strong></label>
                  <input
                    type="date"
                    name="date"
                    className="form-control rounded-0"
                    onChange={(e) => setTimetable({ ...timetable, date: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="time" className="form-label"><strong>Time:</strong></label>
                  <input
                    type="time"
                    name="time"
                    id="time"
                    className="form-control rounded-0"
                    onChange={(e) => setTimetable({ ...timetable, time: e.target.value })}
                  />
                </div>
                <button className='btn btn-success w-100 rounded-0 mb-2'>Add Timetable</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTimeTable;
