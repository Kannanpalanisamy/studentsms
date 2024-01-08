import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';



const EditStudent = () => {
    const { id } = useParams();

    const [studentDetails, setStudentDetails] = useState({
        name: '',
        class: '',
        address: '',
        contact: '',
        bloodgroup: '',
        fathername: '',
    });
   
    const [category, setCategory] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
              
        
             axios.get(`http://localhost:3000/auth/student/${id}`)
            .then(result => {
               setStudentDetails({
                ...studentDetails,
                name: result.data.Result[0].name,
                class: result.data.Result[0].class,
                address: result.data.Result[0].address,
                contact: result.data.Result[0].contact,
                bloodgroup: result.data.Result[0].bloodgroup,
                fathername: result.data.Result[0].fathername,
                    })
            }).catch(err => console.log(err))

    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.put(`http://localhost:3000/auth/edit_student/${id}`, studentDetails)
        .then(result => {
            if(result.data.Status){
                navigate('/dashboard/student')
            }else{
             alert(result.data.Error)
            }
        }).catch (err => console.log  (err))
    }


    return (
        <div className='d-flex justify-content-center align-items-center vh-100'>
            <div className='p-3 rounded w-25 border'>
                <h2>Edit Student</h2>
                <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name"><strong>Name:</strong></label>
                    <input type="text" name="name" placeholder="Enter Name"
                    value={studentDetails.name}
                        onChange={(e) => setStudentDetails({ ...studentDetails, name: e.target.value })}
                        className="form-control rounded-0" />
                </div>
                <div className="mb-3">
                    <label htmlFor="class"><strong>Class:</strong></label>
                    <input type="text" name="class" placeholder="Enter Class"
                    value={studentDetails.class}
                        onChange={(e) => setStudentDetails({ ...studentDetails, class: e.target.value })}
                        className="form-control rounded-0" />
                </div>
                <div className="mb-3">
                    <label htmlFor="address"><strong>Address:</strong></label>
                    <input type="text" name="address" placeholder="Enter Address"
                    value={studentDetails.address}
                        onChange={(e) => setStudentDetails({ ...studentDetails, address: e.target.value })}
                        className="form-control rounded-0" />
                </div>
                <div className="mb-3">
                    <label htmlFor="contact"><strong>Contact:</strong></label>
                    <input type="text" name="contact" placeholder="Enter Contact"
                       value={studentDetails.contact}
                       onChange={(e) => setStudentDetails({ ...studentDetails, contact: e.target.value })}
                        className="form-control rounded-0" />
                </div>
                <div className="mb-3">
                    <label htmlFor="bloodgroup"><strong>Blood Group:</strong></label>
                    <input type="text" name="bloodgroup" placeholder="Enter Blood Group"
                        value={studentDetails.bloodgroup}
                        onChange={(e) => setStudentDetails({ ...studentDetails, bloodgroup: e.target.value })}
                        className="form-control rounded-0" />
                </div>
                <div className="mb-3">
                    <label htmlFor="fathername"><strong>Father's Name:</strong></label>
                    <input type="text" name="fathername" placeholder="Enter Father's Name"
                       value={studentDetails.fathername}
                       onChange={(e) => setStudentDetails({ ...studentDetails, fathername: e.target.value })}
                        className="form-control rounded-0" />
                </div>
                    <button className='btn btn-success w-100 rounded-0 mb-2'>Edit Student</button>
                </form>
            </div>
        </div>
    );
};

export default EditStudent;
