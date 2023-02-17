const Posts = require('../models/posts.model');
const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const getExtension = (file) => {
  let res = '';
  if (file.mimetype === 'image/jpeg') res = '.jpg';
  if (file.mimetype === 'image/png') res = '.png';
  return res;
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + getExtension(file));
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});

exports.create = async (req, res) => {
  try {
    const { title, date, content } = req.body;
    const imagePath = req.file.path;

    const post = new Posts({
      title,
      date,
      content,
      imagePath,
      username: req.user.username,
    });

    await post.save();

    return res.status(200).json({
      success: true,
      post,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error,
    });
  }
};

exports.upload = upload.single('imagePath');

exports.getPostsByUser = async (req, res) => {
  try {
    const user = req.query.username;
    const posts = await Posts.find({ username: user });

    return res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error,
    });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Posts.find();
    return res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error,
    });
  }
};

exports.deletePost = async (req, res) => {
  try {
    console.log(req);
    const id = req.query.id;
    console.log(id);
    const posts = await Posts.findOneAndDelete({ _id: id });

    return res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error,
    });
  }
};
