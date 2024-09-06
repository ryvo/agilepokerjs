import { fetchRoomList } from '../slices/roomSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

export default function RoomList() {
  const dispatch = useDispatch();
  const rooms = useSelector((state) => state.room?.rooms)

  useEffect(() => {
    dispatch(fetchRoomList());
  }, [dispatch]);

  return (
      <div>
        <h2>Room list</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Created</th>
            </tr>
          </thead>
          <tbody>
          {rooms?.map((room) => (
              <tr>
                <td>room.name</td>
                <td>room.creationTime</td>
              </tr>
          ))}
          </tbody>
        </table>
      </div>
  );
}