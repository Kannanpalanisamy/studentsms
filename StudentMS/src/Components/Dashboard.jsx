import React from "react";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import axios from "axios";

const Dashboard = () => {
	const navigate = useNavigate();
	axios.defaults.withCredentials = true;

	const handleLogout = () => {
		axios.get('http://localhost:3000/auth/logout')
			.then(result => {
				if (result.data.Status) {
					navigate('/adminlogin');
				}
			});
	};

	return (
<div className="container-fluid">
<div className="row flex-nowrap">
<div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
<div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
<a href="/" className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none">
<span className="fs-5 fw-bolder d-none d-sm-inline">Admin Dashboard</span>
</a>
<ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
	<li>
<Link to="/" data-bs-toggle="collapse" className="nav-link text-white px-0 align-middle">
<i className="fs-4 bi-speedometer2"></i> <span className="ms-1 d-none d-sm-inline">Dashboard</span>
</Link>
</li>

<li>
<Link to="/dashboard/category" className="nav-link px-0 align-middle text-white">
<i className="fs-4  bi-card-list"></i><span className="ms-1 d-none d-sm-inline">Category</span>
</Link>
</li>


<li>
<Link to="/dashboard/student" className="nav-link px-0 align-middle text-white">
<i className="fs-4  bi bi-people-fill"></i> <span className="ms-1 d-none d-sm-inline">Student</span>
</Link>
</li>

<li>
<Link to="/dashboard/staff" className="nav-link px-0 align-middle text-white">
<i className="fs-4 bi bi-person-workspace"></i> <span className="ms-1 d-none d-sm-inline">Staff</span>
</Link>
</li>

<li>
<Link to="/dashboard/attendance" className="nav-link px-0 align-middle text-white">
<i className="fs-4 bi bi-bell"></i> <span className="ms-1 d-none d-sm-inline">Attendance</span>
</Link>
</li>


<li>
<Link to="/dashboard/timetable" className="nav-link px-0 align-middle text-white">
<i className="fs-4 bi bi-calendar-date"></i> <span className="ms-1 d-none d-sm-inline">Timetable</span>
</Link>
</li>


<li>
<Link to="/dashboard/payroll" className="nav-link px-0 align-middle text-white">
<i className="fs-4 bi bi-cash-coin"></i> <span className="ms-1 d-none d-sm-inline">Payroll</span>
</Link>
</li>

<li className="w-100" onClick={handleLogout}>
<Link className="nav-link px-0 align-middle text-white">
<i className="fs-4 bi-power"></i> <span className="ms-1 d-none d-sm-inline">Logout</span>
</Link>
</li>
</ul>
</div>
</div>
				<div className="col p-0 m-0">
					<div className='p-2 d-flex justify-content-center shadow'>
						<h4>Student Management System</h4>
					</div>
					<Outlet />
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
