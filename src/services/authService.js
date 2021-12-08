const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { User } = require('../db/userModel')
const { NotAutorizedError } = require('../helpers/errors')

const registration = async (email, password) => {
  const user = new User({
    email,
    password,
  })
  await user.save()
}

const login = async (email, password) => {
  const user = await User.findOne({ email })
  if (!user) {
    throw new NotAutorizedError(`No user with email '${email}' found`)
  }
  if (!(await bcrypt.compare(password, user.password))) {
    throw new NotAutorizedError('Wrong password')
  }
  const token = jwt.sign(
    { _id: user._id, createdAt: user.createdAt },
    process.env.JWT_SECRET
  )
  return token
}

module.exports = {
  registration,
  login,
}
