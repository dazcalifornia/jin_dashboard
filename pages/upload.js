import React,{
  useState,
} from 'react';
import * as XLSX from "xlsx";

import Menu from './components/Menu';

const uploadPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState({
    course_id: '',
    course_name: '',
    section: '',
    credit: ''
  });
  const [files, setFiles] = useState([]);
  const [json, setJson] = useState(null);
  const [DataJson, setDataJson] = useState(null);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add the new course to the courses array
    setCourses([...courses, formData]);
    // Reset the form data
    setFormData({
      course_id: '',
      course_name: '',
      section: '',
      credit: ''
    });
    // Close the modal
    setIsOpen(false);
  };


  //upload
  

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

  const handleSubmitFile = async () => {
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


  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFiles = Array.from(event.dataTransfer.files);
    setFiles((existingFiles) => [...existingFiles, ...droppedFiles]);
  };

  return (
    <>
<Menu />
    <div className="flex flex-col items-center justify-center min-h-screen">
    
      <h1 className="text-3xl font-bold mb-4">Create Course</h1>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => setIsOpen(true)}
      >
        Create
      </button>
    <div
      className="w-full max-w-md mx-auto p-4 border border-gray-300 rounded-md"
      onDragOver={(event) => event.preventDefault()}
      onDrop={handleDrop}
    >
      <label className="text-gray-700 font-bold mb-2" htmlFor="file-upload">
        Choose Excel file(s) to upload
      </label>
      <input
        className="hidden"
        id="file-upload"
        type="file"
        accept=".xlsx"
        multiple
        onChange={handleFileUpload}
      />
      <div
        className="p-4 border border-dashed border-gray-400 rounded-md text-gray-400 text-center"
      >
        <p>Drag and drop Excel files here</p>
        <p>or</p>
        <label
          className="cursor-pointer underline"
          htmlFor="file-upload"
        >
          click to select files
        </label>
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
    </div>
    </div>
    </>
  );

}
export default uploadPage;
