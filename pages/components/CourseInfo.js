import {useState, useEffect} from 'react'
import Modal from './Modal'

const CourseInfo = ({courseId, onEdit, onClose, handleEditCourseSuccess}) => {
  const [newCourseId, setNewCourseId] = useState(courseId);
  const [course, setCourse] = useState(null);
  const [editingScoreId, setEditingScoreId] = useState(null);
  const [newScore, setNewScore] = useState('');
  
  useEffect(() => {
    async function fetchCourse() {
      const res = await fetch(`http://localhost:8000/grades/${courseId}`);
      const data = await res.json();
      setCourse(data);
    }
    fetchCourse();
  }, [courseId]);
  
  const [isEditing, setIsEditing] = useState(false);

  function handleEdit() {
    // Code to handle editing the course
    setIsEditing(true);
  }
  
  if (!course) {
    return <div>Loading...</div>
  }

  const handleScoreClick = (scoreId) => {
    setEditingScoreId(scoreId);
  };

  const handleSaveClick = async (scoreId, newScore) => {
    try {
      const response = await fetch(`http://localhost:8000/grades/upload`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          grade: newScore,
          owner: course.studentId,
          subject: course.courseId,
        }),
      });

      if (response.ok) {
        // If the update was successful, remove the score ID from the state
        setEditingScoreId(null);
        handleEditCourseSuccess();
      } else {
        console.error('Failed to update score');
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
      <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <div className="sm:flex sm:items-start">
          
          <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
            <h3
              className="text-lg leading-6 font-medium text-gray-900"
              id="modal-title"
            >
              Edit Course
            </h3>
            <div className="mt-2">
              {/*code here*/}
             <div className="score-list">
      {course.map((score) => (
        <div key={score.studentId} className="score-list-item">
          <div className="score-list-item-header" onClick={() => handleScoreClick(score.studentId)}>
            <div>{score.Std_name}</div>
            <div>{score.score}</div>
          </div>
          {editingScoreId === score.studentId && (
            <div className="score-list-item-edit">
              <input type="text" defaultValue={score.score} onChange={(e) => setNewScore(e.target.value)} />
              <button onClick={() => handleSaveClick(score.studentId, newScore)}>Save</button>
            </div>
          )}
        </div>
      ))}
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
          Update Course 
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
  )
}
export default CourseInfo

