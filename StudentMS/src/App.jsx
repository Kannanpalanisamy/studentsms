import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './Components/Login'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './Components/Dashboard'
import Home from './Components/Home'
import Category from './Components/Category'
import AddCategory from './Components/AddCategory'
import Start from './Components/Start'
import Student from './Components/Student'
import AddStudent from './Components/AddStudent'
import Staff from './Components/Staff'
import AddStaff from './Components/AddStaff'
import EditStudent from './Components/EditStudent'
import EditStaff from './EditStaff'
import AddAttendance from './Components/AddAttendance'
import Attendance from './Components/Attendance'
import TimeTable from './Components/TimeTable'
import AddTimeTable from './AddTimeTable'
import EditAttendance from './Components/EditAttendance'
import EditTimeTable from './Components/EditTimeTable'
import Payroll from './Components/Payroll'
import AddPayroll from './Components/AddPayroll'
import EditPayroll from './Components/EditPayroll'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/start' element={<Start />} />
        <Route path='/adminlogin' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />}>
          <Route index element={<Home />} />

          <Route path='student' element={<Student />} />
          <Route path='add_student' element={<AddStudent />} />
          <Route path='edit_student/:id' element={<EditStudent />} />

          <Route path='staff' element={<Staff />} />
          <Route path='add_staff' element={<AddStaff />} />
          <Route path='edit_staff/:id' element={<EditStaff />} />

          <Route path='category' element={<Category />} />
          <Route path='add_category' element={<AddCategory />} />

          <Route path='attendance' element={<Attendance />} />
          <Route path='edit_attendance/:id' element={<EditAttendance />} />
          <Route path='add_attendance' element={<AddAttendance />} />

          <Route path='timetable' element={<TimeTable />} />
          <Route path='add_timetable' element={<AddTimeTable />} />
          <Route path='edit_timetable/:id' element={<EditTimeTable />} />

          <Route path='payroll' element={<Payroll />} />
          <Route path='add_payroll' element={<AddPayroll />} />
          <Route path='edit_payroll/:id' element={<EditPayroll />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
