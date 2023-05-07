import React,{
    useState,
  } from 'react';
  import * as XLSX from "xlsx";
  
  import Menu from './components/Menu';
  
  const Uploadstd = () => {
    const [courses, setCourses] = useState([]);
    //upload 
    const [files, setFiles] = useState([]);
    const [DataJson, setDataJson] = useState(null);
  
    const [gradeData, setGradeData] = useState([]);
  
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
      const response = await fetch('http://localhost:8000/createStudent', requestOptions);
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
      // If no files were selected, reject the promise
      if (files.length === 0) {
        reject('No files selected');
      }
      setGradeData(jsonData);
    });
  };
    
    const viewData = async () => {
      const data = await convertToJSON();
      console.log('JSON data:', data);
      setGradeData(data.map((file) => file.data));
      console.log('Grade data:', gradeData);
  
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
          <h1 className="text-3xl font-bold mb-4">อัพโหลดรายชื่อนิสิต</h1>
  
          <div
            className="w-full max-w-md mx-auto p-4 border border-gray-300 rounded-md bg-white"
            onDragOver={(event) => event.preventDefault()}
            onDrop={handleDrop}
          >
            <label className="text-gray-700 font-bold mb-2" htmlFor="file-upload">
              เลือกไฟล์เพื่ออัพโหลด
            </label>
            <input
              className="hidden"
              id="file-upload"
              type="file"
              accept=".xlsxm,.xlsm,.xlsx,.xltx,.xltm,.xlsb,.xla,.xlam,.xlt,.xlw,.csv"
              multiple
              onChange={handleFileUpload}
            />
            <div className="p-4 border border-dashed border-gray-400 rounded-md text-gray-400 text-center">
             <p>ลากไฟล์ Excel หรือ csv มาใส่ในช่องนี้</p>
            <p>หรือ</p>
            <label className="cursor-pointer underline" htmlFor="file-upload">
             คลิกเพื่อเลือกไฟล์ อัพโหลด
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
                       ลบ 
                      </button>
                    </li>
                  ))}
                </ul>
  
                <button
                  className="bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded mt-4"
                  onClick={handleSubmit}
                >
                  อัพโหลด
                </button>
                
              </div>
            )}
          </div>
          {gradeData.length > 0 && (
            <div>
              <pre>{JSON.stringify(gradeData, null,2 )}</pre>
              <h3 className="text-lg font-bold mb-2">Uploaded Files:</h3>
              <table className="table-auto">
                <thead>
                  <tr>
                    <th className="px-4 py-2">รหัสวิชา</th>
                    <th className="px-4 py-2">ชื่อวิชา</th>
                    <th className="px-4 py-2">หน่วยกิต</th>
                    <th className="px-4 py-2">หมู่</th>
                    <th className="px-4 py-2">รหัสนิสิต</th>
                    <th className="px-4 py-2">ชื่อนิสิต</th>
                    <th className="px-4 py-2">เกรด</th>
                  </tr>
                </thead>
                <tbody>
                  {gradeData.map((grade,index) => (
                    <tr key={grade.courseID}>
                      <td className="border px-4 py-2">{grade.courseID}</td>
                      <td className="border px-4 py-2">{grade.courseName}</td>
                      <td className="border px-4 py-2">{grade.credit}</td>
                      <td className="border px-4 py-2">{grade.Section}</td>
                      <td className="border px-4 py-2">{grade.StudentID}</td>
                      <td className="border px-4 py-2">{grade.Name}</td>
                      <td className="border px-4 py-2">{grade.Score}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </>
    );
  
  }
  export default Uploadstd;
  
