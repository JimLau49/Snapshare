const jwt = require('jsonwebtoken');

exports.authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).send({ message: 'Authorization header is missing' });

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).send({ message: 'Token not found' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).send({ message: 'Token is not valid' });
    req.user = user;
    next();
  });
};
