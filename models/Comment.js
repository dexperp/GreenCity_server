import mongoose, {Schema} from "mongoose";
 const CommentSchema = new Schema({

    text: {type:String,required:true},
    media: Array,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model('Comment', CommentSchema);
