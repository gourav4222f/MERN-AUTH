import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";

const authenticate = asyncHandler(async (req, res, next) => {
    const token = req.cookies.jwt;

    if (!token) {
        return res.status(401).json({ message: "Not authanticated, no token please login" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.userId).select("-password");
        next();
    } catch (error) {
        return res.status(401).json({ message: "Not authanticated, invalid token" });
    }
});

// Middleware to check if the user is an admin
const authorizeAdmin = asyncHandler(async (req, res, next) => {
    if (!req.user || !req.user.isAdmin) {
        return res.status(401).json({ message: "Not authorized as an admin" });
    } else {
        next();        
    }
});

export { authenticate, authorizeAdmin };
