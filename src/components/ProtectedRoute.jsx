import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ allowedRoles }) => {
    const { loading, isAuthenticated, profile } = useAuth();

    if (loading) {
        return <div className="loading">Chargement...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles?.length && !allowedRoles.includes(profile?.type)) {
        const fallbackPath = profile?.type === 'creator' ? '/creator-dashboard' : '/admin-dashboard';
        return <Navigate to={fallbackPath} replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
