import { Type, createSchema, typedModel } from "ts-mongoose";
import { registerSchema } from "./common.schema";

// its same as landtransfer.model.ts
// since [landmerge] is same as [landtransfer]
// except for the propertyIds field
export const landMergeSchema = createSchema(registerSchema);

const LandMergeModel = typedModel("landmerge", landMergeSchema);
export default LandMergeModel;