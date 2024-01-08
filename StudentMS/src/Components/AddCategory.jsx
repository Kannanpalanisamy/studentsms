import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddCategory = () => {
  const [category, setCategory] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post('http://localhost:3000/auth/add_category', { category })
      .then((result) => {
        if (result.data.Status) {
          navigate('/dashboard/category');
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
              <h2 className="card-title text-center mb-4">Add Category</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="category" className="form-label">
                    <strong>Category:</strong>
                  </label>
                  <input
                    type="text"
                    name="category"
                    placeholder="Enter Category"
                    onChange={(e) => setCategory(e.target.value)}
                    className="form-control"
                  />
                </div>
                <button type="submit" className="btn btn-success w-100">
                  Add Category
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;
