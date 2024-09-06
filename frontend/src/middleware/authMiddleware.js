const authMiddleware = store => next => action => {
  if (action.error && action.error.response && action.error.response.status == 401) {
    if (window.location.href !== '/register') {
      window.location.href = '/register';
    }
  }
  return next(action);
};

export default authMiddleware;