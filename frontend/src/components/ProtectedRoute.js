import { Navigate } from 'react-router';
import LocalStorageService from '../service/LocalStorageService';

export default function ProtectedRoute({children}) {
  if (!LocalStorageService.isCurrentUserSet()) {
    return <Navigate to="/registration" replace />
  }
  return children;
}