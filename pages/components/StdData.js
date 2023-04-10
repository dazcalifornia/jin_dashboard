import React,{
  useState,
  useEffect
} from 'react'

import Modal from './Modal'

const StdInfo = ({  student, onEdit, onClose ,handleEditCourseSuccess}) => {
  const [isEdit, setIsEdit] = useState(false)
  const [Student, setStudent] = useState(student)


  const [isEditingGrade, setIsEditingGrade] = useState(false);
  const [passingData, setPassingData] = useState({ grade: '', owner: '', subject: '' });
  const [stdGrade, setStdGrade] = useState([]); //grade of the student 

  const getGrades = async () => {
    try {
      const response = await fetch(`http://localhost:8000/grades`);
      const data = await response.json();
      //filter grade of the student_id 
      setStdGrade(data.filter((grade) => grade.studentId === student.Id));
      console.info("Student Grade:",data.filter((grade) => grade.studentId === student.Id));
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getGrades();
  }, []);

  const handleEditClick = () => {
    setIsEdit(true)
  }
  const handleEditClose = () => {
    setIsEdit(false)
  }
  const handleEditSubmit = (student) => {
    onEdit(student)
    setIsEdit(false)
  }
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setStudent({ ...student, [name]: value })
  }

  const handleEditGradeClick = (studentId) => {
  console.log('clicked student ID:', studentId);
  setIsEditingGrade(studentId);
  console.log('isEditingGrade:', isEditingGrade);
};

const handleGradeChange = (e) => {
    setPassingData({
      ...passingData,
      grade: e.target.value
    });
  };
  const debug = () => {
    console.log(passingData);
  };

  const handleSaveGradeClick = async () => {
    console.log('Saving grade', passingData);
    try {
      const response = await fetch(`http://localhost:8000/editGrade`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(passingData),
      });

      if (response.ok) {
        // If the update was successful, remove the score ID from the state
        setIsEditingGrade(false);
        handleEditCourseSuccess();
        alert("Grade Updated");
        getGrades();
      } else {
        console.error('Failed to update grade');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = () => {
    // Set the updated_at field to the current date and time
    const newCourseIdWithDate = {
      ...newCourseId,
      updated_at: newCourseId.course_id,
    };
  };

  return (
    <Modal open={true} onClose={onClose}>
      <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 w-lg">
        <div className="sm:flex sm:items-start">
          <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
            <h3
              className="text-lg leading-6 font-medium text-gray-900"
              id="modal-title"
            >
              ข้อมูลนักศึกษา : {student.name}
            </h3>
            <div className="divide-emerald-200"/>
            <div className="mt-2">
              <div>
                <label
                  htmlFor="student_id"
                  className="block text-sm font-medium text-gray-700"
                >
                  รหัสนักศึกษา : {student.Id}
                  
                </label>
              </div>
              <div className="mt-4">
               
                  <label
                    htmlFor="student_name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    ชื่อนักศึกษา : {student.name} 
                  
                  </label>
                  
              </div>
              <div className="mt-4">
                <label htmlFor="student_name" className="block text-sm font-medium text-gray-700">
                  สาขา : {student.Major}
                </label>
              </div>
              <div className="mt-4">
                <label htmlFor="student_name" className="block text-sm font-medium text-gray-700">
                    โรงเรียนที่สำเร็จการศึกษา : {student.School}
                </label>
              </div>

            <section className="text-gray-600 body-font">
              
                  <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">ผลการเรียน</h1>
                  <table className="border-collapse table-auto w-full text-sm" >
                        <thead>
                          <tr>
                            <th className="px-4 py-2">รหัสวิชา</th>
                            <th className="px-4 py-2">ชื่อวิชา</th>
                            <th className="px-4 py-2">หมู่</th>
                            <th className="px-4 py-2">เกรด</th>
                          </tr>
                        </thead>
                        <tbody>
                          {stdGrade.map((grade) => (
                          <tr key={grade.studentId}>
                            <td className=" px-4 py-2">{grade.courseId}</td>
                            <td className=" px-4 py-2">{grade.Course_name}</td>
                            <td className=" px-4 py-2">{grade.Section}</td>
                            <td className=" px-4 py-2">
                            {isEditingGrade === grade.courseId ? (
                              <div className="flex justify-center items-center">
      <input
        className="border rounded px-2 py-1 w-20 mr-2"
        type="text"
        
        value={passingData.grade}
        onChange={handleGradeChange}
      />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleSaveGradeClick}
      >
        ✔
      </button>
      <button
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => setIsEditingGrade(false)}
      >
        ✖      </button>
    </div>
                            ) : (
                              <div className="flex justify-between">
      <span>{grade.score}</span>

                              <button
  className="bg-amber-500 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded"
  onClick={() => 
    {
      handleEditGradeClick(grade.courseId);
      // set passingData with studentId and courseId 
      setPassingData({
        ...passingData,
        owner: student.Id,
        subject: grade.courseId,
      });
    }
  }
>
                                แก้ไข
                              </button>
                            </div>
                            )}
                            </td>
                          </tr>
                          ))}
                        </tbody>
                      </table>

              </section>

            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}
export default StdInfo
