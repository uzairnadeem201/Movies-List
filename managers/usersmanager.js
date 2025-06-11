import UserHandler from '../handlers/userhandler.js';
import hashPassword from '../utils/hashpassword.js';
import validateUserSignupRequest from '../utils/validateUserSignupRequest.js';
import AppError from '../utils/apperror.js';
import UserConstants from "../constants/userconstants.js"
class UserManager {
  static async signup(user) {
    validateUserSignupRequest(user);
    const { name, email, password} = user;
    const existingUser = await UserHandler.existingUser(email);
    if (existingUser){
        throw new AppError(UserConstants.ERRORS.EXISTING_USER,400);
    }
    const hashedPassword = await hashPassword(password);
    const newUser = await UserHandler.signup(name,email,hashedPassword);
    if (!newUser){
        throw new AppError(UserConstants.ERRORS.FAILED_TO_CREATE_USER,400);
    }
    return newUser;
}
}

export default UserManager;
