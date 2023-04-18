import { fakeNumString } from "../../helper";
import UserModel from "../../models/user.model";

export const createEmployee = async (req, res) => {
    const { fullname, email, permissions, username, password } = req.body;

    try {
        const newUser = new UserModel({
            fullname: fullname,
            email: email,
            role: "employee",
            apikey: fakeNumString(64),
            datejoined: Date.now(),
            username: username,
            password: password,
            status: "active",
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
            msg: err.message,
            status: "error",
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
    const { id } = req.query;

    try {
        const result = await UserModel.deleteOne({ _id: id });

        if (result.deletedCount === 0) {
            return res.status(404).json({
                status: "error",
                msg: "Employee not found",
            });
        }

        return res.status(200).json({
            status: "success",
            msg: "Employee deleted successfully",
        });
    } catch (err) {
        return res.status(500).json({
            status: "error",
            msg: err.message,
        });
    }
};

