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
        createdOn: { type: 'string' },
        ownerName: {
            type: 'array',
            items: { type: 'string' }
        },
        propertyArea: {
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
        ownerAddressProofA: {
            type: 'array',
            items: { type: 'string' }
        },
        ownerAddressProofB: {
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
        }
    },
    required: ['propertyId', 'createdOn']
};

// compile the schema
const validate: any = ajv.compile(schema);

const landSplit = async (req, res) => {
    try {
        const {
            propertyId,
            createdOn,
            ownerName,
            propertyArea,
            ownerAadhaarCardNumber,
            ownerPanCardNumber,
            ownerAddressProofA,
            ownerAddressProofB,
            surveyNumber,
            subSurveyNumber,
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
            propertyId,
            createdOn,
            ownerName,
            propertyArea,
            ownerAadhaarCardNumber,
            ownerPanCardNumber,
            ownerAddressProofA,
            ownerAddressProofB,
            surveyNumber,
            subSurveyNumber,
        });

        // Save the document to the database
        await newLandSplit.save();

        // Return a success response
        res.status(200).json({
            status: "success",
            msg: "Land split created successfully",
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: "error",
            msg: "An error occurred while creating the land split",
        });
    }
};

export default landSplit;