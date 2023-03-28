import React, { useState } from 'react';
import EditCourseModal from './editSubject';

const Table = ({ data }) => {
  const [selectedCourse, setSelectedCourse] = useState(null);

  const handleEditClick = (course) => {
    // Set the selected course and open the modal
    setSelectedCourse(course);
  };

  const handleInfoClick = (courseId) => {
    // Implement info logic here
    console.log(`Info button clicked for course id: ${courseId}`);
  };

  return (
    <div className="flex flex-col mt-10">
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
                {data.map((item) => (
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
        <EditCourseModal course={selectedCourse} onClose={() => setSelectedCourse(null)} />
      )}
    </div>
  );
};

export default Table;
