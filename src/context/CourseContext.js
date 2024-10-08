import React, { createContext, useContext, useReducer } from 'react';

const CourseContext = createContext();

const initialState = {
	courses: [],
	enrolledCourses: []
};

function courseReducer(state, action) {
	switch (action.type) {
		case 'SET_COURSES':
			return { ...state, courses: action.payload };
		case 'ENROLL_COURSE':
			return {
				...state,
				enrolledCourses: [...state.enrolledCourses, action.payload]
			};
		case 'UNENROLL_COURSE':
			return {
				...state,
				enrolledCourses: state.enrolledCourses.filter(
					(id) => id !== action.payload
				)
			};
		case 'ADD_COURSE':
			return { ...state, courses: [...state.courses, action.payload] };
		default:
			return state;
	}
}

export function CourseProvider({ children }) {
	const [state, dispatch] = useReducer(courseReducer, initialState);

	return (
		<CourseContext.Provider value={{ state, dispatch }}>
			{children}
		</CourseContext.Provider>
	);
}

export function useCourseContext() {
	return useContext(CourseContext);
}
