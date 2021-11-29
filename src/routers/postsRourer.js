const express = require('express')
const router = new express.Router()

const { addPostVallidation } = require('../middlewares/vallidationMiddleware')

const { asyncWrapper } = require('../helpers/apiHelpers')

const modelsMiddleware = require('../middlewares/models')

const {
  getPosts,
  getPostsById,
  addPost,
  changePost,
  deletePost,
} = require('../controllers/postsController')

router.use(modelsMiddleware)

router.get('/', asyncWrapper(getPosts))

router.get('/:id', asyncWrapper(getPostsById))

router.post('/', addPostVallidation, asyncWrapper(addPost))

router.put('/:id', addPostVallidation, asyncWrapper(changePost))

router.delete('/:id', asyncWrapper(deletePost))

module.exports = { postsRouter: router }
