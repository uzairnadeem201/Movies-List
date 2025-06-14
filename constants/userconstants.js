const UserConstants = Object.freeze({
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 50,
  EMAIL_MIN_LENGTH: 5,
  EMAIL_MAX_LENGTH: 255,
  PASSWORD_MIN_LENGTH: 8,
  PASSWORD_MAX_LENGTH: 128,

  REGEX: {
    NAME: /^[a-zA-Z\s-]+$/,
    EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    PASSWORD_COMPLEXITY: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"|,.<>\/?`~]).*$/
  },

  ERRORS: {
    MISSING_FIELDS: "Name, email, and password are required.",
    INVALID_STRING_FIELDS: "Name, email, and password must be strings.",
    INVALID_NAME_LENGTH: (min, max) => `Name must be between ${min} and ${max} characters.`,
    INVALID_NAME_FORMAT: "Name can only contain letters, spaces, and hyphens.",
    INVALID_EMAIL_LENGTH: (min, max) => `Email must be between ${min} and ${max} characters.`,
    INVALID_EMAIL_FORMAT: "Please enter a valid email address.",
    INVALID_PASSWORD_LENGTH: (min, max) => `Password must be between ${min} and ${max} characters.`,
    INVALID_PASSWORD_FORMAT: "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character.",
    SIGNUP_FAILED: "Signup failed",
    PASSWORD_HASHING_FAILED: "Password Hasing Failed",
    EXISTING_USER: "Email Already Exists",
    NOT_EXISTING_USER: "User Email or Password is not valid ",
    FAILED_TO_CREATE_USER: "FAILED TO CREATE USER",
  }
});

export default UserConstants;
