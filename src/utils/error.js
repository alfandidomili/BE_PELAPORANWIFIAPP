// class CustomError extends Error {
//    constructor(key, message, status) {
//       super(message);
//       this.name = this.constructor.name;
//       this.key = key;
//       this.status = status;
//       Error.captureStackTrace(this, this.constructor);
//    }
// }

// class ValidationError extends CustomError {
//    constructor(errors) {
//       super("validation_error", "Validation failed", 422);
//       this.errors = errors;
//    }
// }

// export {CustomError, ValidationError}

// utils/errorHandler.js
class CustomError extends Error {
   constructor(status, message, errors) {
      super(message);
      this.status = status;
      this.errors = errors;
   }
}

export { CustomError };

export const createError = (status, message, errors = []) => {
   return new CustomError(status, message, errors);
};
