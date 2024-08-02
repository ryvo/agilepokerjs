import express from 'express';
import { body, validationResult } from 'express-validator';
import cookieParser from "cookie-parser";
import { validationError, authorizationError } from './errors.js';
import userService from './UserService.js';

const app = express();
const COOKIE_USER_ID = 'userId';

const convertUserToDTO = (user) => {
  return {
    id: user.id,
    name: user.name,
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

app.use(cookieParser());
app.use(express.json());

/**
 * Returns data of user identified by cookie 'userId'. Or '401 Unauthorized' if valid userId is not supplied.
 */
app.get("/api/users", (req, res, next) => {
  const userId = req.cookies[COOKIE_USER_ID];
  if (userId) {
    const user = userService.get(userId);
    if (user) {
      res.send(convertUserToDTO(user));
      return;
    }
  }
  res.status(401).send(authorizationError());
})

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
    res.status(400).send(validationError(validation.array()));
    return;
  }
  const name = req.body.name;

  // If cookie 'userId' is present we will try to get the user
  const userId = req.cookies[COOKIE_USER_ID];
  let user = undefined;
  if (userId) {
    user = userService.get(userId);
  }
  if (user) {
    // If the user exists update his name
    user.name = name;
  } else {
    user = userService.create(name);
  }

  res.cookie(COOKIE_USER_ID, user.id, createUserIdCookieOptions()).send(convertUserToDTO(user));
})

/**
 * Deletes the user and returns status OK with empty response body.
 */
app.delete('/api/users', (req, res) => {
  const userId = req.cookies[COOKIE_USER_ID];
  if (!userId) {
    res.status(401).send(authorizationError());
    return
  }
  if (userId) {
    userService.delete(userId);
  }
  res.status(200).send();
})

const port = process.env.PORT || 3000;
app.listen(port, (error) => {
  if (error) {
    console.log(error);
  }
  console.log(`Server started and listening on port ${port}.`);
})
