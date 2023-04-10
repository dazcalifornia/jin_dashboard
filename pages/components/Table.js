import React, { useState } from 'react';
import EditCourseModal from './editSubject';
import CourseInfo from './CourseInfo';

const Table = ({ data , handleEditCourseSuccess}) => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourseId, setSelectedCourseId] = useState(null);

  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');

  const handleEditClick = (course) => {
    // Set the selected course and open the modal
    setSelectedCourse(course);
  };

  const handleInfoClick = (courseId) => {
    // Implement info logic here
    setSelectedCourseId(courseId);
    console.log(`Info button clicked for course id: ${courseId}`);
  };

  const handleSortClick = (column) => {
    // Toggle the sort order if the same column is clicked twice
    if (sortColumn === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortOrder('asc');
    }
  }
 
const filterData = (data, query, column, order) => {
  return data
    .filter((item) => {
      const { course_id, course_name, credit } = item;
      const lowerCaseQuery = query.toLowerCase();
      return (
        course_id.toLowerCase().includes(lowerCaseQuery) ||
        course_name.toLowerCase().includes(lowerCaseQuery) ||
        credit.toString().includes(lowerCaseQuery)
      );
    })
    .sort((a, b) => {
      if (!column) {
        // No sort column selected, return unsorted
        return 0;
      }
      const valueA = a[column];
      const valueB = b[column];
      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return valueA.localeCompare(valueB, undefined, {
          numeric: true,
          sensitivity: 'base',
        });
      } else {
        return valueA - valueB;
      }
    })
    .map((item) => item)
    .sort((a, b) => {
      const valueA = a[column];
      const valueB = b[column];
      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return valueA.localeCompare(valueB, undefined, {
          numeric: true,
          sensitivity: 'base',
        });
      } else {
        return valueA - valueB;
      }
    })
    .sort((a, b) => (order === 'asc' ? 1 : -1));
};
const filteredData = filterData(data, searchQuery, sortColumn, sortOrder);
  return (
    <div className="flex flex-col mt-10">
      <div className="mb-4 flex items-center">
        <label htmlFor="search" className="mr-2 font-bold text-white">
          ค้นหา:
        </label>
        <input
          id="search"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-gray-300 p-1 rounded-md"
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
          <option value="course_id">Course ID</option>
          <option value="course_name">Course Name</option>
          <option value="credit">Credit</option>
        </select>

        <button
          className="ml-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
          onClick={() => handleSortClick(document.getElementById("sort").value)}
        >
          {sortOrder === "asc" ? "▲" : "▼"}
        </button>
      </div>
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200 bg-white">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    รหัสวิชา
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    ชื่อวิชา
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    หมู่เรียน
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    หน่วยกิต
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">เมนู</span>
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {filteredData.map((item) => (
                  <tr key={item.course_id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {item.course_id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.course_name}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.sections.map((section) => (
                        <p key={section}>{section.Section}</p>
                      ))}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.credit}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-1">
                      <button
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
                        onClick={() => handleEditClick(item)}
                      >
                        แก้ไข
                      </button>
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center"
                        onClick={() => handleInfoClick(item.course_id)}
                      >
                        รายละเอียด
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {selectedCourseId && (
        <CourseInfo
          courseId={selectedCourseId}
          handleEditCourseSuccess={handleEditCourseSuccess}
          onClose={() => setSelectedCourseId(null)}
        />
      )}
      {selectedCourse && (
        <EditCourseModal
          course={selectedCourse}
          handleEditCourseSuccess={handleEditCourseSuccess}
          onClose={() => setSelectedCourse(null)}
        />
      )}
    </div>
  );
};

export default Table;
