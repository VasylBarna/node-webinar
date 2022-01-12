const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const sgMail = require('@sendgrid/mail')
const sha256 = require('sha256')
const { User } = require('../db/userModel')
const { Verification } = require('../db/verificationModel')
const { NotAutorizedError } = require('../helpers/errors')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const registration = async (email, password) => {
  const user = new User({
    email,
    password,
  })
  await user.save()

  const code = sha256(email + process.env.JWT_SECRET)
  const verification = new Verification({
    code,
    userId: user._id,
  })

  await verification.save()

  const msg = {
    to: email, // Change to your recipient
    from: 'gomate@meta.ua', // Change to your verified sender
    subject: 'Thank you for registration!',
    text: `Please, confirm your email address POST http://localhost:8083/api/auth/registration_confirmation/${code}`,
    html: `Please, <a href="http://localhost:8083/api/auth/registration_confirmation/${code}">confirm </a>your email address`,
  }
  await sgMail.send(msg)
}

const registrationConfirmation = async (code) => {
  const verification = await Verification.findOne({
    code,
    active: true,
  })
  if (!verification) {
    throw new NotAutorizedError('Invalid or expired confirmation code')
  }
  const user = await User.findById(verification.userId)
  if (!user) {
    throw new NotAutorizedError('INo user found')
  }

  verification.active = false
  await verification.save()

  user.confirmed = true
  await user.save()

  const msg = {
    to: user.email, // Change to your recipient
    from: 'gomate@meta.ua', // Change to your verified sender
    subject: 'Thank you for registration!',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<h1>and easy to do anywhere, even with Node.js</h1>',
  }
  await sgMail.send(msg)
}
const login = async (email, password) => {
  const user = await User.findOne({ email, confirmed: true })
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

const forgotPassword = async (email) => {
  const user = await User.findOne({ email, confirmed: true })
  if (!user) {
    throw new NotAutorizedError(`No user with email '${email}' found`)
  }
  const password = sha256(Date.now() + process.env.JWT_SECRET)
  user.password = password
  await user.save()

  const msg = {
    to: user.email, // Change to your recipient
    from: 'gomate@meta.ua', // Change to your verified sender
    subject: 'Forgot password!',
    text: `Here is your temporary password: ${password}`,
    html: `Here is your temporary password: ${password}`,
  }
  await sgMail.send(msg)
}

module.exports = {
  registration,
  registrationConfirmation,
  forgotPassword,
  login,
}
