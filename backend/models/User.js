import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    googleId: {
        type: String,
        required: false
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: false,
    },
    isAdmin: { type: Boolean, required: true, default: false }
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

export default User;