import { Type, typedModel, createSchema } from "ts-mongoose";
import { documentSchema, registerSchema } from "./common.schema";

// this model tracks the land register details before
// entering into the blockchain
const propertySchema = createSchema(registerSchema)

const LandRegisterModel = typedModel("landrecord", propertySchema);
export default LandRegisterModel;
