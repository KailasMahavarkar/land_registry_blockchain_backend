import { Router } from 'express';
import Ajv from 'ajv';
import LandRegisterModel from "../../models/landregister.model";

const router = Router();

// create a new land register record
router.post('/', async (req, res) => {
    const ajv = new Ajv();
    const validate = ajv.compile({
        type: 'object',
        properties: {
            propertyId: { type: 'number' },
            propertyHouseNumber: { type: 'string' },
            propertyStreetName: { type: 'string' },
            propertyType: { type: 'string' },
            propertyArea: { type: 'number' },
            propertyPincode: { type: 'number' },
            propertyState: { type: 'string' },
            propertyVillage: { type: 'string' },
            propertyDistrict: { type: 'string' },
            propertyTaluka: { type: 'string' },
            ownerName: { type: 'string' },
            aadharCardNumber: { type: 'string' },
            panCardNumber: { type: 'string' },
            addressProofA: { type: 'string' },
            addressProofB: { type: 'string' },
            transfered: { type: 'boolean' },
            transferedTo: { type: 'number' },
            transferedFrom: {
                type: 'array',
                items: { type: 'number' },
            },
            propertySplitLandId: {
                type: 'array',
                items: { type: 'number' },
            },
            surveyNumber: { type: 'number' },
            subSurveyNumber: { type: 'number' },
            createdOn: { type: 'string' },
            createTS: { type: 'number' },
            expireTS: { type: 'number' },
            updateTS: { type: 'number' },
        },
        required: [
            'propertyId',
            'propertyHouseNumber',
            'propertyStreetName',
            'propertyType',
            'propertyArea',
            'propertyPincode',
            'propertyState',
            'propertyVillage',
            'propertyDistrict',
            'propertyTaluka',
            'ownerName',
            'aadharCardNumber',
            'panCardNumber',
            'addressProofA',
            'addressProofB',
            'transfered',
            'transferedTo',
            'transferedFrom',
            'propertySplitLandId',
            'surveyNumber',
            'subSurveyNumber',
            'createdOn',
        ],
    });

    const isValid = validate(req.body);

    if (!isValid) {
        return res.status(400).json({
            status: 'error',
            msg: 'Invalid request data',
            errors: validate.errors,
        });
    }

    try {
        const newRecord = await LandRegisterModel.create(req.body);

        return res.status(200).json({
            status: 'success',
            msg: 'Land register record created successfully',
            data: newRecord,
        });
    } catch (err) {
        console.error(err);

        return res.status(500).json({
            status: 'error',
            msg: 'Internal server error',
        });
    }
});

export default router;
