const Posts = require('../models/posts.model');
const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const getExtension = (file) => {
  // this function gets the filename extension by determining mimetype. To be exanded to support others, for example .jpeg or .tiff
  var res = '';
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
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const posts = await Posts.find({ username: decoded.username });

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
