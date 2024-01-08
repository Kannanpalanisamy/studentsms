import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'



const EditStaff = () => {

    const { id } = useParams()

    const [staffDetails, setStaff] = useState({

        staff_name: '',
        address: '',
        contact: '',
        dob: '',
        email: '',
        gender: '',
        postion: '',
    });

    const [category, setCategory] = useState([]);
    const navigate = useNavigate();
 
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
            
axios.get('http://localhost:3000/auth/staff/'+id)
.then(result => {
setStaff({
   ... staffDetails,
   staff_name:result.data.Result[0].staff_name,
   address:result.data.Result[0].address,
   contact:result.data.Result[0].contact,
   dob:result.data.Result[0].dob,
   email:result.data.Result[0].email,
   gender:result.data.Result[0].gender,
   postion:result.data.Result[0].postion,
})
}).catch(err => console.log (err))
    }, []);

const handleSubmit =(e) => {
    e.preventDefault()
    axios.put('http://localhost:3000/auth/edit_staff/'+id , staffDetails)
    .then(result => {
        if(result.data.Status){
            navigate('/dashboard/staff')
        }else{
         alert(result.data.Error)
        }
    }).catch(err => console.log (err))
}


    return (

        <div className='d-flex justify-content-center align-items-center vh-100'>
            <div className='p-3 rounded w-25 border'>
                <h2 className="text-center">Edit Staff</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name"><strong>Name:</strong></label>
                        <input type="text" name="name" placeholder="Enter Name"
                        value={staffDetails.name}
                            onChange={(e) => setStaff({ ...staffDetails, staff_name: e.target.value })}
                            className="form-control rounded-0" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="address"><strong>Address:</strong></label>
                        <input type="text" name="class" placeholder="Enter Address"
                           value={staffDetails.address}
                           onChange={(e) => setStaff({ ...staffDetails, address: e.target.value })}
                            className="form-control rounded-0" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="contact"><strong>Contact:</strong></label>
                        <input type="text" name="conatact" placeholder="Enter contact"
                           value={staffDetails.contact}
                           onChange={(e) => setStaff({ ...staffDetails, contact: e.target.value })}
                            className="form-control rounded-0" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="dob"><strong>DOB:</strong></label>
                        <input
                            type="date"
                            name="dob"
                           value={staffDetails.dob}
                            onChange={(e) => setStaff({ ...staffDetails, dob: e.target.value })}
                            className="form-control rounded-0"
                        />
                    </div>



                    <div className="mb-3">
                        <label htmlFor="email"><strong>Email:</strong></label>
                        <input type="text" name="email" placeholder="Enter email"
                           value={staffDetails.email}
                           onChange={(e) => setStaff({ ...staffDetails, email: e.target.value })}
                            className="form-control rounded-0" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="gender"><strong>Gender:</strong></label>
                        <input type="text" name="gender" placeholder="Enter Gender"
                           value={staffDetails.gender}
                           onChange={(e) => setStaff({ ...staffDetails, gender: e.target.value })}
                            className="form-control rounded-0" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="postion"><strong>Postion:</strong></label>
                        <input type="text" name="postion" placeholder="Enter Postion"
                            value={staffDetails.postion}
                            onChange={(e) => setStaff({ ...staffDetails, postion: e.target.value })}
                            className="form-control rounded-0" />
                    </div>
                    <button className='btn btn-success w-100 rounded-0 mb-2'>Edit Staff</button>
                </form>
            </div>
        </div>
    )
}

export default EditStaff
