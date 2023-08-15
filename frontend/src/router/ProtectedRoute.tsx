import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux';


const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
    const isAuthenticated = useAppSelector(state => state.auth.user.isAuthenticated)
    if (!isAuthenticated && !import.meta.env.VITE_ACCESS) {
        return <Navigate to='/auth/login' />
    }
    return children
}
export default ProtectedRoute;