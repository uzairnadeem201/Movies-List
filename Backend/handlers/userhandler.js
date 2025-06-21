import User from '../models/userModel.js';

class UserHandler {
  static async existingUser(email){
    const existingUser = await User.findOne({ email });
    return existingUser;

  }
  static async signup(name, email, hashedPassword) {
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return {
      message: "User registered successfully",
      userId: newUser._id,
      name: newUser.name,
      email: newUser.email,
    };
  }
}

export default UserHandler;
