import { Type, createSchema, typedModel } from "ts-mongoose";

// its same as landtransfer.model.ts
// since [landmerge] is same as [landtransfer]
// except for the propertyIds field
export const landMergeSchema = createSchema({
    _id: Type.objectId({
        auto: true,
    }),

    // details of the owner
    landId: Type.string({ required: true }),
    firstName: Type.string({ required: true }),
    aadharNumber: Type.string({ required: true }),
    panNumber: Type.string({ required: true }),
    addressProofA: Type.string({ required: true }),
    addressProofB: Type.string({ required: true }),

    // detailed logs of ongoing process
    scrutiny: Type.array().of({
        message: Type.string({ required: true }),
        timestamp: Type.number({ required: true, default: Date.now() }),
    }),

    // status of ongoing process
    status: Type.string({
        required: true,
        default: "pending",
    }),

    // property ids to be merged
    propertiyIds: Type.array().of({
        type: Type.string({ required: true }),
    }),

    // basic timestamps
    createTS: Type.number({ required: true, default: Date.now() }),
    expireTS: Type.number({ required: true, default: Date.now() }),
    updateTS: Type.number({ required: true, default: Date.now() }),
});

const LandRegisterModel = typedModel("landmerge", landMergeSchema);
export default LandRegisterModel;