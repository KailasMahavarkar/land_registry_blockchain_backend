import Ajv from "ajv";
import TransferModel from "../../models/landtransfer.model";

import LandRegisterModel from "../../models/landregister.model";
import LandSplitModel from "../../models/landsplit.model";
import LandMergeModel from "../../models/landsplit.model";
import LandTransferModel from "../../models/landtransfer.model";

// create an instance of Ajv validator
const validator = new Ajv({ allErrors: true });

// create a validation function using the schema
const validateTransferRequest = validator.compile({
    type: "object",
    properties: {
        propertyId: { type: "number" },
        newOwnerName: { type: "string" },
        newOwnerAadhaarCardNumber: { type: "string" },
        newOwnerPanCardNumber: { type: "string" },
        documents: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    docId: { type: "string" },
                    name: { type: "string" },
                    link: { type: "string" },
                    hash: { type: "string" },
                    verified: { type: "boolean" },
                }
            },
        },
    },
    required: [
        "propertyId",
        "newOwnerName",
        "newOwnerAadhaarCardNumber",
        "newOwnerPanCardNumber",
        "documents",

    ]
});

// create a route to handle POST requests to create a new transfer
const transferLand = async (req, res) => {
    // validate the request body using the Ajv validator
    const valid = validateTransferRequest(req.body);

    // if the request is invalid, send a 400 Bad Request response with an error message
    if (!valid) {
        return res.status(400).json({
            status: "error",
            message: "Invalid request body",
            errors: validateTransferRequest.errors,
        });
    }

    try {

        // check if the propertyId exists in the database
        const findRegister = await LandRegisterModel.exists({ propertyId: req.body.propertyId });
        const findTransfer = await LandTransferModel.exists({ propertyId: req.body.propertyId });
        const findSplit = await LandSplitModel.exists({ propertyId: req.body.propertyId });
        const findMerge = await LandMergeModel.exists({ propertyId: req.body.propertyId });

        // if anyof the above is true, send a 400 Bad Request response with an error message
        if (findRegister || findTransfer || findSplit || findMerge) {
            return res.status(400).json({
                status: "error",
                message: "Property already exists",
            });
        }

        // create a new transfer document using the request body
        const newTransfer = new TransferModel(req.body);

        // save the new document to the database
        await newTransfer.save();

        // send a 200 OK response with a success message
        return res.status(200).json({
            status: "success",
            message: "Transfer created successfully",
        });
    } catch (error) {
        // if there's an error creating the new document, send a 500 Internal Server Error response with an error message
        console.error(error);
        return res.status(500).json({
            status: "error",
            message: "Error creating transfer",
            error: error.message,
        });
    }
}

export default transferLand;
