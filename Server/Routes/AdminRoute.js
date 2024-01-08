import express from 'express';
import con from '../utils/db.js';
import jwt from 'jsonwebtoken';
import path from 'path';
import multer from 'multer';


const router = express.Router();

                               //ADMINLOGIN
router.post('/adminlogin', (req, res) => {
    const sql = "SELECT * FROM admin WHERE email = ? AND password = ?";
    con.query(sql, [req.body.email, req.body.password], (err, result) => {
        if (err) return res.json({ loginStatus: false, Error: "Query error" });
        if (result.length > 0) {
            const email = result[0].email;
            const token = jwt.sign(
                { role: "admin", email: email }, 
                "jwt_secret_key", { expiresIn: '1d' });
            res.cookie('token', token);
            return res.json({ loginStatus: true });
        } else {
            return res.json({ loginStatus: false, Error: "wrong email or password" });
        }
    });
});


//CATEGORY
router.get('/category', (req, res) => {
    const sql = "SELECT * FROM category";
    con.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" });
        return res.json({ Status: true, Result: result });
    });
});

router.post('/add_category', (req, res) => {
    const sql = "INSERT INTO category (`name`) VALUES (?)";
    con.query(sql, [req.body.category], (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" });
        return res.json({ Status: true });
    });
});


// Multer configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Public/Images');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });





router.get('/employee_count', (req, res) => {
    const sql = "select count(id) as employee from employee";
    con.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" + err });
        return res.json({ Status: true, Result: result });
    });
});

router.get('/salary_count', (req, res) => {
    const sql = "select sum(salary) as salary from employeeOFEmp";
    con.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" + err });
        return res.json({ Status: true, Result: result });
    });
});

router.get('/admin_records', (req, res) => {
    const sql = "select * from admin";
    con.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" + err });
        return res.json({ Status: true, Result: result });
    });
});

router.get('/logout', (req, res) => {
    res.clearCookie('token');
    return res.json({ Status: true });
});

//STUDENT


router.get('/student' ,(req, res ) => {
    const sql = "SELECT * FROM student";
    con.query(sql,(err, result) => {
        if (err) {
            console.error(err);
            return res.json({ Status: false, Error: "Query Error" });
        }

        return res.json({ Status: true, Result: result });

    })
})

router.post('/add_student', (req, res) => {
    const studentDetails = req.body.student;

    const sql = "INSERT INTO student (name, class, address, contact, bloodgroup, fathername) VALUES (?, ?, ?, ?, ?, ?)";
    
    con.query(sql, [studentDetails.name, studentDetails.class, studentDetails.address, studentDetails.contact, studentDetails.bloodgroup, studentDetails.fathername], (err, result) => {
        if (err) {
            console.error(err);
            return res.json({ Status: false, Error: "Query Error" });
        }

        return res.json({ Status: true });

     });
});
   


router.get('/student/:id' , (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM student WHERE id = ?";
    con.query(sql,[id],(err, result) => {
        if (err) {
            console.error(err);
            return res.json({ Status: false, Error: "Query Error" });
        }

        return res.json({ Status: true, Result: result });

    })
   
})
router.put('/edit_student/:id', (req, res) => {
    const id = req.params.id;
    const sql = `UPDATE student SET name=?, class=?, address=?, contact=?, bloodgroup=?, fathername=? WHERE id=?`;

    const values = [
        req.body.name,
        req.body.class,
        req.body.address,
        req.body.contact,
        req.body.bloodgroup,  // Corrected column name
        req.body.fathername,
        id
    ];

    con.query(sql, values, (err, result) => {
        if (err) {
            console.error(err);
            return res.json({ Status: false, Error: "Query Error" + err });
        }

        return res.json({ Status: true, Result: result });
    });
});


router.delete('/delete_student/:id', (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM student WHERE id = ?";

    con.query(sql, [id], (err, result) => {
        if (err) {
            console.error(err);
            return res.json({ Status: false, Error: "Query Error" + err });
        }

        return res.json({ Status: true, Result: result });
    });
});
//STAFF
router.get('/staff' ,(req, res ) => {
    const sql = "SELECT * FROM staff";
    con.query(sql,(err, result) => {
        if (err) {
            console.error(err);
            return res.json({ Status: false, Error: "Query Error" });
        }

        return res.json({ Status: true, Result: result });

    })
})

