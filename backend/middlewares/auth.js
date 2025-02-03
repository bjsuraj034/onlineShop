import jwt from 'jsonwebtoken'
import userModel from '../models/userModel.js';
const authUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]; // Extract token

    if (!token) {
      console.log("Token missing");
      return res.status(401).json({ success: false, message: "Unauthorized: Token missing" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(decoded) 

    if (!decoded || !decoded.id) {
      console.log("Invalid token payload");
      return res.status(401).json({ success: false, message: "Unauthorized: Invalid token" });
    }

    const user = await userModel.findById(decoded.id);
    if (!user) {
      console.log("User not found");
      return res.status(404).json({ success: false, message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    // console.error("Error in authUser middleware:", message);
    return res.status(403).json({ success: false, message: "Invalid or expired token" });
  }
};

export default authUser
