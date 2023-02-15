const Posts = require('../models/posts.model');
const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

const getExtension = (file) => {
  // this function gets the filename extension by determining mimetype. To be exanded to support others, for example .jpeg or .tiff
  var res = '';
  if (file.mimetype === 'image/jpeg') res = '.jpg';
  if (file.mimetype === 'image/png') res = '.png';
  return res;
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname + '-' + Date.now() + getExtension(file));
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
    console.log(req.file, req.body);
    const { title, date } = req.body;
    const imagePath = req.file.path;

    const post = new Posts({
      title,
      date,
      imagePath,
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
