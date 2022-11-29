import { fakeNumString } from "../../helper";
import UserModel from "../../models/user.model";

export const createEmployee = async (req, res) => {
	const { fullname, email, role, permissions, username, password } = req.body;

	try {
		const newUser = new UserModel({
			fullname: fullname,
			email: email,
			role: role,
			apikey: fakeNumString(64),
			datejoined: Date.now(),
			username: username,
			password: password,
			permissions: permissions,
		});

		await newUser.save();
		res.status(200).json({
			status: "success",
			msg: "Employee created successfully",
		});
	} catch (err) {
		res.status(500).json({
			status: "error",
			msg: err.message,
		});
	}
};

export const readAllEmployee = async (req, res) => {
	try {
		const employees = await UserModel.find({ role: "employee" });
		res.status(200).json({
			status: "success",
			msg: "All employees fetched successfully",
			data: employees,
		});
	} catch (err) {
		res.status(500).json({
			status: "error",
			msg: err.message,
		});
	}
};

export const updateEmployeePermissions = async (req, res) => {
	const { permissions } = req.body;
	const { id } = req.params;

	try {
		const employee = await UserModel.findOne({
			_id: id,
		});

		if (!employee) {
			return res.status(404).json({
				status: "error",
				msg: "Employee not found",
			});
		}

		employee.permissions = permissions;
		await employee.save();
	} catch (err) {
		return res.status(500).json({
			status: "error",
			msg: err.message,
		});
	}
};

export const updateEmployeeDetails = async (req, res) => {
    const { id } = req.body;
	const { fullname, email, username, password } = req.body;

	try {
		const updateResult = await UserModel.findOneAndUpdate(
			{ _id: id },
			{
				fullname,
				email,
				username,
				password,
			}
		);

		if (!updateResult) {
			return res.status(404).json({
				status: "error",
				msg: "Employee not found",
			});
		}

		return res.status(200).json({
			status: "success",
			msg: "Employee updated successfully",
		});
	} catch (error) {
		return res.status(500).json({
			status: "error",
			msg: error.message,
		});
	}
};

export const deleteEmployee = async (req, res) => {
	const { id } = req.body;

	try {
		const result = await UserModel.deleteOne({ _id: id }, (err) => {
			if (err) {
				res.status(500).json({
					status: "error",
					msg: err.message,
				});
			} else {
				res.status(200).json({
					status: "success",
					msg: "Employee deleted successfully",
				});
			}
		});

		if (result.deletedCount === 0) {
			res.status(404).json({
				status: "error",
				msg: "Employee not found",
			});
		}

		res.status(200).json({
			status: "success",
			msg: "Employee deleted successfully",
		});
	} catch (err) {
		res.status(500).json({
			status: "error",
			msg: err.message,
		});
	}
};

