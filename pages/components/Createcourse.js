import React, { useState } from 'react';
import Modal from '../components/Modal';

function CreateCourse() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    course_id: '',
    course_name: '',
    section: '',
    credit: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreate = (e) => {
    e.preventDefault();
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:8000/createCourse', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
    setFormData({
      course_id: '',
      course_name: '',
      section: '',
      credit: '',
    });
    handleClose();
  };

  return (
    <Modal open={isOpen} onClose={handleClose}>
    <div>
      <h1>Create Course</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Course ID:</label>
          <input
            type="text"
            name="course_id"
            value={formData.course_id}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Course Name:</label>
          <input
            type="text"
            name="course_name"
            value={formData.course_name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Section:</label>
          <input
            type="text"
            name="section"
            value={formData.section}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Credit:</label>
          <input
            type="text"
            name="credit"
            value={formData.credit}
            onChange={handleChange}
          />
        </div>
        <button onClick={handleCreate}>Create Course</button>
        <Modal open={isOpen} onClose={handleClose}>
          <h1>Confirm Course Creation</h1>
          <p>
            Course ID: {formData.course_id}
            <br />
            Course Name: {formData.course_name}
            <br />
            Section: {formData.section}
            <br />
            Credit: {formData.credit}
          </p>
          <button type="submit">Confirm</button>
          <button onClick={handleClose}>Cancel</button>
        </Modal>
      </form>
    </div>
  </Modal>
  );
}

export default CreateCourse;
