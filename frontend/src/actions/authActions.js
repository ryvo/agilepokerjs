import AuthActionType from './authActionTypes';

export const login = (name) => ({
  type: AuthActionType.login,
  payload: name,
});

export const logout = () => ({
  type: AuthActionType.logout,
  payload: null,
});

export const getUser = () => ({
  type: AuthActionType.getUser,
  payload: null,
});