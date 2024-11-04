import express from "express";

// Importing the controllers
import {
    createUser,
    loginUser,
    logoutUser,
    getAllUsers,
    getCurrentUserProfile,
    updateCurrentUserProfile,
    deleteUserById,
    getUserById,
    updateUserById,    
} from "../controllers/userController.js";

// Importing the middleware
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

// Creating the router
const router = express.Router();

//http://localhost:5000/api/users/
router
    .route("/")
    .post(createUser)
    .get(authenticate, authorizeAdmin, getAllUsers);

router.post("/auth", loginUser);
router.post("/logout", logoutUser);


//http://localhost:5000/api/users/profile
router
    .route("/profile")
    .get(authenticate, getCurrentUserProfile)
    .put(authenticate, updateCurrentUserProfile);


// Admin routes
//http://localhost:5000/api/users/:id
router.route("/:id")
    .delete(authenticate, authorizeAdmin, deleteUserById)
    .get(authenticate, authorizeAdmin, getUserById)
    .put(authenticate, authorizeAdmin, updateUserById);



export default router;

