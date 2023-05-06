import React, { useState, useEffect } from "react";
import Image from "next/image";
import Menu from "./components/Menu";
import StdInfo from "./components/StdData";
import Toast from "./components/Toast";

const StudentPage = () => {
  // student
  const [students, setStudents] = useState([]);
  const [selectedStd, setSelectedStd] = useState(null);
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

  return (
    <>
      <Menu />
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <h2>Students</h2>
          <div className="overflow-x-auto">
            <div className="min-w-full">
              <table className="min-w-full divide-y divide-gray-200 bg-white">
                <thead>
                  <tr>
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">Major</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr
                      key={student.Id}
                      className="cursor-pointer hover:bg-gray-200"
                      onClick={() => {
                        console.log("student", student);
                        setSelectedStd(student);
                      }}
                    >
                      <td className="border px-4 py-2">{student.name}</td>
                      <td className="border px-4 py-2">{student.Major}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
