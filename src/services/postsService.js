const { Post } = require('../db/postModel')
// const { User } = require('../db/userModel')
const { WrongParametersError } = require('../helpers/errors')

const getPosts = async (userId, { skip, limit }) => {
  const posts = await Post.find({ userId })
    .select({ __v: 0 })
    .skip(skip)
    .limit(limit)
  // .sort({ createdAt: -1 })

  // const posts = await User.aggregate([
  //   {
  //     $project: {
  //       __v: 0,
  //       password: 0,
  //     },
  //   },
  //   {
  //     $lookup: {
  //       from: 'posts',
  //       localField: '_id',
  //       foreignField: 'userId',
  //       as: 'userPosts',
  //     },
  //   },
  // ])
  return posts
}

const getPostById = async (postId, userId) => {
  const post = await Post.findOne({ _id: postId, userId })
  if (!post) {
    throw new WrongParametersError(`failure, no post widt id '${postId}' found`)
  }
  return post
}

const addPost = async ({ topic, text }, userId) => {
  const post = new Post({ topic, text, userId })
  await post.save()
}

const changePostById = async (postId, { topic, text }, userId) => {
  await Post.findOneAndUpdate(
    { _id: postId, userId },
    { $set: { topic, text } }
  )
}

const deletePostById = async (postId, userId) => {
  await Post.findOneAndRemove({ _id: postId, userId })
}

module.exports = {
  getPosts,
  getPostById,
  addPost,
  changePostById,
  deletePostById,
}
