import LocalStorageService from '../service/LocalStorageService';

const authMiddleware = store => next => action => {
  if (action.error && action.error.response && action.error.response.status === 401) {
    LocalStorageService.unsetCurrentUser();
    if (window.location.href !== '/registration') {
      window.location.href = '/registration';
    }
  }
  return next(action);
};

export default authMiddleware;