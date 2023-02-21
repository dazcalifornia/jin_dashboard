const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const multer = require('multer');
const Excel = require('exceljs');

const fs = require('fs');
const xlsx = require('xlsx');


const app = express();
const port = 8080;

app.use(cors());

app.use(express.json());

// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "jin",
// });
const db = mysql.createConnection({
  host: "dev.franx.dev",
  user: "franx",
  password: "dazproperty",
  database: "jin",
});



const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, '/uploads/');
    },
    filename: function(req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
    
  });
  
  const upload = multer({ 
    storage: storage,
    limits: { fileSize: 500 * 1024 * 1024 }, // 500 MB limit
 });


 app.post("/upload", upload.single("file"), (req, res) => {
    const file = req.file;
    console.log(file);
    res.send('File uploaded');
  });


 app.post("/uploader", upload.single("file"), (req, res) => {
   const workbook = new Excel.Workbook();
   workbook.xlsx.readFile(req.file.path).then(() => {
     const worksheet = workbook.getWorksheet(1);
     const rows = worksheet.getRows();
     rows.forEach((row) => {
       // Prepare the values for the SQL query
       let values = [
         row.getCell(1).value,
         row.getCell(2).value,
         row.getCell(3).value,
         row.getCell(4).value,
         row.getCell(5).value,
       ];
       connection.query(
         "INSERT INTO Grades (studentId, Std_name, courseId, Course_name, score) VALUES (?, ?, ?, ?, ?)",
         values,
         (err, results) => {
           if (err) {
             console.log(err);
             return;
           }
         }
       );
     });
     res.send("File uploaded and data inserted into the database");
   });
 });

app.post ("/api/convert-excel-to-json", function (req,res){


  const filePath = req.body.file;

  const workbook = xlsx.readFile(filePath);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const data = xlsx.utils.sheet_to_json(sheet);

  res.json(data);
})
app.post("/login", function (req, res) {
  let email = req.body.email;
  let password = req.body.password;
  console.log(email, password);
  let query = `SELECT * FROM Users WHERE email = '${email}' AND password = '${password}'`;

  db.query(query, function (error, results, fields) {
    if (error) {
      // handle the error
      res.send({
        success: false,
        message: "An error occurred while checking the email and password.",
      });
    } else {
      if (results.length > 0) {
        // email and password match
        res.send({
          success: true,
          message: "Login successful.",
        });
      } else {
        // email and password don't match
        res.send({
          success: false,
          message: "Incorrect email or password.",
        });
      }
    }
  });
});
app.put("/editsubJect", function (req, res) {
  let courseId = req.body.data1;
  let courseName = req.body.data2;
  let credit = req.body.data3;
  let origin = req.body.origin;
  console.log(courseId, courseName, credit, origin);

  const sql = `UPDATE course SET course_id = '${courseId}', course_name = '${courseName}', credit = '${credit}' WHERE course_id = ${origin}`;

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: "Data updated successfully" });
  });
});
app.put("/editGrade", function (req, res) {
  let grade = req.body.grade;
  let owner = req.body.owner;
  let subject = req.body.subject;

  console.log(grade, owner);

  const sql = `UPDATE Grades SET score = '${grade}'WHERE studentId = ${owner} AND courseId = ${subject}`;

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: "Data updated successfully" });
  });
});

app.get("/grades", (req, res) => {
  db.query("SELECT * FROM Grades", (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).json({ message: "BAD REQUEST" });
    } else {
      if (result === "") {
        res.send({ message: "NODATA" });
      }
      res.send(result);
    }
  });
});

app.get("/course", (req, res) => {
  db.query("SELECT * FROM course", (err, result) => {
    if (err) {
      console.log(err);
      res.send(400).json({ message: "Bad request" });
    } else {
      if (result === "") {
        res.send({ data: "empty" });
      }
      res.send(result);
    }
  });
});

app.get("/std", (req, res) => {
  db.query("SELECT * FROM Students", (err, result) => {
    if (err) {
      console.log(err);
      res.send(400).json({ message: "Bad request" });
    } else {
      if (result === "") {
        res.send({ data: "empty" });
      }
      res.send(result);
    }
  });
});

app.get("/grades/:id", (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM Grades WHERE (courseId = ? )", id, (err, result) => {
    if (err) {
      console.log(err);
      res.send(400).json({ message: "Bad request" });
    } else {
      if (result === "") {
        res.send({ data: "empty" });
      }
      res.send(result);
    }
  });
});

app.get("/std", (req, res) => {
  db.query("SELECT * FROM Students", (err, result) => {
    if (err) {
      console.log(err);
      res.send(400).json({ message: "Bad request" });
    } else {
      if (result === "") {
        res.send({ data: "empty" });
      }
      res.send(result);
    }
  });
});
app.get("/user", (req, res) => {
  db.query("SELECT * FROM Users", (err, result) => {
    if (err) {
      console.log(err);
      res.send(400).json({ message: "Bad request" });
    } else {
      if (result === "") {
        res.send({ data: "empty" });
      }
      res.send(result);
    }
  });
});

//server port listening
app.listen(port, () => {
  console.log("server listen on port " + port);
});
