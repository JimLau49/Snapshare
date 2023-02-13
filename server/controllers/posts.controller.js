const Post = require('../models/post.model');

exports.create = async (req, res) => {
  if (!req.body.content) {
    return res.status(400).send({
      message: 'Post content can not be empty',
    });
  }

  const post = new Post({
    title: req.body.title || 'Untitled Post',
    content: req.body.content,
    image: req.file.buffer,
  });

  try {
    const savedPost = await post.save();
    res.send(savedPost);
  } catch (err) {
    res.status(500).send({
      message: err.message || 'Some error occurred while creating the post.',
    });
  }
};

exports.getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
