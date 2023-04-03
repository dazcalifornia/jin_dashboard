import { useState, useEffect } from 'react';
import Modal from './Modal';

const CourseInfo = ({ courseId, onEdit, onClose, handleEditCourseSuccess }) => {
  const [course, setCourse] = useState([]);
  const [passingData, setPassingData] = useState({ grade: '', owner: '', subject: '' });
  const [isEditingGrade, setIsEditingGrade] = useState(false);

  useEffect(() => {
    async function fetchCourse() {
      try {
        const response = await fetch(`http://localhost:8000/grades/${courseId}`);
        const data = await response.json();
        console.log("DATA:",data);
        setCourse(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchCourse();
  }, [courseId]);

  useEffect(() => {
  setPassingData(prevPassingData => ({
    ...prevPassingData,
    owner: course.length ? course[0].studentId : '',
    subject: course.length ? course[0].courseId : ''
  }));
}, [course]);

  const handleGradeChange = (e) => {
    setPassingData({
      ...passingData,
      grade: e.target.value
    });
  };
  const debug = () => {
    console.log(passingData);
  };

  

const handleEditGradeClick = (studentId) => {
  console.log('clicked student ID:', studentId);
  setIsEditingGrade(studentId);
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
        // If the update was successful, remove the score ID from the state
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
  };  return (
    <Modal open={true} onClose={onClose}>
      <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Edit Course</h3>
      </div>
      
      <table className="border-collapse table-auto w-full text-sm">
        <thead>
          <tr>
            <th className="px-4 py-2">
              Name
            </th>
            <th className="px-4 py-2">
              subjectname
            </th>
            <th className="px-4 py-2">
              Grade
            </th>
          </tr>
        </thead>
        <tbody>
          {course.map((item) => (
            <tr key={item.studentId} className="divide-y">

              <td className="px-4 py-2">
                {item.Std_name}
              </td>
              <td className="px-4 py-2">
  {item.Course_name}
</td>
<td className="px-4 py-2">
  {isEditingGrade === item.studentId ?(
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
        Save
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
     
</Modal>
);
};

export default CourseInfo;
