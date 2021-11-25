const express = require('express');
const router = new express.Router();

const {
  addPostVallidation,
  pathPostValidation,
} = require('../middlewares/vallidationMiddleware');

const {
  getPosts,
  getPostsById,
  addPost,
  changePost,
  patchPost,
  deletePost,
} = require('../controllers/postsController');

router.get('/', getPosts);

router.get('/:id', getPostsById);

router.post('/', addPostVallidation, addPost);

router.put('/:id', addPostVallidation, changePost);

router.patch('/:id', pathPostValidation, patchPost);

router.delete('/:id', deletePost);

module.exports = {postsRouter: router};
