import {useState,useEffect} from 'react'
import Cookies from "universal-cookie";

export default function ClassTable(){
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
    );
}