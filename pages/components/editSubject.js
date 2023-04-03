import { useState } from "react";
import Modal from "./Modal";
import Toast from "./Toast";

function EditCourseModal({ course, onEdit, onClose, handleEditCourseSuccess }) {
  const [newCourse, setNewCourse] = useState(course);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewCourse({ ...newCourse, [name]: value });
  };


const handleUpdate = () => {
  // Set the updated_at field to the current date and time
  const newCourseWithDate = {
    ...newCourse,
    updated_at: newCourse.course_id,
  };

  fetch(`http://localhost:8000/editSubject`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newCourseWithDate),
  }).then((response) => {
    if (response.ok) {
      console.log("Course updated successfully");
      onClose();
       handleEditCourseSuccess();
    } else {
      console.error("Failed to update course");
    }
  });
};


  return (
    <Modal open={true} onClose={onClose}>
      <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <div className="sm:flex sm:items-start">
          
          <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
            <h3
              className="text-lg leading-6 font-medium text-gray-900"
              id="modal-title"
            >
              แก้ไขรายวิชา
            </h3>
            <div className="mt-2">
              <div>
                <label
                  htmlFor="course_id"
                  className="block text-sm font-medium text-gray-700"
                >
                  รหัสวิชา
              </label>
                <input
                  type="text"
                  name="course_id"
                  id="course_id"
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  value={newCourse.course_id || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mt-4">
                <label
                  htmlFor="course_name"
                  className="block text-sm font-medium text-gray-700"
                >
                  ชื่อวิชา
                </label>
                <input
                  type="text"
                  name="course_name"
                  id="course_name"
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  value={newCourse.course_name || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mt-4">
                <label
                  htmlFor="credit"
                  className="block text-sm font-medium text-gray-700"
                >
                  หมู่เรียน
                </label>
                <input
                  type="text"
                  name="section"
                  id="section"
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  value={newCourse.section || ""}
                  onChange={handleInputChange}
                />
              </div>

              <div className="mt-4">
                <label
                  htmlFor="credit"
                  className="block text-sm font-medium text-gray-700"
                >
                  หน่วยกิต
                </label>
                <input
                  type="text"
                  name="credit"
                  id="credit"
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  value={newCourse.credit || ""}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
        </div>
      <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
        <button
          type="button"
          className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
          onClick={handleUpdate}
        >
          ยืนยันการแก้ไข 
        </button>
        <button
          type="button"
          className="mt-3 w-full inline-flex justify-center rounded-md border border-rose-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-rose-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
          onClick={onClose}
        >
          ยกเลิก
        </button>
      </div>
    </div>
  </Modal>
  );
}

export default EditCourseModal;
