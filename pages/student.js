import React, { useState, useEffect } from "react";

import Menu from "./components/Menu";
const StudentPage = () => {
  // student
  const [student, setStudent] = useState([]);

  const getStudent = async () => {
    try {
      const response = await fetch("http://localhost:8000/std", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log("student", data);
        setStudent(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getStudent();
  }, []);

  return (
   <>
    <Menu />
<section className="text-gray-600 body-font">
  <div className="container px-5 py-24 mx-auto">
    <h2>student</h2>
    <div className="flex flex-wrap -m-4">
      {student.map((student) => (
        <div className="p-4 lg:w-1/3" key={student}>
          <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden bg-white">
            {student.image ? (
              <img
                className="w-full h-48 object-cover object-center"
                src={student.image}
                alt={`${student.name} profile`}
              />
            ) : (
              <div className="w-full h-48 bg-gray-200"></div>
            )}
            <div className="p-6">
              <p className="text-gray-500 text-xs mb-2">ID: {student.Id}</p>
              <h2 className="text-lg font-medium text-gray-900 mb-2">
                {student.name}
              </h2>
              <p className="text-gray-500 text-xs mb-2">
                Major: {student.Major}
              </p>
              <p className="text-gray-500 text-xs mb-2">
                School: {student.School}
              </p>
              <p className="text-gray-500 text-xs mb-2">
                Gender: {student.gender}
              </p>
              <p className="text-gray-500 text-xs mb-2">
                Grade: {student.grade}
              </p>
              <p className="text-gray-500 text-xs mb-2">GPA: {student.GPA}</p>
              <p className="text-gray-500 text-xs mb-2">
                TCAS: {student.Tcas}
              </p>
              <p className="text-gray-500 text-xs mb-2">
                Province: {student.provice}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
    </>

  );
};

export default StudentPage;
