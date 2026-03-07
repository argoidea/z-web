import { Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { AdminLogin } from './AdminLogin';
import { AdminLayout } from './AdminLayout';

export function AdminGate() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <AdminLogin />;
  }

  return (
    <AdminLayout />
  );
}
