import AuthActionType from './authActionTypes';
import axios from 'axios';

const initialState = {
  user: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AuthActionType.getUser:
      axios.get('/api/')
    case 'LOGIN':
      return {
        ...state,
        user: action.payload,
      }
    case 'LOGOUT':
      return {
        ...state,
        user: null,
      }
    default:
      return state;
  }
}

export default authReducer;