import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux';


const StudentProtectedRoute: React.FC<{ children: JSX.Element, }> = ({ children }) => {
    const student = useAppSelector(state => state.student.student_payload)
    const user = useAppSelector(state => state.auth.user)
    if ((!student && !user.isStudent) && !import.meta.env.VITE_ACCESS) {
        return <Navigate to='/dashboard/profile/edit#student-form' />
    }
    return children
}
export default StudentProtectedRoute;