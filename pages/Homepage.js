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
  const data = await response.json().then((data) => {
    setCourses(data);
      console.log(data);
    });
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
