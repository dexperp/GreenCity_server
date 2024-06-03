import mongoose, {Schema} from "mongoose";

const NewsSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    photoUrl:{type: String, required: true}
})
export default mongoose.model('News', NewsSchema);
