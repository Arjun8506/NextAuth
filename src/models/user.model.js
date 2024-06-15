import mongoose, { Schema, model } from "mongoose";

const userSchema = Schema({
    username: {
        type: String,
        required: [true, "Please Provide USERNAME"],
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: [true, "Please Provide Email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please Provide Password"],
    },
    otp: {
        type: String
    },
    otpExpiry: {
        type: Date
    },
    isVerified: {
        type: Boolean,
        default: false
    }

}, { timestamp: true })

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User