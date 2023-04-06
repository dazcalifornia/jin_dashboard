import React,{
  useState,
  useEffect,
  } from 'react';

const Refactor = () => {
  //get course data from api
  const [courses, setCourses] = useState([]);
  const [getSection, setGetsection] = useState([]);
  const fetchCourses = async () => {
    try {
      const res = await fetch('http://localhost:8000/course');
      const data = await res.json();
      setCourses(data);
    }
    catch (err) {
      console.log(err);
    }

  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div>
      <h1>Refactor</h1>
      <ul>
        {courses.map((course) => (
          <div key={course.course_id}>
            <li>{course.course_id}</li>
            <li>{course.course_name}</li>
            <li>{course.course_credit}</li>
            <button 
              className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
              onClick={() => {
                fetch(`http://localhost:8000/grades/${course.course_id}`, {
                  method: 'GET',
                })
                  .then((res) => res.json())
                  .then((data) => {
                    setGetsection(data)
                    console.log(data);//section 
                  });
              }}
            >
              info
            </button>
            {getSection.map((section) => (
              <div key={section.Section}>
                <li>{section.Section}</li>
              </div>
            ))}
            <br />
          </div>
        ))}
      </ul>

    </div>

  );
};
export default Refactor;
