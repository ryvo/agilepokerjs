import RoomActionType from '../actions/roomActionTypes';
import backendAxios from '../api/backendAxios';

const initialState = {
  roomList: [],
};

const roomReducer = (state = initialState, action) => {
  switch (action.type) {
    case RoomActionType.getRoomList:
      backendAxios
          .get('/rooms')
          .then((response) => {

          });
    default:
      return state;
  }
}

export default roomReducer;