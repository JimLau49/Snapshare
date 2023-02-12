const express = require('express');
const express = require('express');
const postController = require('../controllers/post.controller');
const router = express.Router();

router.post('/create', postController.createPost);
router.get('/:id', postController.getPost);
router.get('/', postController.getAllPosts);

module.exports = router;
