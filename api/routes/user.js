const express = require('express');
const router = express.Router();
const { signupUser, loginUser } = require('../controllers/user');

router.post('/signup', (req, res, next) => {
  signupUser(req, res, next);
});

router.post('/login', (req, res, next) => {
  loginUser(req, res, next);
});

module.exports = router;
