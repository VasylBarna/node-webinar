const {
  registration,
  registrationConfirmation,
  forgotPassword,
  login,
} = require('../services/authService')

const registrationController = async (req, res) => {
  const { email, password } = req.body
  await registration(email, password)
  res.json({ status: 'succes' })
}

const registrationConfirmationController = async (req, res) => {
  const { code } = req.params
  await registrationConfirmation(code)
  res.json({ status: 'succes' })
}

const forgotPasswordController = async (req, res) => {
  const { email } = req.body
  await forgotPassword(email)
  res.json({ status: 'succes' })
}

const loginController = async (req, res) => {
  const { email, password } = req.body
  const token = await login(email, password)
  res.json({ status: 'succes', token })
}

module.exports = {
  registrationController,
  registrationConfirmationController,
  forgotPasswordController,
  loginController,
}
