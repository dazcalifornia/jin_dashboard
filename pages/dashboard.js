import { useRouter } from 'next/router';
import { useState,useEffect } from 'react'

export default function Dashboard(){
  const [data,setData] = useState([])
  const [subjectData, setsubjectData] = useState([])

  const router = useRouter()
  useEffect(()=>{
    fetch('http://localhost:8080/course')
    .then(response => response.json())
    .then(data => setData(data))
    .catch(error => console.log(error));
  },[])
  const handleSignout=()=>{
    router.back()
  }
  
  const subjectMenu=(id)=>{
    console.log(id)
    fetch(`http://localhost:8080/grades/${id}`)
        .then(response => response.json())
        .then(subjectData => setsubjectData(subjectData))
        .catch(error => console.log(error));
        
  }

  return (
    <div>
      <div className="flex min-h-screen bg-gradient-to-tr from-slate-900 to-sky-200">
        <div className="fade-in text-center pt-20 relative pb-8 sm:mx-auto sm:px-1 sm:max-w-xl">
          <div className="px-4 pt-  4 sm:px-0 ">
            <nav>
              <p className="text-3xl font-bold underline text-white">
                all Course
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

            <table className="table-auto">
              <thead>
                <tr>
                  <th className="px-4 py-2">รหัสวิชา</th>
                  <th className="px-4 py-2">ชื่อวิชา</th>
                  <th className="px-4 py-2">หน่วยกิต</th>
                </tr>
              </thead>
              <tbody>
                {data.map((course) => (
                  <tr key={course.course_id}>
                    <td className="border px-4">{course.course_id}</td>
                    <td className="border px-4">{course.course_name}</td>
                    <td className="border px-4">{course.credit}</td>
                    <td className="border px-4">
                      <button
                        className="bg-rose-500 text-white p-2 rounded-lg hover:bg-rose-700"
                        onClick={()=>subjectMenu(course.course_id)}
                        type="button"
                      >
                        รายละเอียด
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {subjectData.map((item) => (
              <div key={item.studentId}>
                <p>{item.Std_name}</p>
                <p>{item.score}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
