import UserHandler from '../handlers/userhandler.js';
import hashPassword from '../utils/hashpassword.js';
import validateUserSignupRequest from '../utils/validateUserSignupRequest.js';
import validateUserLogin from '../utils/validateUserLogin.js';
import AppError from '../utils/apperror.js';
import UserConstants from "../constants/userconstants.js"
import isPasswordHashMatch from '../utils/verifyHashPassword.js';
import generateToken from '../utils/generateJWTToken.js';
class UserManager {
  static async signup(user) {
    validateUserSignupRequest(user);
    let { name, email, password} = user;
    name = name.trim();
    email = email.toLowerCase().trim();
    password= password.trim();
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
  static async login(user) {
  await validateUserLogin(user);

  let { email, password } = user;
  email = email.toLowerCase().trim();
  password = password.trim();

  const existingUser = await UserHandler.existingUser(email);
  console.log(existingUser);
  if (!existingUser) {
    throw new AppError(UserConstants.ERRORS.NOT_EXISTING_USER, 400);
  }

  const isPassword = await isPasswordHashMatch(password, existingUser.password);
  if (!isPassword) {
    throw new AppError(UserConstants.ERRORS.NOT_EXISTING_USER, 400);
  }
  const jwtToken = generateToken(existingUser.id, existingUser.email, existingUser.name);

  return {
    message: "Login successful",
    token: jwtToken,
    user: {
      id: existingUser.id,
      name: existingUser.name,
      email: existingUser.email,
    }
  };
}

}

export default UserManager;
