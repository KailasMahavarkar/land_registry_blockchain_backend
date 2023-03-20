import LandRegisterModel from "../../models/landregister.model";
import LandSplitModel from "../../models/landsplit.model";
import LandMergeModel from "../../models/landmerge.model";
import LandTransferModel from "../../models/landtransfer.model";

type landRecordType = "register" | "split" | "merge" | "transfer"

export const getRecord = async (req, res) => {
    const landRecord: landRecordType = req.params?.recordType;
    let landStatus = req.query.status || "pending";

    // console.log(landRecord, landStatus);

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
        const records = await recordModel.find({
            status: landStatus
        });
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
