import bcrypt from "bcryptjs";
import UserConstants from "../constants/userconstants.js";
import AppError from "./apperror.js";
const hashPassword = async(Password) =>{
        const salt = 10;
        const hashedPassword = await bcrypt.hash(Password, salt);
        if(hashedPassword){
            return hashedPassword;
        }
        
        throw new AppError(UserConstants.ERRORS.PASSWORD_HASHING_FAILED, 400);

}
export default hashPassword