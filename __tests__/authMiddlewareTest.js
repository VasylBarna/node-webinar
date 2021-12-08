/* eslint-disable no-undef */
const { authMiddleware } = require('../src/middlewares/authMiddleware')
const jwt = require('jsonwebtoken')
require('dotenv').config()

describe('Auth middleware test', () => {
  it('should call next() and add user and token properties to req object', () => {
    const user = {
      _id: '1',
      createdAt: new Date().getTime(),
    }
    const token = jwt.sign(
      { _id: user._id, createdAt: user.createdAt },
      process.env.JWT_SECRET
    )
    const mReq = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
    const mRes = {}
    const mockNext = jest.fn()

    authMiddleware(mReq, mRes, mockNext)

    expect(mReq.token).toEqual(token)
    expect(mReq.user._id).toEqual(user._id)
    expect(mReq.user.createdAt).toEqual(user.createdAt)
    expect(mockNext).toHaveBeenCalled()
  })
})
