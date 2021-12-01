const { registration, login } = require('../services/authService')

const registrationController = async (req, res) => {
  const { email, password } = req.body
  await registration(email, password)
  res.json({ status: 'succes' })
}

const loginController = async (req, res) => {
  const { email, password } = req.body
  const token = await login(email, password)
  res.json({ status: 'succes', token })
}

module.exports = { registrationController, loginController }
