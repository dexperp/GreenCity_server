import mongoose, {Schema} from "mongoose";

const CommentSchema = new Schema({

    text: {type: String, required: true},
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    likesCount: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model('Comment', CommentSchema);
