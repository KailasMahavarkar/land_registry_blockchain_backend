import LandRegisterModel from "../../models/landregister.model";
import LandSplitModel from "../../models/landsplit.model";
import LandMergeModel from "../../models/landmerge.model";
import LandTransferModel from "../../models/landtransfer.model";

type landRecordType = "register" | "split" | "merge" | "transfer"

export const updateRecord = async (req, res) => {
    const landRecord: landRecordType = req.params.recordType;
    const { propertyId, status } = req.body;

    if (propertyId !== 0 && (!propertyId || !status)) {
        return res.status(400).json({
            status: "error",
            msg: "Invalid request body",
            fix: "propertyId and status are required",
        });
    }

    let recordModel;

    switch (landRecord) {
        case "register":
            recordModel = LandRegisterModel;
            break;
        case "split":
            recordModel = LandSplitModel;
            break;
        case "merge":
            recordModel = LandMergeModel;
            break;
        case "transfer":
            recordModel = LandTransferModel;
            break;
        default:
            return res.status(400).json({
                status: "error",
                msg: "Invalid record type",
            });
    }

    try {

        // find record by id
        // update status to status from request body

        const records = await recordModel.updateOne(
            {
                propertyId: req.body.propertyId
            },
            {
                $set: {
                    status: req.body.status
                }
            }
        );


        return res.status(200).json({
            status: 'success',
            msg: `Land ${landRecord} records fetched successfully`,
            data: records,
        });
    } catch (err) {

        return res.status(500).json({
            status: 'error',
            msg: 'Internal server error',
        });
    }
}
