import jwt from 'jsonwebtoken';

const adminAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // Check if Authorization header exists
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'Not authorized, token missing' });
    }

    const token = authHeader.split(' ')[1];
    // console.log("token found in admin auth",token)  // Correct token extraction

    // Verify the token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // Verify admin credentials (assuming you store email in the payload)
    if (decodedToken.email !== process.env.ADMIN_EMAIL) {
      return res.status(403).json({ success: false, message: 'Not authorized, invalid admin' });
    }
  

    // Token is valid, proceed to the next middleware
    next();

  } catch (error) {
    console.error('Auth Error:', error.message);
    res.status(403).json({ success: false, message: 'Invalid or expired token' });
  }
};
export default adminAuth;
