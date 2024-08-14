class ApiError extends Error {
  status: number;
  errors: unknown;
  constructor(status: number, message: string, errors = {}) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  public static BadRequest(message: string, errors = {}) {
    return new ApiError(400, message, errors);
  }

  public static Unauthorized(message = 'Unauthorized') {
    return new ApiError(401, message);
  }
}

export { ApiError };
