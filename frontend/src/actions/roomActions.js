import RoomActionType from './roomActionTypes';

export const getRoomList = (name) => ({
  type: RoomActionType.getRoomList,
  payload: name,
});
