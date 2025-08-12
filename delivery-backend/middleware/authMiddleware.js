const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

module.exports = function (req, res, next) {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    // Always provide both _id and id for compatibility
    if (decoded._id) {
      req.user = { ...decoded, id: decoded._id };
    } else if (decoded.id) {
      req.user = { ...decoded, _id: decoded.id };
    } else {
      req.user = decoded;
    }
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};
