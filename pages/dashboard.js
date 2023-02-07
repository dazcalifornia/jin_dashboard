import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import Menubar from "../components/menuBars";
import ClassTable from "../components/Classtable";

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [subjectData, setsubjectData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editOpen, setEditOpen] = useState({ isOpen: false, id: "" });

  const [searchInput, setSearchInput] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);

  const [loading, setLoading] = useState(true);
  const cookies = new Cookies();

  const [selectedFile, setSelectedFile] = useState(null);

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

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchInput !== "") {
      const filteredData = data.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      setFilteredResults(filteredData);
      console.log(filteredData);
    } else {
      setFilteredResults(data);
    }
  };

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
  //   fetch('http://localhost:8080/course')
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
        const result = await fetch("http://localhost:8080/course", {
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
        const result = await fetch("http://localhost:8080/course", {
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
    fetch(`http://localhost:8080/grades/${id}`)
      .then((response) => response.json())
      .then((subjectData) => setsubjectData(subjectData))
      .catch((error) => console.log(error));
  };

  const editSubject = async (event) => {
    try {
      const response = await fetch("http://localhost:8080/editsubJect", {
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
      const response = await fetch("http://localhost:8080/editGrade", {
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
  return (
    <div>
      <Menubar />
      <div className="flex min-h-screen bg-white">

        <div className="fade-in text-center pt-20 relative pb-8 sm:mx-auto sm:px-1 ">
          
          <div className=" pt-4 sm:px-0 ">
            <p className="text-3xl mt-4 font-bold underline text-black">
              จัดการรายววิชา และ แก้ไขเกรด
            </p>
            {/* make logout button */}
            {/* <button
              className="bg-rose-500 text-white p-2 rounded-lg hover:bg-rose-700"
              onClick={handleSignout}
              type="button"
            >
              Logout
            </button> */}

            {/* addfile */}
            <button
              className="bg-emerald-500 text-white p-2 rounded-lg hover:bg-emerald-700"
              onClick={handleFileUpload}
              type="button"
            >
              addFile
            </button>

            <input type="file" onChange={handleFileUpload} />
            {selectedFile && <p>File selected: {selectedFile.name}</p>}
            {/* moddal */}
            {isOpen && (
              <div className="fixed bottom-0 inset-x-0 px-4 pb-6 sm:inset-0 sm:p-0 sm:flex sm:items-center sm:justify-center">
                <div
                  className="bg-slate-500 rounded-lg px-4 pt-5 pb-4 overflow-y-scroll"
                  style={{ maxHeight: "70vh" }}
                >
                  <table className="border-collapse table-auto w-full text-sm">
                    <thead>
                      <tr>
                        <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-black text-left">
                          Name
                        </th>
                        <th className="border-b dark:border-slate-600 font-medium p-4 pt-0 pb-3 text-black text-left">
                          subjectname
                        </th>
                        <th className="border-b dark:border-slate-600 font-medium p-4 pr-8 pt-0 pb-3 text-black text-left">
                          Grade
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-slate-800">
                      {subjectData.map((item) => (
                        <tr key={item.studentId}>
                          <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                            {item.Std_name}
                          </td>
                          <td className="border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
                            {item.Course_name}
                          </td>
                          <td className="border-b border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-500 dark:text-slate-400">
                            {item.score}
                          </td>
                          <td className="border-b border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-500 dark:text-slate-400">
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
            <ClassTable/>
          </div>
        </div>
      </div>
    </div>
  );
}
