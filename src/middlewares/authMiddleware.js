const jwt = require('jsonwebtoken')
const { NotAutorizedError } = require('../helpers/errors')

const authMiddleware = (req, res, next) => {
  try {
    // TODO: validate token type later
    const { authorization } = req.headers
    if (!authorization) {
      next(
        new NotAutorizedError(
          'Please, provide a token in request authorization header'
        )
      )
    }
    const [, token] = authorization.split(' ')
    if (!token) {
      next(new NotAutorizedError('Please, provide a token'))
    }
    const user = jwt.decode(token, process.env.JWT_SECRET)
    req.token = token
    req.user = user
    next()
  } catch (err) {
    next(new NotAutorizedError('Invalid token'))
  }
}

module.exports = { authMiddleware }
