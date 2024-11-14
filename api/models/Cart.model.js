import mongoose from 'mongoose';

const { ObjectId } = mongoose.Schema;

// Cart Schema definition
const CartSchema = new mongoose.Schema({
  userID: {
    type: ObjectId,
    ref: 'User',
    required: true,
  },
  products: [
    {
      productID: { 
        type: ObjectId,
        ref: 'Product',
        required: true,
      },
      quantity: { 
        type: Number, 
        default: 1,
      },
    },
  ],
}, 
{ timestamps: true });

// Export the Cart model
export default mongoose.model('Cart', CartSchema);
