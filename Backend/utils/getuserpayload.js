// utils/verifyJWT.js
import jwt from 'jsonwebtoken';
import AppError from './apperror.js';
import UserConstants from '../constants/userconstants.js';

const getUserPayload = (token) => {
  if (!token) {
    throw new AppError(UserConstants.ERRORS.NO_TOKEN || "No token provided.", 401);
  }

  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new AppError(UserConstants.ERRORS.INVALID_TOKEN || "Invalid token.", 403);
  }
};

export default getUserPayload;
