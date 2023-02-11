const express = require('express');
const userController = require('../controllers/user.controller');

const route = express.Router();

route.post('/register', (req, res) => {
  userController.register(req, res);
});

route.post('/login', (req, res) => {
  userController.login(req, res);
});

module.exports = route;
