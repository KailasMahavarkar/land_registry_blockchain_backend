import Ajv from 'ajv';
import LandRegisterModel from "../../models/landregister.model";


// create a new land register record
const registerNewLand = async (req, res) => {
    const ajv = new Ajv();
    const validate = ajv.compile({
        type: 'object',
        properties: {
            propertyHouseNumber: { type: 'string' },
            propertyStreetName: { type: 'string' },
            propertyType: { type: 'string' },
            propertyLength: { type: 'number' },
            propertyWidth: { type: 'number' },
            propertyPincode: { type: 'number' },
            propertyState: { type: 'string' },
            propertyVillage: { type: 'string' },
            propertyDistrict: { type: 'string' },
            propertyTaluka: { type: 'string' },
            ownerName: { type: 'string' },
            aadharCardNumber: { type: 'string' },
            panCardNumber: { type: 'string' },

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
            // each document is an object with a name, link, hashstring,verified
            documents: {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        name: { type: 'string' },
                        link: { type: 'string' },
                        docId: { type: 'string' },
                        verified: { type: 'boolean' },
                        hash: { type: 'string' },
                    },
                    required: [
                        'name',
                        'link',
                        'docId',
                        'verified',
                        'hash',
                    ]
                }
            }
        },
        required: [
            'propertyHouseNumber',
            'propertyStreetName',
            'propertyType',
            'propertyLength',
            'propertyWidth',
            'propertyPincode',
            'propertyState',
            'propertyVillage',
            'propertyDistrict',
            'propertyTaluka',
            'ownerName',
            'aadharCardNumber',
            'panCardNumber',
            'transfered',
            'transferedTo',
            'transferedFrom',
            'propertySplitLandId',
            'surveyNumber',
            'subSurveyNumber',
            'createdOn',
            "documents"
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
};


export default registerNewLand;
