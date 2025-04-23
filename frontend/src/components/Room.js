import { useParams } from 'react-router';
import Stories from './Stories';

const Room = () => {
  const { id } = useParams();
  return (
    <>
      <div>Room name {id}</div>
      <div>Room stories</div>
      <Stories />
    </>
  );
}

export default Room;