import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import * as XLSX from "xlsx";

import Menubar from "../components/menuBars";
import ClassTable from "../components/Classtable";


export default function Dashboard() {
  const [subjectData, setsubjectData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editOpen, setEditOpen] = useState({ isOpen: false, id: "" });

  const [filteredResults, setFilteredResults] = useState([]);

  const [formData, setFormData] = useState({
    data1: "",
    data2: "",
    data3: "",
    origin: "",
  });

  const [editData, setEditData] = useState(false);
  const [gradeData, setGradeData] = useState({
    grade: "",
    owner: "",
    subject: "",
  });
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };
  const chageGrade = (event) => {
    setGradeData({
      ...gradeData,
      [event.target.name]: event.target.value,
    });
    console.log(event.target.value);
  };

  const router = useRouter();

  useEffect(() => {
    const cachedData = cookies.get("data");
    if (cachedData) {
      setData(cachedData);
      setLoading(false);
      // Fetch latest data from server
      const fetchData = async () => {
        const result = await fetch("https://3a88-45-136-254-11.ap.ngrok.io/course", {
          headers: {
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
          },
        });
        const updatedData = await result.json();
        // Compare the cached data with the latest data
        if (JSON.stringify(cachedData) !== JSON.stringify(updatedData)) {
          // Update the cached data if it's different
          cookies.set("data", updatedData, {
            maxAge: 60 * 60 * 24,
            sameSite: "strict",
          });
          setData(updatedData);
        }
      };
      fetchData();
    } else {
      const fetchData = async () => {
        const result = await fetch("https://3a88-45-136-254-11.ap.ngrok.io/course", {
          headers: {
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
          },
        });
        const data = await result.json();
        setData(data);
        setLoading(false);
        cookies.set("data", data, { maxAge: 60 * 60 * 24, sameSite: "strict" });
      };
      fetchData();
    }
  }, []);

  const handleSignout = () => {
    router.replace("/");
  };

  const subjectMenu = (id) => {
    setsubjectData([])
    fetch(`https://3a88-45-136-254-11.ap.ngrok.io/grades/${id}`)
      .then((response) => response.json())
      .then((subjectData) => setsubjectData(subjectData))
      .catch((error) => console.log(error));
  };


