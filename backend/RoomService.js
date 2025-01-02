import crypto from 'crypto';
import httpContext from 'express-http-context';

/**
 * Class responsible for managing rooms. A singleton.
 */
class RoomService {
  userRoomsMap = new Map();

  constructor() {
    if (RoomService.instance) {
      return RoomService.instance;
    }
    RoomService.instance = this;
  }

  getRoomsOfCurrentUser() {
    const user = httpContext.get('user');
    if (!user || !user.id) {
      return new Map();
    }
    let rooms = this.userRoomsMap.get(user.id);
    if (!rooms) {
      rooms = new Map();
      this.userRoomsMap.set(user.id, rooms);
    }
    return rooms;
  }

  get(id) {
    const room = this.getRoomsOfCurrentUser().get(id);
    if (room) {
      room.timeOfLastRequest = new Date();
    }
    return room;
  }

  getAll() {
    return this.getRoomsOfCurrentUser();
  }

  create(roomName) {
    const id = crypto.randomBytes(64).toString('hex');
    const ownerId = httpContext.get('user').id;
    const newRoom = {
      id,
      ownerId: ownerId,
      name: roomName,
      timeOfCreation: new Date(),
      timeOfLastRequest: new Date(),
    };
    this.getRoomsOfCurrentUser().set(id, newRoom);
    return newRoom;
  }

  delete(id) {
    this.getRoomsOfCurrentUser().delete(id);
  }
}

export default new RoomService();