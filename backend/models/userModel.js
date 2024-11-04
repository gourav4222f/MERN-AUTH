import mongoose from "mongoose";

const userSchema = mongoose.Schema({

    username: {
        type: String,
        required: [true, "Please add the username"]
    },
    email: {
        type: String,
        required: [true, "Please add the email address"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please add the user password"]
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    }

}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;


