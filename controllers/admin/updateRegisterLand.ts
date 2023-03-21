import LandRegisterModel from "../../models/landregister.model";

const updateRegisterLand = async (req, res) => {
    const { _id, propertyId, status } = req.body;

    if (!propertyId || !_id) {
        return res.status(400).json({
            status: "error",
            msg: "Invalid request body, requires [_id, propertyId]",
        });
    }

    try {
        const updateResult = await LandRegisterModel.updateOne(
            { _id: _id },
            { propertyId: propertyId, status: status }
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