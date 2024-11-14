import mongoose from 'mongoose';  // Import mongoose

const userSchema = new mongoose.Schema({
	fullname: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	isAdmin: {
		type: Boolean,
		default: false,
	},
}, 
{ timestamps: true });

export default mongoose.model("User", userSchema);  // Export the model as default
