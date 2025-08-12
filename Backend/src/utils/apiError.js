class ApiError extends Error {
  constructor(statusCode, message, stack = '') {
    super(message);                      // Use built-in Error behavior (shows message)
    this.statusCode = statusCode;       // Store the error code (e.g., 404, 500)

    // Set the error stack trace
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

module.exports=ApiError;