class ValidationError extends Error {
  constructor(message) {
    super(message)
    this.status = 400
  }
}

class WrongParametersError extends Error {
  constructor(message) {
    super(message)
    this.status = 400
  }
}

class NotAutorizedError extends Error {
  constructor(message) {
    super(message)
    this.status = 401
  }
}

module.exports = { ValidationError, WrongParametersError, NotAutorizedError }