router.post('/add_staff', (req, res) => {
    const staff = req.body;
  
    const sql = "INSERT INTO staff (staff_name, address, contact, dob, email, gender, postion) VALUES (?, ?, ?, ?, ?, ?, ?)";
  
    con.query(sql, [staff.staff_name, staff.address, staff.contact, staff.dob,staff.email,staff.gender,staff.postion], (err, result) => {
      if (err) {
        console.error(err);
        return res.json({ Status: false, Error: "Query Error" });
      }
  
      return res.json({ Status: true });
    });
  });
  




router.get('/staff/:id' , (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM staff WHERE id = ?";
    con.query(sql,[id],(err, result) => {
        if (err) {
            console.error(err);
            return res.json({ Status: false, Error: "Query Error" });
        }

        return res.json({ Status: true, Result: result });

    })
   
})


router.put('/edit_staff/:id', (req, res) => {
    const id = req.params.id;
    const sql = `UPDATE staff SET staff_name=?, address=?, contact=?, dob=?, email=?, gender=?, postion=? WHERE id=?`;

    const values = [
        req.body.staff_name,
        req.body.address,
        req.body.contact,
        req.body.dob,
        req.body.email,  // Corrected column name
        req.body.gender,
        req.body.postion,
        id
    ];

    con.query(sql, values, (err, result) => {
        if (err) {
            console.error(err);
            return res.json({ Status: false, Error: "Query Error" + err });
        }
        return res.json({ Status: true, Result: result });
    });
});



router.delete('/delete_staff/:id', (req, res) => {
    const id = req.params.id;
    const sql ="delete from staff where id = ?"
    con.query(sql, [id], (err, result) => {
        if (err) {
            console.error(err);
            return res.json({ Status: false, Error: "Query Error" + err });
        }

        return res.json({ Status: true, Result: result });
    });
    
})




router.get('/staff_count', (req, res) => {
    const sql = "select count(id) as staff from staff";
    con.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" + err });
        return res.json({ Status: true, Result: result });
    });
});

//admincount
router.get('/admin_count', (req, res) => {
    const sql = "select count(id) as admin from admin";
    con.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" + err });
        return res.json({ Status: true, Result: result });
    });
});

//studentcount

router.get('/student_count', (req, res) => {
    const sql = "select count(id) as student from student";
    con.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" + err });
        return res.json({ Status: true, Result: result });
    });
});


                          //ATTENDANCE

router.post('/add_attendance', (req, res) => {
    const attendancelist = req.body;
  
    const sql = "INSERT INTO attendance (student_name, class, section, date, attendance, remarks) VALUES (?, ?, ?, ?, ?, ?)";
  
    con.query(sql, [attendancelist.student_name, attendancelist.class, attendancelist.section, attendancelist.date, attendancelist.attendance, attendancelist.remarks], (err, result) => {
      if (err) {
        console.error(err);
        return res.json({ Status: false, Error: "Query Error" });
      }
  
      return res.json({ Status: true });
    });
  });



router.get('/attendance', (req, res) => {
    const sql = "SELECT * FROM attendance";
    con.query(sql,(err, result) => {
        if(err)return res.json ({Status:false, Error: "Query Error"})
        return res.json({Status: true, Result: result})
    })
})


router.get('/attendance/:id' , (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM attendance WHERE id = ?";
    con.query(sql,[id],(err, result) =>  {
        if (err) {
            console.error(err);
            return res.json({ Status: false, Error: "Query Error" });
        }

        return res.json({ Status: true, Result: result });

    })
   
})

  
   router.put('/edit_attendance/:id', (req, res) => {
    const id = req.params.id;
    const sql = `UPDATE attendance SET student_name=?, class=?,  section=?, date=?, attendance=?, remarks=? WHERE id=?`;

    const values = [
        req.body.student_name,
        req.body.class,
        req.body.section,
        req.body.date,
        req.body.attendance, 
        req.body.remarks,
        id
       ];
 con.query(sql,[id],(err, result) => {
        if (err) {
            console.error(err);
            return res.json({ Status: false, Error: "Query Error" });
        }

        return res.json({ Status: true, Result: result });

    })
});


router.delete('/delete_attendance/:id' , (req, res) => {
    const id = req.params.id;
    const sql = "delete from attendance where id = ?"

    con.query(sql,[id],(err, result) => {
        if (err) {
            console.error(err);
            return res.json({ Status: false, Error: "Query Error" });
        }

        return res.json({ Status: true, Result: result });

    })
})


