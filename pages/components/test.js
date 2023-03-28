import { useState } from "react";
import Modal from "./Modal";


function EditCourseModal({ course, onEdit, onClose }) {
  const [newCourse, setNewCourse] = useState(course);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewCourse({ ...newCourse, [name]: value });
  };

  const handleUpdate = () => {
    onEdit(newCourse);
    onClose();
  };

  return (
    <Modal open={true} onClose={onClose}>
  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
    <div className="sm:flex sm:items-start">
      <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100 sm:mx-0 sm:h-10 sm:w-10">
        <svg
          className="h-6 w-6 text-yellow-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </div>
      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
        <h3
          className="text-lg leading-6 font-medium text-gray-900"
          id="modal-title"
        >
          Edit Course
        </h3>
        <div className="mt-2">
          <div>
            <label
              htmlFor="course_id"
              className="block text-sm font-medium text-gray-700"
            >
              Course ID
            </label>
            <input
              type="text"
              name="course_id"
              id="course_id"
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              value={newCourse.course_id}
              onChange={handleInputChange}
            />
          </div>
          <div className="mt-4">
            <label
              htmlFor="course_name"
              className="block text-sm font-medium text-gray-700"
            >
              Course Name
            </label>
            <input
              type="text"
              name="course_name"
              id="course_name"
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              value={newCourse.course_name}
              onChange={handleInputChange}
            />
          </div>
          <div className="mt-4">
            <label
              htmlFor="credit"
              className="block text-sm font-medium text-gray-700"
            >
              Credit
            </label>
            <input
              type="text"
              name="credit"
              id="credit"
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              value={newCourse.credit}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>
    </div>
    <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
      <button
        type="submit"
        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-yellow-600 text-base font-medium text-white hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 sm:ml-3 sm:w-auto sm:text-sm"
        onClick={handleUpdate}
      >
        Submit
      </button>
      <button
        type="button"
        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        onClick={onClose}
      >
        Cancel
      </button>
    </div>
  </div>
</Modal>
  );
}

export default EditCourseModal;
