import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'




const EditTimeTable = () => {
    const navigate = useNavigate ()

    const {id} = useParams()

const[timetable, setimetable] = useState({
    
    staffname: '',
    subjectname: '',
    class: '',
    section: '',
    date: '',
    time: ''

})

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


  axios.get('http://localhost:3000/auth/timetable/'+id)
.then (result => {
   setimetable({
    ...timetable,
    
    staffname: result.data.Result[0].staffname,
    subjectname: result.data.Result[0].subjectname,
    class: result.data.Result[0].class,
    section: result.data.Result[0].section,
    date: result.data.Result[0].date,
    time: result.data.Result[0].time,

   })
   

}).catch (err => console.log(err))

}, []);




const handleSubmit = (e) => {
    e.preventDefault()
    axios.put(`http://localhost:3000/auth/edit_timetable/${id}`, timetable)
     
    .then(result => {
      
        if(result.data.Status){
              navigate('/dashboard/timetable')
        }else{
            alert(result.data.Error)
        }
  
    }).catch(err => console.log(err))
      
}

  return (
    <div className='d-flex justify-content-center align-items-center vh-100'>
            <div className='p-3 rounded w-25 border'>
                <h2>Edit Timetable</h2>
                
                <form onSubmit={handleSubmit} >
                  
                    <div className="mb-3">
                        <label htmlFor="staffname"><strong>Staffname:</strong></label>
                        <input type="text" name="staffname" placeholder="Enter StaffName"
                        value={timetable.staffname}
                            onChange={(e) => setimetable ({...timetable, staffname: e.target.value})}
                            className="form-control rounded-0" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="subjectname"><strong>Subjectname:</strong></label>
                        <input type="text" name="subjectname" placeholder="Enter SubjectName"
                           value={timetable.subjectname}
                           onChange={(e) => setimetable ({...timetable, subjectname: e.target.value})}
                            className="form-control rounded-0" />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="class"><strong>Class:</strong></label>
                        <input
                            type="text"
                            name="class"
                            className="form-control rounded-0"
                           value={timetable.class}
                            onChange={(e) => setimetable ({...timetable, class: e.target.value})}
                            placeholder="Enter Class"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="dob"><strong>Section:</strong></label>
                        <input
                            type="text"
                            name="section"
                            placeholder="Enter Section"
                           value={timetable.section}
                            onChange={(e) => setimetable ({...timetable, section: e.target.value})}
                            className="form-control rounded-0"
                        />
                    </div>



                    <div className="mb-3">
                        <label htmlFor="date"><strong>Date:</strong></label>
                        <input
                            type="date"
                            name="date"
                            className="form-control rounded-0"
                            value={timetable.date}
                            onChange={(e) => setimetable ({...timetable, date: e.target.value})}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="time"><strong>Time:</strong></label>
                        <input
                            type="time"
                            name="time"
                            id="time"
                            className="form-control rounded-0"
                           value={timetable.time}
                            onChange={(e) => setimetable ({...timetable, time: e.target.value})}
                        />
                    </div>




                    <button className='btn btn-success w-100 rounded-0 mb-2'>Edit Timetable</button>
                </form>
            </div>
        </div>
  )
}

export default EditTimeTable
