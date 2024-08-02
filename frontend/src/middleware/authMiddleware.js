import { logout } from './authActions';

const authMiddleware = ({ dispatch }) => next => action => {
  if (action.error && action.error.response && action.error.response.status == 401) {
    dispatch(logout());
    window.location.href = '/register';
  }
  return next(action);
};

export default authMiddleware;