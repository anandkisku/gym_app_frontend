const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
  try {
    // Get token from cookie
    const token = req.cookies.session;

    if (!token) {
      return res.status(401).json({ 
        authenticated: false,
        message: 'No authentication token found' 
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(401).json({ 
      authenticated: false,
      message: 'Invalid authentication token' 
    });
  }
};

module.exports = auth; 