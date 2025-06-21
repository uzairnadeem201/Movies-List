import AppError from "./apperror.js";
import UserConstants from "../constants/userconstants.js";

const validateUserSignupRequest = async (user) => {
    const {
        NAME_MIN_LENGTH,
        NAME_MAX_LENGTH,
        EMAIL_MIN_LENGTH,
        EMAIL_MAX_LENGTH,
        PASSWORD_MIN_LENGTH,
        PASSWORD_MAX_LENGTH,
        REGEX,
        ERRORS
    } = UserConstants;

    if (!user || !user.name || !user.password || !user.email) {
        throw new AppError(ERRORS.MISSING_FIELDS, 400);
    }
    user.name = user.name.trim();
    user.email = user.email.trim();
    user.password = user.password.trim();

    if (typeof user.name !== 'string' || typeof user.email !== 'string' || typeof user.password !== 'string') {
        throw new AppError(ERRORS.INVALID_STRING_FIELDS, 400);
    }

    if (user.name.length < NAME_MIN_LENGTH || user.name.length > NAME_MAX_LENGTH) {
        throw new AppError(ERRORS.INVALID_NAME_LENGTH(NAME_MIN_LENGTH, NAME_MAX_LENGTH), 400);
    }

    if (!REGEX.NAME.test(user.name)) {
        throw new AppError(ERRORS.INVALID_NAME_FORMAT, 400);
    }

    if (user.email.length < EMAIL_MIN_LENGTH || user.email.length > EMAIL_MAX_LENGTH) {
        throw new AppError(ERRORS.INVALID_EMAIL_LENGTH(EMAIL_MIN_LENGTH, EMAIL_MAX_LENGTH), 400);
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

    console.log("User signup request validated successfully.");
};

export default validateUserSignupRequest;

