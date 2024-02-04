import { useAuthCheck } from '@/hooks/useAuthCheck';
import { Navigate, Outlet } from 'react-router-dom';

export default function PrivateRoute() {
    const isLogin = useAuthCheck();
    return isLogin ? <Outlet /> : <Navigate to="/" />;
}
