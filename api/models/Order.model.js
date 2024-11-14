import mongoose from 'mongoose';

const { Schema, Types } = mongoose;

const OrderSchema = new Schema({
	userID: {
		type: Types.ObjectId,
		ref: 'User',
		required: true,
	},
	products: [
		{
			productID: {
				type: Types.ObjectId,
				ref: 'Product',
				required: true,
			}, 
			quantity: { 
				type: Number, 
				default: 1,
			},
		},
	],
	amount: {
		type: Number,
		required: true,
	},
	address: { 
		type: Object, 
		required: true,
	},
	status: {
		type: String,
		default: "pending",
	},
}, 
{ timestamps: true });

export default mongoose.model("Order", OrderSchema);
