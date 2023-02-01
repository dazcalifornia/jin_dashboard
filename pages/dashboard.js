import { useRouter } from 'next/router';
import { useState,useEffect } from 'react'

export default function Dashboard(){
  const [data,setData] = useState([])
  const [subjectData, setsubjectData] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [editOpen,setEditOpen] = useState({isOpen:false,id:""})
  const [formData, setFormData] = useState({
      data1: '',
      data2: '',
      data3: '',
      origin:''
  });

  const [editData,setEditData] = useState(false)
  const [gradeData, setGradeData] = useState({
    grade:"",
    owner:"",
    subject:""
  })

  

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };
  const chageGrade = (event) => {
    setGradeData({
      ...gradeData,
      [event.target.grade]: event.target.value,
    });
  };

  

  const router = useRouter()
  useEffect(()=>{
    fetch('http://localhost:8080/course')
    .then(response => response.json())
    .then(data => setData(data))
    .catch(error => console.log(error));
  },[])
  const handleSignout=()=>{
     router.replace('/')
  }
  
  const subjectMenu=(id)=>{

    fetch(`http://localhost:8080/grades/${id}`)
        .then(response => response.json())
        .then(subjectData => setsubjectData(subjectData))
        .catch(error => console.log(error));

  }


  const editSubject = async (event) => {
      try {
        const response = await fetch('http://localhost:8080/editsubJect', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
        const data = await response.json();
        if (data.success) {
          
        } else {
          alert(data.message)
        }
      } catch (error) {
        console.error(error);
      }
  }

  const editGrade = async ()=>{
    try {

      const response = await fetch('http://localhost:8080/editGrade', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(gradeData)
      });
      const data = await response.json();
      if (data.success) {
        
      } else {
        alert(data.message)
      }
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div>
      <div className="flex min-h-screen bg-white ">
        <div className="fade-in text-center pt-20 relative pb-8 sm:mx-auto sm:px-1 sm:max-w-xl">
          <div className="px-4 pt-4 sm:px-0 ">
            <nav>
              <p className="text-3xl font-bold underline text-black">
                จัดการรายววิชา และ แก้ไขเกรด
              </p>
              {/* make logout button */}
              <button
                className="bg-rose-500 text-white p-2 rounded-lg hover:bg-rose-700"
                onClick={handleSignout}
                type="button"
              >
                Logout
              </button>
            </nav>
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
                                setEditData(true)
                                setGradeData({owner:item.studentId,subject:item.courseId})
                                console.log(gradeData);
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
                        onClick={()=>{
                          
                          editSubject()
                        }
                      }
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
                        onClick={()=>{
                          editGrade()
                        }
                      }
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
            <div className="inline-block rounded-lg border shadow-2xl w-full">
              <table className="table-auto">
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
                    <tr className="border px-4" key={course.course_id}>
                      <td className="border px-4">{course.course_id}</td>
                      <td className="border px-4">{course.course_name}</td>
                      <td className="border px-4">{course.credit}</td>
                      <td className="border px-4 ">
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
                            setFormData({origin:course.course_id})
                            setEditOpen({ isOpen: true, id: course.course_id });
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
            {/* <table className="border-collapse table-auto w-full text-sm">
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
                          console.log(item.studentId);
                        }}
                        type="button"
                      >
                        แก้ไข
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table> */}
          </div>
        </div>
      </div>
    </div>
  );
}
