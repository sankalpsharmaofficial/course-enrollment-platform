import React, { useEffect } from 'react';
import { useCourseContext } from '../context/CourseContext';

export default function CourseList() {
  const { state, dispatch } = useCourseContext();

  useEffect(() => {
    // Fetch courses from API
    fetch('/api/courses')
      .then(response => response.json())
      .then(data => dispatch({ type: 'SET_COURSES', payload: data }))
      .catch(error => console.error('Error fetching courses:', error));
  }, []);

  const handleEnroll = (courseId) => {
    if (state.enrolledCourses.includes(courseId)) {
      dispatch({ type: 'UNENROLL_COURSE', payload: courseId });
    } else {
      dispatch({ type: 'ENROLL_COURSE', payload: courseId });
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {state.courses.map(course => (
        <div key={course.id} className="border p-4 rounded shadow">
          <h2 className="text-xl font-bold">{course.title}</h2>
          <p className="mt-2">{course.description}</p>
          <button
            onClick={() => handleEnroll(course.id)}
            className={`mt-4 px-4 py-2 rounded ${
              state.enrolledCourses.includes(course.id)
                ? 'bg-red-500 text-white'
                : 'bg-blue-500 text-white'
            }`}
          >
            {state.enrolledCourses.includes(course.id) ? 'Unenroll' : 'Enroll'}
          </button>
          {state.enrolledCourses.includes(course.id) && (
            <span className="ml-2 text-green-500">Enrolled</span>
          )}
        </div>
      ))}
    </div>
  );
}