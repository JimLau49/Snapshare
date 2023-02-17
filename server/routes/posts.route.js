const express = require('express');
const PostsController = require('../controllers/posts.controller');
const Auth = require('../auth/auth');
const multer = require('multer');

const route = express.Router();

route.post(
  '/create',
  Auth.authenticateJWT,
  PostsController.upload,
  PostsController.create
);

route.get('/', Auth.authenticateJWT, PostsController.getAllPosts);
route.get(
  '/user/:username',
  Auth.authenticateJWT,
  PostsController.getPostsByUser
);
route.delete('/', Auth.authenticateJWT, PostsController.deletePost);

module.exports = route;
