class ApiResponse {
  constructor(statusCode, message, data = null) {
    this.statusCode = statusCode;
    this.success = statusCode < 400; // Automatically true if status is below 400
    this.message = message;
    this.data = data;
  }
}

module.exports=ApiResponse;