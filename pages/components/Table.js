import React, { useState } from 'react';
import EditCourseModal from './editSubject';

const Table = ({ data , handleEditCourseSuccess}) => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const handleEditClick = (course) => {
    // Set the selected course and open the modal
    setSelectedCourse(course);
  };

  const handleInfoClick = (courseId) => {
    // Implement info logic here
    console.log(`Info button clicked for course id: ${courseId}`);
  };
 
  const filterData = (data, query) => {
  return data.filter((item) => {
    const { course_id, course_name, credit } = item;
    const lowerCaseQuery = query.toLowerCase();
    return (
      course_id.toLowerCase().includes(lowerCaseQuery) ||
      course_name.toLowerCase().includes(lowerCaseQuery) ||
      credit.toString().includes(lowerCaseQuery)
    );
  });
}
const filteredData = filterData(data, searchQuery);

  return (
    <div className="flex flex-col mt-10">
    <div className="mb-4 flex items-center">
        <label htmlFor="search" className="mr-2 font-bold text-gray-600">Search:</label>
        <input
          id="search"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-gray-300 p-1 rounded-md"
        />
      </div>
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200 bg-white">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    รหัสวิชา 
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ชื่อวิชา
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    หน่วยกิต
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Edit</span>
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
                      {item.credit}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
                        onClick={() => handleEditClick(item)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center"
                        onClick={() => handleInfoClick(item.course_id)}
                      >
                        Info
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {selectedCourse && (
        <EditCourseModal course={selectedCourse} handleEditCourseSuccess={handleEditCourseSuccess} onClose={() => setSelectedCourse(null)} />
      )}
    </div>
  );
};

export default Table;
