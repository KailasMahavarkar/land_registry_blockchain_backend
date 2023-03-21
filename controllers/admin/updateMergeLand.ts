import LandMergeModel from "../../models/landmerge.model";

const updateRegisterLand = async (req, res) => {
    const { _id, status } = req.body;

    if (!_id) {
        return res.status(400).json({
            status: "error",
            msg: "Invalid request body, requires _id",
        });
    }

    try {
        const updateResult = await LandMergeModel.updateOne(
            { _id: _id },
            { status: status }
        )
        if (updateResult) {
            return res.status(200).json({
                msg: "Land register updated successfully",
                status: "success",
                data: updateResult,
            });
        }

    } catch (error) {
        return res.status(500).json({
            msg: "Failed to update land register",
            status: "error",
            error,
        });
    }

}

export default updateRegisterLand