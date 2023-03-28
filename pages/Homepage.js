import React ,{useState,useEffect} from 'react';

import ContentCard from './components/ContentCard';
import Table from './components/Table';
import Modal from './components/Modal'
import Menu from './components/menu';

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


  return (
    <div className="container mx-auto">  
      <Menu />
      <Table data={Courses} />
    </div>
  );
}
export default Homepage;
