import AppError from "../utils/apperror.js";
import UserConstants from "../constants/userconstants.js";

const validateUserLogin = async (user) => {
    const {
        PASSWORD_MIN_LENGTH,
        PASSWORD_MAX_LENGTH,
        REGEX,
        ERRORS
    } = UserConstants;
    user.email = user.email.trim();
    user.password = user.password.trim();

    if (!user || !user.password || !user.email) {
        throw new AppError(ERRORS.MISSING_FIELDS, 400);
    }

    if (!REGEX.EMAIL.test(user.email)) {
        throw new AppError(ERRORS.INVALID_EMAIL_FORMAT, 400);
    }

    if (user.password.length < PASSWORD_MIN_LENGTH || user.password.length > PASSWORD_MAX_LENGTH) {
        throw new AppError(ERRORS.INVALID_PASSWORD_LENGTH(PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH), 400);
    }

    if (!REGEX.PASSWORD_COMPLEXITY.test(user.password)) {
        throw new AppError(ERRORS.INVALID_PASSWORD_FORMAT, 400);
    }

    console.log("User Login request validated successfully.");
};

export default validateUserLogin;