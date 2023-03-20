import Ajv from 'ajv';
import LandSplitModel from "../../models/landsplit.model";

// create an AJV instance
const ajv = new Ajv();


// define the schema for the request body
// use AJV to validate the request body
// all properties except propertyId are arrays
const schema = {
    type: 'object',
    properties: {
        propertyId: { type: 'number' },
        ownerName: {
            type: 'array',
            items: { type: 'string' }
        },
        propertyLength: {
            type: 'array',
            items: { type: 'number' }
        },
        propertyWidth: {
            type: 'array',
            items: { type: 'number' }
        },
        ownerAadhaarCardNumber: {
            type: 'array',
            items: { type: 'string' }
        },
        ownerPanCardNumber: {
            type: 'array',
            items: { type: 'string' }
        },
        surveyNumber: {
            type: 'array',
            items: { type: 'number' }
        },
        subSurveyNumber: {
            type: 'array',
            items: { type: 'number' }
        },

        documentDocId: {
            type: 'array',
            items: { type: 'string' }
        },
        documentHash: {
            type: 'array',
            items: { type: 'string' }
        },
        documentLink: {
            type: 'array',
            items: { type: 'string' }
        },
        documentName: {
            type: 'array',
            items: { type: 'string' }
        }
    },
    required: [
        'propertyId', 'ownerName', 'propertyLength',
        'propertyWidth',
        'ownerAadhaarCardNumber',
        'ownerPanCardNumber',
        'surveyNumber', 'subSurveyNumber']
};

// compile the schema
const validate: any = ajv.compile(schema);

const landSplit = async (req, res) => {
    try {
        const {
            propertyId,
            ownerName,
            propertyLength,
            propertyWidth,
            ownerAadhaarCardNumber,
            ownerPanCardNumber,
            surveyNumber,
            subSurveyNumber,
            documentDocId,
            documentHash,
            documentLink,
            documentName
        } = req.body;


        // validate the request body
        const isValid = validate(req.body);

        if (!isValid) {
            const errors = validate.errors.map(error => `${error.dataPath} ${error.message}`).join(', ');
            return res.status(400).json({
                status: 'error',
                msg: `Invalid request body: ${errors}`
            });
        }


        // Create a new document using the LandSplitModel schema
        const newLandSplit = new LandSplitModel({
            createdOn: new Date().toISOString(),
            propertyId,
            ownerName,
            propertyLength,
            propertyWidth,
            ownerAadhaarCardNumber,
            ownerPanCardNumber,
            surveyNumber,
            subSurveyNumber,
            documentDocId,
            documentHash,
            documentLink,
            documentName,
        });

        // Save the document to the database
        await newLandSplit.save();

        // Return a success response
        return res.status(200).json({
            status: "success",
            msg: "Land split created successfully",
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            status: "error",
            msg: "An error occurred while creating the land split",
        });
    }
};

export default landSplit;