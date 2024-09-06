import UserActionType from './userActionTypes';

export const registerUserAction = (name) => ({
  type: UserActionType.register,
  payload: name,
});
