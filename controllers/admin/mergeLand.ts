import { registerAJVSchema } from '../../common_schema/ajv.schema';
import LandMergeModel from '../../models/landmerge.model';
import Ajv from 'ajv';


// create a new land register record
const mergeLand = async (req, res) => {

    const ajv = new Ajv();
    const validate = ajv.compile(registerAJVSchema)
    const isValid = validate(req.body);

    if (!isValid) {
        return res.status(400).json({
            status: 'error',
            msg: 'Invalid request data',
            errors: validate.errors,
        });
    }



    try {
        const newRecord = await LandMergeModel.create(req.body);

        return res.status(200).json({
            status: 'success',
            msg: 'Land merge record created successfully',
            data: newRecord,
        });
    } catch (err) {

        console.log("Error: ", err);

        return res.status(500).json({
            status: 'error',
            msg: 'Internal server error',
        });
    }
};


export default mergeLand;
