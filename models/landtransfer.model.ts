import { createSchema, Type, typedModel } from "ts-mongoose";
export const transferSchema = createSchema({
    _id: Type.objectId({
        auto: true,
    }),

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

    // basic timestamps
    createTS: Type.number({ required: true, default: Date.now() }),
    expireTS: Type.number({ required: true, default: Date.now() }),
    updateTS: Type.number({ required: true, default: Date.now() }),
});

const TransferModel = typedModel("transfer", transferSchema);
export default TransferModel;
