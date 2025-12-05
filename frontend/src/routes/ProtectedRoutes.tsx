import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const PrivateRoute = () => {
    const { user, isLoading } = useAuth();

    if (isLoading) {
        return <div>Loading...</div>;
    }
    return user ? <Outlet /> : <Navigate to="/login" replace />;
}

export const RoleRoute = ({ allowedRoles }: { allowedRoles: string[] }) => {
    const { user, isLoading, hasRole } = useAuth();
    if (isLoading) {
        return <div>Loading...</div>;
    }
    return hasRole(allowedRoles) ? <Outlet /> : <Navigate to="/unauthorized" replace />;
}

export const PublicOnlyRoute = () => {
    const { user, isLoading } = useAuth();
    if (isLoading) {
        return <div>Loading...</div>;
    }
    return user ? <Navigate to="/dashboard" replace /> : <Outlet />;
}