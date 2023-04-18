import { createSchema, Type, typedModel } from "ts-mongoose";
import { documentSchema } from "./common.schema";
export const transferSchema = createSchema({
    _id: Type.objectId({
        auto: true,
    }),

    propertyId: Type.number({ required: true }),
    newOwnerName: Type.string({ required: true }),
    newOwnerAadhaarCardNumber: Type.string({ required: true }),
    newOwnerPanCardNumber: Type.string({ required: true }),

    documents: documentSchema,

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

const TransferModel = typedModel("landtransfer", transferSchema);
export default TransferModel;
