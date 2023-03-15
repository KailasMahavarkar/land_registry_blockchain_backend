import { createSchema, Type, typedModel } from "ts-mongoose";
const landSplitSchema = createSchema({
    _id: Type.objectId({
        auto: true,
    }),

    // give default values
    propertyId: Type.number({
        required: true,
    }),
    createdOn: Type.string({
        required: true,
    }),
    ownerName: Type.array().of({
        type: Type.string({ default: "" }),
    }),
    propertyArea: Type.array().of({
        type: Type.number({ default: 0 }),
    }),
    ownerAadhaarCardNumber: Type.array().of({
        type: Type.string({ default: "" }),
    }),
    ownerPanCardNumber: Type.array().of({
        type: Type.string({ default: "" }),
    }),
    ownerAddressProofA: Type.array().of({
        type: Type.string({ default: "" }),
    }),
    ownerAddressProofB: Type.array().of({
        type: Type.string({ default: "" }),
    }),
    surveyNumber: Type.array().of({
        type: Type.number({ default: 0 }),
    }),
    subSurveyNumber: Type.array().of({
        type: Type.number({ default: 0 }),
    }),

    // basic timestamps
    createTS: Type.number({ default: Date.now() }),
    expireTS: Type.number({ default: Date.now() }),
    updateTS: Type.number({ default: Date.now() }),
});

const LandSplitModel = typedModel("landsplit", landSplitSchema);
export default LandSplitModel;
