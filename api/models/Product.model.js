import mongoose from 'mongoose';

const { Schema } = mongoose;

const ProductSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  inStock: {
    type: Boolean,
    default: true,
  },
  categories: {
    type: Array,
  },
  size: {
    type: Array,
  },
  color: {
    type: Array,
  },
}, 
{
  timestamps: true,
});

export default mongoose.model('Product', ProductSchema);
