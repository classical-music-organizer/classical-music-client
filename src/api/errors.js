class ApiError extends Error {
  constructor(type = 'api_error', code = 500, message = 'An error occurred.', param) {
    super(message)

    this.type = type
    this.code = code
    this.message = message
    this.param = param
  }

  toJson() {
    const {type, code, message, param} = this

    return {
      type,
      code,
      message,
      param
    }
  }
}

// uses error data from the response to create an ApiError
const parseError = err => {
  if (!err.response || !err.response.data) return err // Unknown error - pass it forward :\
  const {type, code, message, param} = err.response.data

  return new ApiError(type, code, message, param)
}

// default error handler for api requests; passes the error on to the caller
const handleError = err => {
  throw parseError(err)
}

export {
  parseError,
  handleError,
  ApiError
}