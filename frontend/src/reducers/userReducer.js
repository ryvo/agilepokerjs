import UserActionType from '../actions/userActionTypes';
import axios from 'axios';

const initialState = {
  user: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case UserActionType.register:
      axios.post('/api/users')
        .then(response => {
          console.log(response);
        })
      return {
        ...state,
        user: action.payload,
      }
    default:
      return state;
  }
}

export default userReducer;