router.get('/attendance_count', (req, res) => {
    const sql = "select count(id) as attendance from attendance";
    con.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" + err });
        return res.json({ Status: true, Result: result });
    });
});

                              //TIMETABLE
router.post('/add_timetable', (req, res) => {
    const timetable = req.body;
  
    const sql = "INSERT INTO timetable (staffname, subjectname, class, section, date, time) VALUES (?, ?, ?, ?, ?, ?)";
  
    con.query(sql, [timetable.staffname, timetable.subjectname,timetable.class, timetable.section, timetable.date, timetable.time], (err, result) => {
      if (err) {
        console.error(err);
        return res.json({ Status: false, Error: "Query Error" });
      }
  
      return res.json({ Status: true });
    });
  });
  
  
 

router.get('/timetable', (req, res) => {
    const sql = " SELECT * FROM timetable";
    con.query(sql, (err, result) => {
        if(err) return res.json ({Status:false, Error: "Query Error"})
        return res.json({Status: true, Result: result})
    })
})
   

router.get('/timetable/:id' , (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM timetable WHERE id = ?";
    con.query(sql,[id],(err, result) =>  {
        if (err) {
            console.error(err);
            return res.json({ Status: false, Error: "Query Error" });
        }

        return res.json({ Status: true, Result: result });

    })
   
})



router.delete('/delete_timetable/:id' , (req, res) => {
    const id = req.params.id;
    const sql = "delete from timetable where id = ?"

    con.query(sql,[id],(err, result) => {
        if (err) {
            console.error(err);
            return res.json({ Status: false, Error: "Query Error" });
        }

        return res.json({ Status: true, Result: result });

    })
})


router.get('/timetable_count', (req, res) => {
    const sql = "select count(id) as timetable from timetable";
    con.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" + err });
        return res.json({ Status: true, Result: result });
    });
});

//PAYROLE

router.post('/add_payroll', (req, res) => {
    const payroll = req.body;
  
    const sql = "INSERT INTO payroll (staff_name, leave_days, attendance_days, payment_date, total_amount) VALUES (?, ?, ?, ?, ?)";
  
    con.query(sql, [payroll.staff_name, payroll.leave_days, payroll.attendance_days, payroll.payment_date, payroll.total_amount], (err, result) => {
      if (err) {
        console.error(err);
        return res.json({ Status: false, Error: "Query Error" });
      }
  
      return res.json({ Status: true });
    });
  });
  

  router.get('/payroll', (req, res) => {
    const sql = " SELECT * FROM payroll";
    con.query(sql, (err, result) => {
        if(err) return res.json ({Status:false, Error: "Query Error"})
        return res.json({Status: true, Result: result})
    })
})
   

router.get('/payroll/:id' , (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM payroll WHERE id = ?";
    con.query(sql,[id],(err, result) =>  {
        if (err) {
            console.error(err);
            return res.json({ Status: false, Error: "Query Error" });
        }

        return res.json({ Status: true, Result: result });

    })
   
})


router.put('/edit_payroll/:id', (req, res) => {
    const id = req.params.id;
    const sql = `UPDATE payroll SET  staff_name=?, leave_days=?, attendance_days=?, payment_date=?, total_amount=? WHERE id=?`;

    const values = [
        req.body.staff_name,
        req.body.leave_days,
        req.body.attendance_days,
        req.body.payment_date,
        req.body.total_amount,
       
        id
    ];

    con.query(sql, values, (err, result) => {
        if (err) {
            console.error(err);
            return res.json({ Status: false, Error: "Query Error" +err});
        }

        return res.json({ Status: true, Result: result });
    });
});
  

router.delete('/delete_payroll/:id' , (req, res) => {
    const id = req.params.id;
    const sql = "delete from payroll where id = ?"

    con.query(sql,[id],(err, result) => {
        if (err) {
            console.error(err);
            return res.json({ Status: false, Error: "Query Error" });
        }

        return res.json({ Status: true, Result: result });

    })
})



router.get('/payroll_count', (req, res) => {
    const sql = "select count(id) as payroll from payroll";
    con.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" + err });
        return res.json({ Status: true, Result: result });
    });
});   


export { router as adminRouter };
