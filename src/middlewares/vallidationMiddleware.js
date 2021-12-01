const Joi = require('joi')
const { ValidationError } = require('../helpers/errors')

module.exports = {
  addPostVallidation: (req, res, next) => {
    const schema = Joi.object({
      topic: Joi.string().alphanum().min(3).max(30).required(),
      text: Joi.string().min(5).max(300).required(),
    })
    const validateResult = schema.validate(req.body)
    if (validateResult.error) {
      next(new ValidationError(JSON.stringify(validateResult.error.details)))
    }
    next()
  },
}
