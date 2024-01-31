import mongoose, {Schema} from "mongoose";

const CatalogSchema = new Schema({
    name: {type: String, required: true},
    box_color: String
})
export default mongoose.model('Catalog', CatalogSchema);
