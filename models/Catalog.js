import mongoose, {Schema} from "mongoose";

const CatalogSchema = new Schema({
    name: {type: String, required: true}
})
export default mongoose.model('Catalog', CatalogSchema);
