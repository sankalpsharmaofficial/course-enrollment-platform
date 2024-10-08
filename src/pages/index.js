import React from 'react';
import CourseList from '../components/CourseList';
import AddCourseForm from '../components/AddCourseForm';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Course Enrollment Platform</h1>
      <CourseList />
      <AddCourseForm />
    </div>
  );
}