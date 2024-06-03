import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        passwordHash: {
            type: String,
            required: true,
        },
        avatarUrl: String,
        isModerator: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        },
        subscribes: {
            type: Array,
            default: []
        },
        posts: {
            type: Array,
            default: []
        }
    },
    {
        timestamps: true,
    },
);

export default mongoose.model('User', UserSchema);
