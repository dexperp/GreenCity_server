import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    fullName: {
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
      isModerator:{
        type:Boolean,
        default:false
      },
      disabled:{
          type:Boolean,
          default:false
      },
      watchingRegions:{
        type:Array,
        default:[]
      },
      postsHistory:{
        type:Array,
        default:[]
      }
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('User', UserSchema);
