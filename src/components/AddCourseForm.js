import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useCourseContext } from '../context/CourseContext';

const schema = yup.object().shape({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
});

export default function AddCourseForm() {
  const { dispatch } = useCourseContext();
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    // Add new course to API
    fetch('/api/courses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(newCourse => {
        dispatch({ type: 'ADD_COURSE', payload: newCourse });
        reset();
      })
      .catch(error => console.error('Error adding course:', error));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Add New Course</h2>
      <div className="mb-4">
        <label htmlFor="title" className="block mb-2">Title</label>
        <input
          id="title"
          {...register('title')}
          className="w-full p-2 border rounded"
        />
        {errors.title && <span className="text-red-500">{errors.title.message}</span>}
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block mb-2">Description</label>
        <textarea
          id="description"
          {...register('description')}
          className="w-full p-2 border rounded"
        ></textarea>
        {errors.description && <span className="text-red-500">{errors.description.message}</span>}
      </div>
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
        Add Course
      </button>
    </form>
  );
}