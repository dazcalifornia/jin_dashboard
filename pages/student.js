import React, { useState, useEffect } from "react";
import Menu from "./components/Menu";
import StdInfo from "./components/StdData";
import Toast from "./components/Toast";

const StudentPage = () => {
  // student
  const [students, setStudents] = useState([]);
  const [selectedStd, setSelectedStd] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  const getStudents = async () => {
    try {
      const response = await fetch("http://localhost:8000/std", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log("students", data);
        setStudents(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getStudents();
  }, []);

  const [showToast, setShowToast] = useState(false);

  const handleEditCourseSuccess = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000); // hide the toast after 3 seconds
  };

  const filteredStudents = students.filter((student) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      student.Id.toLowerCase().includes(searchLower) ||
      student.name.toLowerCase().includes(searchLower) ||
      student.Major.toLowerCase().includes(searchLower)
    );
  });

  const handleSortClick = (column) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortOrder("asc");
    }
  };

  const sortedStudents = sortColumn
    ? [...filteredStudents].sort((a, b) => {
        if (a[sortColumn] < b[sortColumn]) {
          return sortOrder === "asc" ? -1 : 1;
        }
        if (a[sortColumn] > b[sortColumn]) {
          return sortOrder === "asc" ? 1 : -1;
        }
        return 0;
      })
    : filteredStudents;

  return (
    <>
      <Menu />
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="mb-4 flex items-center">
            <label htmlFor="search" className="mr-2 font-bold text-white">
              ค้นหา:
            </label>
            <input
              id="search"
              type="text"
              className="border border-gray-300 p-1 rounded-md"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <label htmlFor="sort" className="mr-2 font-bold text-white">
              เรียงตาม:
            </label>
            <select
              id="sort"
              value={sortColumn}
              onChange={(e) => setSortColumn(e.target.value)}
              className="border border-gray-300 p-1 rounded-md"
            >
              <option value="">None</option>
              <option value="Id">Student ID</option>
              <option value="name">Name</option>
              <option value="Major">Major</option>
            </select>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
              onClick={() => handleSortClick(sortColumn)}
            >
              {sortOrder === "asc" ? "▲" : "▼"}
            </button>
          </div>
          <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                          onClick={() => handleSortClick("Id")}
                        >
                          Student ID
                          {sortColumn === "Id" && (
                            <span className="ml-1">
                              {sortOrder === "asc" ? "▼" : "▲"}
                            </span>
                          )}
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                          onClick={() => handleSortClick("name")}
                        >
                          Name
                          {sortColumn === "name" && (
                            <span className="ml-1">
                              {sortOrder === "asc" ? "▼" : "▲"}
                            </span>
                          )}
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                          onClick={() => handleSortClick("Major")}
                        >
                          Major
                          {sortColumn === "Major" && (
                            <span className="ml-1">
                              {sortOrder === "asc" ? "▼" : "▲"}
                            </span>
                          )}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {sortedStudents.map((student) => (
                        <tr key={student.Id}
                        className="cursor-pointer hover:bg-gray-200"
                        onClick={() => {
                          console.log("student", student);
                          setSelectedStd(student);
                        }}
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {student.Id}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {student.name}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {student.Major}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {selectedStd && (
        <StdInfo
          student={selectedStd}
          onClose={() => setSelectedStd(null)}
          handleEditCourseSuccess={handleEditCourseSuccess}
        />
      )}
      {showToast && (
        <Toast className="animate-fade" message="Course edited successfully" />
      )}
    </>
  );
};
export default StudentPage;