const editSubject = async (event) => {
  event.preventDefault();
  try {
    const response = await fetch("https://3a88-45-136-254-11.ap.ngrok.io/editsubJect", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data1: formData.data1,
        data2: formData.data2,
        data3: formData.data3,
        origin: formData.origin,
      }),
    });
    const data = await response.json();
    if (data.message) {
      alert(data.message);
    } else {
      alert("Error updating data");
    }
    setEditOpen({ isOpen: false });
  } catch (error) {
    console.error(error);
    alert("Error updating data");
  }
};


  const editGrade = async () => {
    try {
      const response = await fetch("https://3a88-45-136-254-11.ap.ngrok.io/editGrade", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(gradeData),
      });
      const data = await response.json();
      if (data.success) {
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };



  const [loading, setLoading] = useState(true);
  const cookies = new Cookies();
  const [data, setData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [orginalContent, setOriginalcontent] = useState([])

  const searchItems = () => {
    setOriginalcontent(data)
      if(searchInput == ""){
        setData(orginalContent)
      } 
      setData(prevData => prevData.filter(item => item.course_id.toLowerCase().includes(searchInput.toLowerCase())))
    }
    

  useEffect(() => {
      const cachedData = cookies.get("data");
      if (cachedData) {
        setData(cachedData);
        setLoading(false);
        // Fetch latest data from server
        const fetchData = async () => {
          const result = await fetch("https://3a88-45-136-254-11.ap.ngrok.io/course", {
            headers: {
              "Cache-Control": "no-cache",
              Pragma: "no-cache",
            },
          });
          const updatedData = await result.json();
          // Compare the cached data with the latest data
          if (JSON.stringify(cachedData) !== JSON.stringify(updatedData)) {
            // Update the cached data if it's different
            cookies.set("data", updatedData, {
              maxAge: 60 * 60 * 24,
              sameSite: "strict",
            });
            setData(updatedData);
          }
        };
        fetchData();
      } else {
        const fetchData = async () => {
          const result = await fetch("https://3a88-45-136-254-11.ap.ngrok.io/course", {
            headers: {
              "Cache-Control": "no-cache",
              Pragma: "no-cache",
            },
          });
          const data = await result.json();
          setData(data);
          setLoading(false);
          cookies.set("data", data, { maxAge: 60 * 60 * 24, sameSite: "strict" });
        };
        fetchData();
      }
    }, []);

    const [files, setFiles] = useState([]);
  const [json, setJson] = useState(null);

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

    const convertToJSON = () => {
    const jsonData = [];
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const sheetData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
        const fileData = {
          fileName: file.name,
          sheetName: sheetName,
          data: sheetData,
        };
        jsonData.push(fileData);
        if (jsonData.length === files.length) {
          setJson(jsonData);
          console.log("Json: ", jsonData)
        }
      };
      reader.readAsArrayBuffer(file);
    });
  };

  return (
    <div>
      <Menubar />
      <div className="flex min-h-screen ">
        <div className="fade-in text-center pt-20 relative pb-8 sm:mx-auto sm:px-1 ">
          <div className=" pt-4 sm:px-0 ">
            <p className="text-3xl mt-4 font-bold underline text-black">
              จัดการรายววิชา และ แก้ไขเกรด
            </p>
            <pre>
              waiting for endpoint & got bugs in edit Subject
            </pre>
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
                <span className="text-gray-700">{file.name}</span>{' '}
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
        </div>
      )}

      {json && (
        <div className="mt-4">
          <h3 className="text-lg font-bold mb-2">Converted JSON Data:</h3>
          <pre className="bg-gray-200 p-2">{JSON.stringify(json, null, 2)}</pre>
        </div>
      )}

      {!json && files.length === 0 && <p>No files uploaded.</p>}
    </div>            {/* moddal */}
            {isOpen && (
              <div className="fixed bottom-0 inset-x-0 px-4 pb-6 sm:inset-0 sm:p-0 sm:flex sm:items-center sm:justify-center">
                <div
                  className="inline-block rounded-t-xl border shadow-2xl mx-8 bg-white px-4 pt-5 pb-4 overflow-y-scroll "
                  style={{ maxHeight: "70vh" }}
                >
                  <table className="border-collapse table-auto w-full text-sm">
                    <thead>
                      <tr>
                        <th className="px-4 py-2">
                          Name
                        </th>
                        <th className="px-4 py-2">
                          subjectname
                        </th>
                        <th className="px-4 py-2">
                          Grade
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {subjectData.map((item) => (
                        <tr key={item.studentId}>
                          <td className="px-4 py-2">
                            {item.Std_name}
                          </td>
                          <td className="px-4 py-2">
                            {item.Course_name}
                          </td>
                          <td className="px-4 py-2">
                            {item.score}
                          </td>
                          <td className="px-4 py-2">
                            <button
                              className="bg-amber-500 text-white p-2 rounded-lg hover:bg-amber-700"
                              onClick={() => {
                                setEditData(true);
                                setGradeData({
                                  owner: item.studentId,
                                  subject: item.courseId,
                                });
                                console.log(item.studentId, item.courseId);
                              }}
                              type="button"
                            >
                              แก้ไข
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-indigo-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
            {editOpen.isOpen && (
              <div className="fixed bottom-0 inset-x-0 px-4 pb-6 sm:inset-0 sm:p-0 sm:flex sm:items-center sm:justify-center">
                <div
                  className="bg-slate-700 rounded-lg px-4 pt-5 pb-4 overflow-y-scroll"
                  style={{ maxHeight: "70vh" }}
                >
                  <form className="bg-white p-6 rounded-lg shadow-md">
                    <div className="mb-4">
                      <label
                        className="block text-gray-700 font-medium mb-2"
                        htmlFor="data1"
                      >
                        รหัสวิชา
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="data1"
                        name="data1"
                        type="text"
                        placeholder="Enter Data 1"
                        value={formData.data1}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        className="block text-gray-700 font-medium mb-2"
                        htmlFor="data2"
                      >
                        ชื่อวิชา
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="data2"
                        name="data2"
                        type="text"
                        placeholder="Enter Data 2"
                        value={formData.data2}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        className="block text-gray-700 font-medium mb-2"
                        htmlFor="data3"
                      >
                        หน่วยกิต
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="data3"
                        name="data3"
                        type="text"
                        placeholder="Enter Data 3"
                        value={formData.data3}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="flex items-center justify-end">
                      <button
                        className="bg-indigo-500 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        onClick={() => {
                          editSubject();
                        }}
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                  <button
                    onClick={() => {
                      setEditOpen({ isOpen: false });
                    }}
                    className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-indigo-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
            {editData && (
              <div className="fixed bottom-0 inset-x-0 px-4 pb-6 sm:inset-0 sm:p-0 sm:flex sm:items-center sm:justify-center">
                <div
                  className="bg-slate-700 rounded-lg px-4 pt-5 pb-4 overflow-y-scroll"
                  style={{ maxHeight: "70vh" }}
                >
                  <form className="bg-white p-6 rounded-lg shadow-md">
                    <div className="mb-4">
                      <label
                        className="block text-gray-700 font-medium mb-2"
                        htmlFor="data1"
                      >
                        เกรด
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="grade"
                        name="grade"
                        type="text"
                        placeholder="Enter Data 1"
                        value={gradeData.grade}
                        onChange={chageGrade}
                      />
                    </div>
                    <div className="flex items-center justify-end">
                      <button
                        className="bg-indigo-500 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        onClick={() => {
                          editGrade();
                        }}
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                  <button
                    onClick={() => {
                      setEditData(false);
                    }}
                    className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-indigo-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}

            {/* table */}
            {/* <ClassTable /> */}
            <>
        <div className='flex-row mb-4'>
          {/* input search table */}
          <input
            type="text"
            className="shadow appearance-none border rounded w-3/5 py-2 px-8 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="search"
            name="search"
            placeholder="ค้นหา"
            value={searchInput}
            onChange={(e) => {
              console.log("search input:", searchInput);
              setSearchInput(e.target.value);
            }}
          />
          <button
            className="bg-sky-500 text-white p-2 ml-4 rounded-lg hover:bg-sky-700"
            onClick={() => {
              searchItems();
            }}
          >
            search
          </button>
        </div>

        <div className="inline-block rounded-t-xl border shadow-2xl mx-8 bg-white">
          <table className="table-fixed w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">รหัสวิชา</th>
                <th className="px-4 py-2">ชื่อวิชา</th>
                <th className="px-4 py-2">หน่วยกิต</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.map((course) => (
                <tr
                  className=" px-4 hover:bg-slate-200 "
                  key={course.course_id}
                >
                  <td className=" px-4">{course.course_id}</td>
                  <td className=" px-4 text-sm">{course.course_name}</td>
                  <td className=" px-4">{course.credit}</td>
                  <td className=" px-4 ">
                    <button
                      className="bg-sky-500 text-white p-2 rounded-lg hover:bg-sky-700"
                      onClick={() => {
                        setIsOpen(true);
                        subjectMenu(course.course_id);
                      }}
                      type="button"
                    >
                      รายละเอียด
                    </button>
                    <button
                      className="bg-amber-500 text-white p-2 rounded-lg hover:bg-amber-700"
                      onClick={() => {
                        setFormData({ origin: course.course_id });
                        setEditOpen({
                          isOpen: true,
                          id: course.course_id,
                        });
                      }}
                      type="button"
                    >
                      แก้ไข
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
          </div>
        </div>
      </div>
    </div>
  );
}
