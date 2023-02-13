const express = require('express');
const PostsController = require('../controllers/posts.controller');
const Auth = require('../auth/auth');

const router = express.Router();

router.post('/', Auth.authenticateJWT, PostsController.create);
router.get('/', Auth.authenticateJWT, PostsController.getAllPosts);
router.get('/:id', Auth.authenticateJWT, PostsController.getPost);

module.exports = router;
