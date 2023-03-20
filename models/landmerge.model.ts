import { Type, createSchema, typedModel } from "ts-mongoose";

// its same as landtransfer.model.ts
// since [landmerge] is same as [landtransfer]
// except for the propertyIds field
export const landMergeSchema = createSchema({
    _id: Type.objectId({
        auto: true,
    }),

    // property ids to be merged
    propertyId: Type.number({ required: true }),
    childIds: Type.array({ required: true }).of(Type.number()),
    status: Type.string({ required: true, default: "pending" }),

    // basic timestamps
    createTS: Type.number({ required: true, default: Date.now() }),
    expireTS: Type.number({ required: true, default: Date.now() }),
    updateTS: Type.number({ required: true, default: Date.now() }),
});

const LandMergeModel = typedModel("landmerge", landMergeSchema);
export default LandMergeModel;