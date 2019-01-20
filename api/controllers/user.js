const mongoose = require('mongoose');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const message = { message: "An error has occurred. Please don't panic out!!!" };

const signupUser = (req, res, next) => {
  const { email, password } = req.body;
  console.log(email, password);
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: `Please provide email and password.` });
  } else {
    //1. check if email is already registered
    const userExists = User.findOne({ email: email })
      .exec()
      .then(doc => {
        if (doc)
          return res
            .status(409)
            .json({ message: `Email ${email} already registered` });
      })
      .catch(err => {
        console.log(err);
        return res
          .status(500)
          .json({ message: `Error checking users database` });
      });

    //3. encrypt password to store in the database
    console.log(typeof password);
    bcrypt.hash(password, 09, (err, hash) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: `Error encrypting password` });
      }
      const user = new User({
        _id: new mongoose.Types.ObjectId(),
        email: email,
        password: hash
      });
      user
        .save()
        .then(result => {
          res
            .status(201)
            .json({ message: `User ${email} created successfully` });
        })
        .catch(err => {
          console.log(err);
          res
            .status(400)
            .json({ message: `Error creating new user in the database` });
        });
    });
  }
  console.log('signUpUser');
};
const loginUser = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: `Please provide email and password` });
  }
  User.find({ email: email })
    .exec()
    .then(user => {
      if (user.length < 1) {
        return res.status(401).json({ message: 'Auth fail' });
      }
      bcrypt.compare(password, user[0].password, (err, result) => {
        if (err || !result)
          return res.status(401).json({ message: `Auth JWT fail` });
        if (result) {
          const token = jwt.sign(
            {
              email,
              userId: user[0]._id
            },
            process.env.JWT_KEY,
            {
              expiresIn: '1h'
            }
          );
          console.log('user token ', token);
          return res.status(200).json({ message: 'Log in successful' });
        }
      });
    })
    .catch(err => {
      console.log(err);
      return res.status(500).json({ message: `Error logging user in` });
    });
  console.log('signInUser');
};
const logoffUser = (req, res, next) => {
  console.log('signOffUser');
};
module.exports = {
  signupUser,
  loginUser,
  logoffUser
};
