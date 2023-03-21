import LandRegisterModel from "../../models/landregister.model";
import { registerAJVSchema } from '../../common_schema/ajv.schema';
import Ajv from "ajv";


// create a new land register record
const registerNewLand = async (req, res) => {

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
