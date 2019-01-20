const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    console.log(req.headers);
    const token = req.headers.authorization.split(' ')[1];
    console.log(token);
    const decode = jwt.verify(token, process.env.JWT_KEY);
    req.userData = decode;
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json('Please log in');
  }
};
