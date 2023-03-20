import { Request, Response } from "express";
import Ajv from "ajv";
import LandMergeModel, { landMergeSchema } from "../../models/landmerge.model"

const ajv = new Ajv();

const validateSchema = ajv.compile({
    type: "object",
    properties: {
        propertyId: { type: "number" },
        childIds: {
            type: "array",
            items: { type: "number" },
        },
    },
    required: ["propertyId", "childIds"],
});

export const mergeLand = async (req: Request, res: Response) => {
    const { propertyId, childIds } = req.body;

    const isValid = validateSchema(req.body);

    if (!isValid) {
        return res.status(400).json({
            status: "error",
            msg: "Invalid request body",
            errors: validateSchema.errors,
        });
    }

    // check if parent property exists
    const parentProperty = await LandMergeModel.findOne({
        propertyId,
    });

    if (parentProperty) {
        return res.status(400).json({
            msg: "Parent property already exists",
            status: "error",
        });
    }


    try {
        const landMerge = await LandMergeModel.create({
            propertyId,
            childIds,
            status: "pending",
        });

        return res.status(200).json({
            msg: "Land merge request created successfully",
            status: "success",
            data: landMerge,
        });
    } catch (error) {
        return res.status(500).json({
            msg: "Failed to create land merge request",
            status: "error",
            error,
        });
    }
};

export default mergeLand;