import React ,{useState,useEffect} from 'react';

import ContentCard from './components/ContentCard';
import Table from './components/Table';
import Modal from './components/Modal'
import Menu from './components/menu';
import Toast from './components/Toast';


const Homepage = () => {
  const [Courses, setCourses] = useState([]);
  
  const getCourses = async () => {
  const response = await fetch('http://localhost:8000/course');
  const data = await response.json();

  // loop through each course and call getSections for each course_id
  for (const course of data) {
    const sectionsResponse = await fetch(`http://localhost:8000/grades/${course.course_id}`);
    const sections = await sectionsResponse.json();
    course.sections = sections;
  }
  setCourses(data);
    console.log(data);
};

 //getSection function and add data to Courses array
  const getSections = async (id) => {
    console.log("id",id);
    const response = await fetch(`http://localhost:8000/grades/${id}`);
    const data = await response.json().then((data) => {
      setCourses(Courses.map((course) => {
        course.sections = data.filter((section) => section.course_id === course.id);
        return course;
      }));
    }).catch((error) => {
      console.log(error);
    })
  }

  useEffect(() => {
    getCourses();
  }, []);
  const [showToast, setShowToast] = useState(false);

  const handleEditCourseSuccess = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000); // hide the toast after 3 seconds
    getCourses();
  };

  return (
    <div className="container mx-auto">  
      <Menu />
      <Table data={Courses} handleEditCourseSuccess={handleEditCourseSuccess}/>
      {showToast && (
        
        <Toast className="animate-fade" message="Course edited successfully" />

      )}
    </div>
  );
}
export default Homepage;
