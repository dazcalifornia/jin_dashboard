import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import Menubar from "../components/menuBars";
import ClassTable from "../components/Classtable";

// import fs from 'fs';
// import xlsx from 'xlsx';




//convert excel to json mockup 
// export async function getServerSideProps() {
//   const filePath = './path/to/excel-file.xlsx';
//   const buffer = fs.readFileSync(filePath);
//   const workbook = xlsx.read(buffer, { type: 'buffer' });
//   const sheetName = workbook.SheetNames[0];
//   const worksheet = workbook.Sheets[sheetName];
//   const data = xlsx.utils.sheet_to_json(worksheet);
//   return { props: { data } };
// }



export default function Dashboard() {
  // const [data, setData] = useState([]);
  const [subjectData, setsubjectData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editOpen, setEditOpen] = useState({ isOpen: false, id: "" });

  // const [searchInput, setSearchInput] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);

  // const [loading, setLoading] = useState(true);
  // const cookies = new Cookies();

  const [selectedFile, setSelectedFile] = useState(null);

  const [json, setJson] = useState(null)

  async function handleExcel(e){
    e.preventDefault();

    const file = event.target.file.files[0];

    const response = await fetch('http://localhost:8080/api/convert-excel-to-json', {
      method: 'POST',
      body: JSON.stringify({ file }),
      headers: {
        'Content-Type': 'application/json',
      },
    });


    const data = await response.json();
    setJson(data);

  }


  function handleFileUpload(event) {
    setSelectedFile(event.target.files[0]);
  }


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

  // const searchItems = (searchValue) => {
  //   setSearchInput(searchValue);
  //   if (searchInput !== "") {
  //     const filteredData = data.filter((item) => {
  //       return Object.values(item)
  //         .join("")
  //         .toLowerCase()
  //         .includes(searchInput.toLowerCase());
  //     });
  //     setFilteredResults(filteredData);
  //     console.log(filteredData);
  //   } else {
  //     setFilteredResults(data);
  //   }
  // };

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

  // useEffect(()=>{
  //   fetch('http://https://3a88-45-136-254-11.ap.ngrok.io/course')
  //   .then(response => response.json())
  //   .then(data => setData(data))
  //   .catch(error => console.log(error));
  // },[])

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
    try {
      const response = await fetch("https://3a88-45-136-254-11.ap.ngrok.io/editsubJect", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
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
              waiting for endpoint
            </pre>
    {/*}    <form onSubmit={handleExcel}>
        <input type="file" name="file" />
        <button type="submit">Convert to JSON</button>
      </form>

      {json && (
        <pre>{JSON.stringify(json, null, 2)}</pre>
      )}*/}
            {/* make logout button */}
            {/* <button
              className="bg-rose-500 text-white p-2 rounded-lg hover:bg-rose-700"
              onClick={handleSignout}
              type="button"
            >
              Logout
            </button> */}

            {/* addfile */}

            {/* <form>
              <input type="file" name="file" />
              <button
                className="bg-emerald-500 text-white p-2 rounded-lg hover:bg-emerald-700"
                type="button"
                onClick={()=>{
                fetch("/upload", {
                  method: "POST",
                  body: selectedFile,
                })
                  .then((res) => res.text())
                  .then((data) => console.log(data))
                  .catch((error) => console.error(error));
                }}
              >
                Upload
              </button>
            </form>
            <button
              className="bg-emerald-500 text-white p-2 rounded-lg hover:bg-emerald-700"
              onClick={()=>{
                fetch("https://3a88-45-136-254-11.ap.ngrok.io/upload", {
                  method: "POST",
                  body: selectedFile,
                })
                  .then((res) => res.text())
                  .then((data) => console.log(data))
                  .catch((error) => console.error(error));
                
              }}
              type="button"
            >
              addFile
            </button>
            <input type="file" onChange={handleFileUpload} />
            {selectedFile && <p>File selected: {selectedFile.name}</p>} */}
            {/* moddal */}
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
