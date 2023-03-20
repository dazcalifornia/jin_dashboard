import React ,{useState,useEffect} from 'react';

import ContentCard from './components/ContentCard';
import Table from './components/Table';
import Modal from './components/Modal'

const Homepage = () => {
  const [Courses, setCourses] = useState([]);
  

  //modal Part
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }


  const getCourses = async () => {
    const response = await fetch('http://localhost:8000/course');
    const data = await response.json().then((data) => {
      console.log(data);
    });
    setCourses(data);
  }

  useEffect(() => {
    getCourses();
  }, []);


  const data = [
    { id: 1, name: 'John Doe', email: 'johndoe@example.com' },
    { id: 2, name: 'Jane Smith', email: 'janesmith@example.com' },
    { id: 3, name: 'Bob Johnson', email: 'bobjohnson@example.com' },
  ]
  return (
    <div className="container mx-auto">
      <button onClick={handleOpenModal}>Open Modal</button>
      <Modal />
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <h2 className="text-lg font-medium mb-4">Modal Title</h2>
        <p className="text-gray-600">Modal Content Goes Here</p>
        <li className="text-gray-600">Modal Content Goes Here</li>
        <from className="text-gray-600">
          <label>Course Name</label>
          <input type="text" name="courseName" />
          <label>Course Description</label>
          <input type="text" name="courseDescription" />
          <label>Course Price</label>
          <input type="text" name="coursePrice" />
          <label>Course Image</label>
          <input type="text" name="courseImage" />
          <label>Course Category</label>
          <input type="text" name="courseCategory" />
          <label>Course Rating</label>
          <input type="text" name="courseRating" />
          <label>Course Instructor</label>
          <input type="text" name="courseInstructor" />
          <button type="submit">Submit</button>
        </from>
      </Modal>
      <Table data={data} />
      <ContentCard
        title="My Title"
        image="https://source.unsplash.com/random"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis magna velit. Duis ac posuere magna, vel feugiat nibh."
      />
    </div>
  );
}
export default Homepage;
