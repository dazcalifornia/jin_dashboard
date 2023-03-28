import React, { useState,useEffect } from 'react';
import * as XLSX from "xlsx";

import Modal from './components/Modal';

function FileUpload() {
  const [showModal, setShowModal] = useState(false);

  const handleOpen = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  //course
  const [course , setCourse] = useState([]);
  const getCourse = async () => {
    try {
      const response = await fetch('http://localhost:8000/course',{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      if  (response.ok) {
        const data = await response.json();
        console.log(data);
        setCourse(data);
      }
    } catch (error) {
      console.error(error);
    }
  };
  //strudent
  const [student , setStudent] = useState([]);
  const getStudent = async () => {
    try {
      const response = await fetch('http://localhost:8000/std',{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      if  (response.ok) {
        const data = await response.json();
        console.log('student',data);
        setStudent(data);
      }
    } catch (error) {
      console.error(error);
    }
  };
  //grades
  const [grades , setGrades] = useState([]);
  const getGrades = async () => {
    try {
      const response = await fetch('http://localhost:8000/grades',{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      if  (response.ok) {
        const data = await response.json();
        console.log('grades',data);
        setGrades(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  //upload 
  const [files, setFiles] = useState([]);
  const [json, setJson] = useState(null);
  const [DataJson, setDataJson] = useState(null);

  const handleFileUpload = (event) => {
    const newFiles = [...files];
    const fileList = event.target.files;
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      newFiles.push(file);
    }
    setFiles(newFiles);
  };

  const removeFile = (file) => {
    const newFiles = files.filter((f) => f !== file);
    setFiles(newFiles);
  };

  const handleSubmit = async () => {
  try {
    // Convert the files to JSON
    const jsonData = await convertToJSON();
    console.log('JSON data:', jsonData);

    // Submit the JSON data to the API
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(jsonData)
    };
    const response = await fetch('http://localhost:8000/grades/upload', requestOptions);
    const data = await response.json();
    alert(data.message);
  } catch (error) {
    console.error(error);
  }
};

const convertToJSON = () => {
  return new Promise((resolve, reject) => {
    const jsonData = [];
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const sheetData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

        // Extract the header row as the key index
        const headerRow = sheetData[0];
        // Remove the header row from the data array
        sheetData.shift();

        // Map each row of data to an object with keys from the header row
        const rows = sheetData.map((row) => {
          const rowData = {};
          headerRow.forEach((key, index) => {
            rowData[key] = row[index];
          });
          return rowData;
        });

        const fileData = {
          fileName: file.name,
          sheetName: sheetName,
          data: rows,
        };
        jsonData.push(fileData);
        if (jsonData.length === files.length) {
          resolve(jsonData);
        }
      };
      reader.readAsArrayBuffer(file);
    });
  });
};
    
// const convertToJSON = () => {
//   const jsonData = [];
//   files.forEach((file) => {
//     const reader = new FileReader();
//     reader.onload = (event) => {
//       const data = new Uint8Array(event.target.result);
//       const workbook = XLSX.read(data, { type: 'array' });
//       const sheetName = workbook.SheetNames[0];
//       const sheet = workbook.Sheets[sheetName];
//       const sheetData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

//       // Extract the header row as the key index
//       const headerRow = sheetData[0];
//       // Remove the header row from the data array
//       sheetData.shift();

//       // Map each row of data to an object with keys from the header row
//       const rows = sheetData.map((row) => {
//         const rowData = {};
//         headerRow.forEach((key, index) => {
//           rowData[key] = row[index];
//         });
//         return rowData;
//       });

//       const fileData = {
//         fileName: file.name,
//         sheetName: sheetName,
//         data: rows,
//       };
//       jsonData.push(fileData);
//       if (jsonData.length === files.length) {
//         setJson(jsonData);
//         console.log("Json: ", jsonData)
//       }
//     };
//     reader.readAsArrayBuffer(file);
//   });
// };


// const submitJSONData = async () => {
//   const requestOptions = {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(json)
//   };

//   const response = await fetch('http://localhost:8000/submit', requestOptions);
//   const data = await response.json();
//   alert(data.message);
// }




  useEffect(() => {
    getCourse();
    getStudent();
    getGrades();
  }, []);


  return (
    <div className="bg-white">
      <div className="container mx-auto py-4">
      <button 
        onClick={handleOpen}
        className="bg-amber-500 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded">
  Edit
</button>

        <button onClick={handleOpen}>Open Modal</button>
      <Modal open={showModal} onClose={handleClose}>
        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div className="sm:flex sm:items-start">
            <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
              <svg
                className="h-6 w-6 text-red-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3
                className="text-lg leading-6 font-medium text-gray-900"
                id="modal-title"
              >
                Deactivate account
              </h3>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  Are you sure you want to deactivate your account? All of your
                  data will be permanently removed. This action cannot be
                  undone.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Modal>
      </div>
      <div className="w-full max-w-md mx-auto">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="file-upload"
          >
            Choose Excel file(s) to upload
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="file-upload"
            type="file"
            accept=".xlsx"
            multiple
            onChange={handleFileUpload}
          />
        </div>

        {files.length > 0 && (
          <div>
            <h3 className="text-lg font-bold mb-2">Uploaded Files:</h3>
            <ul className="border rounded p-2">
              {files.map((file, index) => (
                <li key={index} className="flex justify-between">
                  <span className="text-gray-700">{file.name}</span>{" "}
                  <button
                    className="text-sm text-red-600 hover:text-red-800"
                    onClick={() => removeFile(file)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
              onClick={convertToJSON}
            >
              Convert to JSON
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        )}

        {json && (
          <div className="mt-4">
            <h3 className="text-lg font-bold mb-2">Converted JSON Data:</h3>
            <pre className="bg-gray-200 p-2">
              {JSON.stringify(json, null, 2)}
            </pre>
          </div>
        )}

        {!json && files.length === 0 && <p>No files uploaded.</p>}
      </div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <h2>Course</h2>
          <div className="flex flex-wrap -m-4">
            {course.map((course) => (
              <div className="p-4 lg:w-1/3" key={course}>
                <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                  <p>{course.course_id}</p>
                  <p>{course.course_name}</p>
                  <p>{course.credit}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <h2>student</h2>
          <div className="flex flex-wrap -m-4">
            {student.map((student) => (
              <div className="p-4 lg:w-1/3" key={student}>
                <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                  <p>ID: {student.Id}</p>
                  <p>Name: {student.name}</p>
                  <p>Major: {student.Major}</p>
                  <p>School: {student.School}</p>
                  <p>Gender: {student.gender}</p>
                  <p>Grade: {student.grade}</p>
                  <p>GPA: {student.GPA}</p>
                  <p>TCAS: {student.Tcas}</p>
                  <p>Province: {student.provice}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <h2>student_grade</h2>
          <div className="flex flex-wrap -m-4">
            {grades.map((grade) => (
              <div className="p-4 lg:w-1/3" key={grade}>
                <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                  <p>Course ID: {grade.courseId}</p>
                  <p>Coruse Name: {grade.Course_name}</p>
                  <p>Student ID: {grade.studentId}</p>
                  <p>Student Name: {grade.Std_name}</p>
                  <p>Grade: {grade.score}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default FileUpload;
