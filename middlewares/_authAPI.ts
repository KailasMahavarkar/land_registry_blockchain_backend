import UserModel from "../models/user.model";

const _authAPI = async (req, res, next) => {
	let apikey: string = req.headers["x-api-key"] || "";

	// check if apikey is set
	if (apikey === undefined) {
		return res.status(401).send({
			msg: "Unauthorized",
			status: "failed",
		});
	}

	// check if apikey is bound to a user
	const userData = await UserModel.findOne({ apikey });
	req.locals.role = userData?.role || "member";
	req.locals.user = userData || {};
	req.locals.owner = userData?.username || "default";

	if (!userData) {
		return res.status(401).send({
			msg: "Unauthorized",
			status: "failed",
		});
	}
	return next();
};

export const _authAPILoose = async (req, res, next) => {
	const userData = await UserModel.findOne({
		apikey: req.headers["x-api-key"] || "",
	});
	req.locals.role = userData?.role || "member";
	req.locals.user = userData || {};
	req.locals.owner = userData?.username || "default";
	return next();
};

export default _authAPI;
