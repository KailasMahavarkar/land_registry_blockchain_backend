import express from "express";
import Ajv from "ajv";
import TransferModel from "../../models/landtransfer.model"

const router = express.Router();

// create an instance of Ajv validator
const validator = new Ajv({ allErrors: true });

// create a validation function using the schema
const validateTransferRequest = validator.compile({
    type: "object",
    required: [
        "landId",
        "firstName",
        "aadharNumber",
        "panNumber",
        "addressProofA",
        "addressProofB",
    ],
    properties: {
        landId: { type: "string" },
        firstName: { type: "string" },
        aadharNumber: { type: "string" },
        panNumber: { type: "string" },
        addressProofA: { type: "string" },
        addressProofB: { type: "string" },
        scrutiny: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    message: { type: "string" },
                    timestamp: { type: "number" },
                },
            },
        },
        status: { type: "string" },
        createTS: { type: "number" },
        expireTS: { type: "number" },
        updateTS: { type: "number" },
    },
});

// create a route to handle POST requests to create a new transfer
router.post("/", async (req, res) => {
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
});

export default router;
