import React,{
  useState,
} from 'react';
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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Create Course</h1>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => setIsOpen(true)}
      >
        Create
      </button>

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
            {courses.map((course) => (
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

      {isOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity">
          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen">
              <form
                className="bg-white rounded-lg px-8 pt-6 pb-8 mb-4"
                onSubmit={handleSubmit}
              >
                <h2 className="text-2xl font-bold mb-6">New Course</h2>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 font-bold mb-2"
                    htmlFor="course_id"
                  >
                    Course ID
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="course_id"
                    name="course_id"
                    type="text"
                    placeholder="Course ID"
                    value={formData.course_id}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 font-bold mb-2"
                    htmlFor="course_name"
                  >
                    Course Name
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="course_name"
                    name="course_name"
                    type="text"
                    placeholder="Course Name"
                    value={formData.course_name}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 font-bold mb-2"
                    htmlFor="section"
                  >
                    Section
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="section"
                    name="section"
                    type="text"
                    placeholder="Section"
                    value={formData.section}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 font-bold mb-2"
                    htmlFor="credit"
                  >
                    credit
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="credit"
                    name="credit"
                    type="text"
                    placeholder="credit"
                    value={formData.credit}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    Create
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={() => setIsOpen(false)}
                  > 
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-3xl font-bold mb-4">Courses</h1>
        <table className="table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">Course ID</th>
              <th className="px-4 py-2">Course Name</th>
              <th className="px-4 py-2">Section</th>
              <th className="px-4 py-2">Credit</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.course_id}>
                <td className="border px-4 py-2">{course.course_id}</td>
                <td className="border px-4 py-2">{course.course_name}</td>
                <td className="border px-4 py-2">{course.section}</td>
                <td className="border px-4 py-2">{course.credit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

}
export default uploadPage;
