import mongoose from "mongoose";
const Schema = mongoose.Schema;

const refreshTokenSchema = new Schema({
	_id: {
		type: mongoose.Schema.Types.ObjectId,
		auto: true,
	},
	token: {
		type: String,
	},
});

const refreshToken = mongoose.model("refreshtoken", refreshTokenSchema);
export default refreshToken;
