import mongoose from 'mongoose';


const PostSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
            unique: true,
        },
        catalog: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Catalog',
            // required:true
            default: [],
        }],
        likesCount: {
            type: Number,
            default: 0,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        media: {type: Array, default: []},
        comments: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Comment',
            },
        ],
        closed:{
            type:mongoose.Schema.Types.Boolean,
            default:false
        },
        address:{
            type:mongoose.Schema.Types.Array,
            default:[],
            required: true,
        }

    },
    {
        timestamps: true,
    },
);

export default mongoose.model('Post', PostSchema);
