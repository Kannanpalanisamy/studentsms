import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Home = () => {
  const [adminTotal, setAdminTotal] = useState();
  const [studentTotal, setStudentTotal] = useState();
  const [staffTotal, setStaffTotal] = useState();
  const [timetableTotal, setTimetableTotal] = useState();
  const [attendanceTotal, setAttendanceTotal] = useState();
  const [payrollTotal, setPayrollTotal] = useState();
  ;

  useEffect(() => {
    adminCount();
    studentCount();
    staffCount();
    timetableCount();
    attendanceCount();
    payrollCount();
    
  }, []);

 

  const adminCount = () => {
    axios.get('http://localhost:3000/auth/admin_count').then((result) => {
      if (result.data.Status) {
        setAdminTotal(result.data.Result[0].admin);
      }
    });
  };

  const studentCount = () => {
    axios.get('http://localhost:3000/auth/student_count').then((result) => {
      if (result.data.Status) {
        setStudentTotal(result.data.Result[0].student);
      }
    });
  };

  const staffCount = () => {
    axios.get('http://localhost:3000/auth/staff_count').then((result) => {
      if (result.data.Status) {
        setStaffTotal(result.data.Result[0].staff);
      }
    });
  };

  const timetableCount = () => {
    axios.get('http://localhost:3000/auth/timetable_count').then((result) => {
      if (result.data.Status) {
        setTimetableTotal(result.data.Result[0].timetable);
      }
    });
  };

  const attendanceCount = () => {
    axios.get('http://localhost:3000/auth/attendance_count').then((result) => {
      if (result.data.Status) {
        setAttendanceTotal(result.data.Result[0].attendance);
      }
    });
  };


  const payrollCount = () => {
    axios.get('http://localhost:3000/auth/payroll_count').then((result) => {
      if (result.data.Status) {
        setPayrollTotal(result.data.Result[0].payroll);
      }
    });
  };

  return (
    <div>
      <div className="p-3 d-flex justify-content-around mt-3">
        {renderCard('Admin', adminTotal, 'bg-primary')}
        {renderCard('Student', studentTotal, 'bg-success')}
        {renderCard('Staff', staffTotal, 'bg-danger')}
        {renderCard('Attendance', attendanceTotal, 'bg-warning')}
        {renderCard('Timetable', timetableTotal, 'bg-info')}
        {renderCard('Payroll', payrollTotal, 'bg-danger')}
       
      </div>
    </div>
  );

  function renderCard(title, total, backgroundColor) {
    return (
      
      <div className={`px-3 pt-2 pb-3 border shadow-sm w-25 ${backgroundColor}`}>
        <div className="text-center pb-1">
          <h4 style={{ color: 'white' }}>{title}</h4>
        </div>
        <hr />
        <div className="d-flex justify-content-between">
         
          <h5 style={{ color: 'white' }}>Total: {total}</h5>
        </div>
       
        
        
      </div>
      
    );
  }
};

export default Home;
