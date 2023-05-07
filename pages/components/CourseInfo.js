import { useState, useEffect } from 'react';
import Modal from './Modal';

const CourseInfo = ({ courseId, onEdit, onClose, handleEditCourseSuccess }) => {
  const [course, setCourse] = useState([]);
  const [sections, setSections] = useState([]);
  const [selectedSec, setSelectedSec] = useState(null);
  const [passingData, setPassingData] = useState({ grade: '', owner: '', subject: '', section: '' });
  const [isEditingGrade, setIsEditingGrade] = useState(false);

  useEffect(() => {
    async function fetchSection() {
      try {
        const response = await fetch(`http://localhost:8000/grades/${courseId}`);
        const data = await response.json();
        console.log("Section Fetched:",data);
        setSections(data);
      } catch (error) {
        console.error(error);
      }
    }
    

    fetchSection();
  }, [courseId]);

  useEffect(() => {
  setPassingData(prevPassingData => ({
    ...prevPassingData,
    owner: course.length ? course[0].studentId : '',
    section: course.length ? course[0].sectionId : '',
    subject: course.length ? course[0].courseId : ''
  }));
}, [course]);

  async function fetchCourse(sectionId) {
      try {
        const res = await fetch(`http://localhost:8000/grades/${courseId}/${sectionId}`);
        const data = await res.json();
        console.log("Grade fetched:",data);
        setCourse(data);
      } catch (error) {
        console.error(error);
      }
    }

  
const validGrades = ["A", "B+", "B", "C+", "C", "D+", "D", "F", "W"];

const handleGradeChange = (e) => {
  console.log('passingData', passingData);
  console.log('handleGradeChange', e.target.value);
  const enteredGrade = e.target.value.toUpperCase();
  if (validGrades.includes(enteredGrade)) {
    setPassingData({
      ...passingData,
      grade: enteredGrade,
      section: selectedSec // add the selected section here
    });
  }
};


  const debug = () => {
    console.log(passingData);
  };

  
const handleCancelClick = () => {
  setIsEditingGrade(false);
  setPassingData(prevPassingData => ({
    ...prevPassingData,
    grade: '',
  }));
};

const handleEditGradeClick = (studentId) => {
  console.log('clicked student ID:', studentId);
  setIsEditingGrade(studentId);
  setPassingData(prevPassingData => ({
    ...prevPassingData,
    owner: studentId
  }));
  console.log('isEditingGrade:', isEditingGrade);
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
      setIsEditingGrade(false);
      handleEditCourseSuccess();
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
      <h3 className="text-lg leading-6 font-medium text-gray-900">
        รายละเอียด
      </h3>


    <select
      className="block w-full p-2 border border-gray-300 rounded-md"
      value={selectedSec}
      onChange={(e) => {
        setSelectedSec(e.target.value);
        if (e.target.value !== "") {
          fetchCourse(e.target.value);
        }
      }}
    >
      <option value="">เลือกหมู่เรียน</option>
      {sections.map((section) => (
        <option
          key={section.section_id}
          value={section.Section}
          onChange={(e) => {
            setSelectedSec(e.target.value);
          }}
        >
          {section.Section}
        </option>
      ))}
    </select>

    <table className="border-collapse table-auto w-full text-sm">
      <thead>
        <tr>
          <th className="px-4 py-2">ชื่อนิสิต</th>
          <th className="px-4 py-2">ชื่อวิชา</th>
          <th className="px-4 py-2">เกรด</th>
        </tr>
      </thead>
      <tbody>
        {Array.isArray(course) &&
          course.map((item) => (
            <tr key={item.studentId} className="divide-y">
              <td className="px-4 py-2">{item.Std_name}</td>
              <td className="px-4 py-2">{item.Course_name}</td>
              <td className="px-4 py-2">
                {isEditingGrade === item.studentId ? (
                  <div className="flex justify-center items-center">
                    <select
                      className="border rounded px-2 py-1 mr-2"
                      value={passingData.grade}
                      onChange={handleGradeChange}
                    >
                      <option value="A">A</option>
                      <option value="B+">B+</option>
                      <option value="B">B</option>
                      <option value="C+">C+</option>
                      <option value="C">C</option>
                      <option value="D+">D+</option>
                      <option value="D">D</option>
                      <option value="F">F</option>
                      <option value="W">W</option>
                    </select>
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      onClick={handleSaveGradeClick}
                    >
                      Save
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => handleCancelClick()}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div className="flex justify-between">
                    <span>{item.score}</span>
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => handleEditGradeClick(item.studentId)}
                    >
                      Edit
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
      </tbody>
    </table>
    </div>
  </Modal>
);
};

export default CourseInfo;
