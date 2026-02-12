import { Schema, models, model } from "mongoose";

const ProductSchema = new Schema({
  title: String,
  price: Number,
  description: String,
  category: String,
  image: String,
  rating: {
    rate: Number,
    count: Number,
  },
});

export default models.Product || model("Product", ProductSchema);
