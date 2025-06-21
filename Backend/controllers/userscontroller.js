import UserManager from "../managers/usersmanager.js";
class UsersController {  
  static async signup(req, res, next) {
    try {
      const result = await UserManager.signup(req.body);
      res.status(201).json(result);
    } catch (err) {
      console.error('Signup Error:', err);

      res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || 'Signup failed',
      });
    }
  }
  static async login(req,res){
    try{
      const result = await UserManager.login(req.body);
      res.status(201).json(result);

    }
    catch(err){
      console.error('login Error:', err);

      res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || 'login failed',
      });
    }
  }
  static async me(req,res){
    try{
      const result = await UserManager.me(req);
      res.status(201).json(result);

    }
    catch(err){
      console.error('User Info Error:', err);

      res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || 'User Info failed',
      });
    }
  }
}

export default UsersController;


