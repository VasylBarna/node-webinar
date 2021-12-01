const express = require('express')
const router = new express.Router()

const { addPostVallidation } = require('../middlewares/vallidationMiddleware')
const { authMiddleware } = require('../middlewares/authMiddleware')

const { asyncWrapper } = require('../helpers/apiHelpers')

const {
  getPostsController,
  getPostsByIdController,
  addPostController,
  changePostController,
  deletePostController,
} = require('../controllers/postsController')

router.use(authMiddleware)

router.get('/', asyncWrapper(getPostsController))
router.get('/:id', asyncWrapper(getPostsByIdController))
router.post('/', addPostVallidation, asyncWrapper(addPostController))
router.put('/:id', addPostVallidation, asyncWrapper(changePostController))
router.delete('/:id', asyncWrapper(deletePostController))

module.exports = { postsRouter: router }
