import crypto from 'crypto';
import UserServiceError from './UserServiceError.js';

/**
 * Class responsible for managing users. A singleton.
 */
class UserService {
  users = new Map();

  constructor() {
    if (UserService.instance) {
      return UserService.instance;
    }
    UserService.instance = this;
  }

  get(id) {
    const user = this.users.get(id);
    if (user) {
      user.timeOfLastRequest = new Date();
    }
    return user;
  }

  create(name) {
    const id = crypto.randomBytes(64).toString('hex');
    const user = {
      id,
      name,
      timeOfCreation: new Date(),
      timeOfLastRequest: new Date(),
    };
    this.users.set(id, user);
    return user;
  }

  delete(id) {
    this.users.delete(id);
  }
}

export default new UserService();