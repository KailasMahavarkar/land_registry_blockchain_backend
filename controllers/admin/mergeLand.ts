import { Request, Response } from "express";
import Ajv from "ajv";
import LandMergeModel, { landMergeSchema } from "../../models/landmerge.model"

const ajv = new Ajv();

const validateSchema = ajv.compile(landMergeSchema);

export const createLandMerge = async (req: Request, res: Response) => {
    const { landId, firstName, aadharNumber, panNumber, addressProofA, addressProofB, scrutiny, status, propertyIds } = req.body;

    const isValid = validateSchema(req.body);

    if (!isValid) {
        return res.status(400).json({
            status: "error",
            msg: "Invalid request body",
            errors: validateSchema.errors,
        });
    }

    try {
        const landMerge = await LandMergeModel.create({
            landId,
            firstName,
            aadharNumber,
            panNumber,
            addressProofA,
            addressProofB,
            scrutiny,
            status,
            propertyIds,
        });

        return res.status(200).json({
            status: "success",
            msg: "Land merge request created successfully",
            data: landMerge,
        });
    } catch (error) {
        return res.status(500).json({
            status: "error",
            msg: "Failed to create land merge request",
            error,
        });
    }
};
