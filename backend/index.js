import express from 'express';
import httpContext from 'express-http-context';
import { body, validationResult } from 'express-validator';
import cookieParser from "cookie-parser";
import { validationError, authorizationError } from './errors.js';
import userService from './UserService.js';
import roomService from './RoomService.js';

const USER_ID = 'User-Id';
const ROOM_LIST = [
  {
    id: 1,
    name: 'Room 1',
    lastUsedDateTime: '2024-08-07T09:50:41.000'
  },
  {
    id: 2,
    name: 'Room 2',
    lastUsedDateTime: '2024-08-07T09:50:42.000'
  }
]

const convertUserToDTO = (user) => {
  return {
    id: user.id,
    name: user.name,
  }
}

const convertRoomToDTO = (room) => {
  return {
    id: room.id,
    name: room.name,
    lastUsedDateTime: room.lastUsedDateTime
  }
}
const createUserIdCookieOptions = () => {
  const expiryDate = new Date();
  expiryDate.setFullYear(expiryDate.getFullYear() + 10);

  return {
    expires: expiryDate,
    httpOnly: true,
    secure: false,
  }
}

const checkAuth = (res) => {
  const user = httpContext.get('user');
  if (!user) {
    res.status(401).json(authorizationError());
    return false;
  }
  return true;
}

const app = express();
//app.use(cookieParser());
app.use(express.json());
app.use(httpContext.middleware);
app.use((req, res, next) => {
  const userId = req.header(USER_ID);
  if (userId) {
    const user = userService.get(userId);
    if (user) {
      httpContext.set('user', user)
    }
  }
  next();
});

/**
 * Returns data of user identified by cookie 'userId'. Or '401 Unauthorized' if valid userId is not supplied.
 */
app.get("/api/users/current-user", (req, res, next) => {
  const user = httpContext.get('user');
  if (!user) {
    res.status(401).json(authorizationError());
    return;
  }
  res.json(convertUserToDTO(user));
});

/**
 * Creates a new user, sets cookie 'userId' and returns data of the user.
 * If the request contains cookie 'userId' with valid user id, then updates name of the existing user and returns data
 * of that user.
 */
app.post("/api/users",
    body('name').isString().withMessage(`users.invalidUserName`).bail().trim().notEmpty().withMessage(`users.invalidUserName`),
    (req, res, next) => {

  // Process validation result of the request
  const validation = validationResult(req);
  if (!validation.isEmpty()) {
    res.status(400).json(validationError(validation.array()));
    return;
  }
  const name = req.body.name;

  // If cookie 'userId' is present we will try to get the user
  // const userId = req.cookies[USER_ID];
  // const userId = req.body[USER_ID];
  const userId = req.header(USER_ID);
  let user = undefined;
  if (userId) {
    user = userService.get(userId);
  }
  if (user) {
    // If the user exists update its name
    user.name = name;
  } else {
    user = userService.create(name);
  }

  // res.cookie(USER_ID, user.id, createUserIdCookieOptions()).send(convertUserToDTO(user));
  res.json(convertUserToDTO(user));
  return user;
})

/**
 * Deletes the user and returns status OK with empty response body.
 */
app.delete('/api/users', (req, res) => {
  const user = httpContext.get('user');
  if (!user) {
    res.status(401).json(authorizationError());
    return;
  }
  userService.delete(user.id);
  res.status(200).json();
})

app.get('/api/rooms', (req, res) => {
  const user = httpContext.get('user');
  if (!user) {
    res.status(401).json(authorizationError());
    return;
  }
  res.json(Array.from(roomService.getAll()).map(([key, value]) => convertRoomToDTO(value)));
})

app.post('/api/rooms', (req, res) => {
  if(!checkAuth(res)) {
    return;
  }
  const room = roomService.create(req.body.name);
  res.json(convertRoomToDTO(room));
})

const port = process.env.PORT || 3000;
app.listen(port, (error) => {
  if (error) {
    console.log(error);
  }
  console.log(`Server started and listening on port ${port}.`);
})
