import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth'; // Assuming you have an auth hook

interface DashboardLayoutProps {
    children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
    const { user } = useAuth(); // Replace with your actual auth check logic

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div className="flex flex-col min-h-screen">
            {children}
        </div>
    );
};

export default DashboardLayout;