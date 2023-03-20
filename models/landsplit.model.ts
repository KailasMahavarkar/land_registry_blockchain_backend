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
    ownerName: Type.array().of(
        Type.string({})
    ),
    propertyLength: Type.array().of(Type.number({})),
    propertyWidth: Type.array().of(Type.number({})),
    ownerAadhaarCardNumber: Type.array().of(Type.string({})),
    ownerPanCardNumber: Type.array().of(Type.string({})),
    surveyNumber: Type.array().of(Type.number({})),
    subSurveyNumber: Type.array().of(Type.number({})),

    documentDocId: Type.array().of(Type.string({})),
    documentHash: Type.array().of(Type.string({})),
    documentLink: Type.array().of(Type.string({})),
    documentName: Type.array().of(Type.string({})),
    status: Type.string({
        default: "pending",
    }),

    // basic timestamps
    createTS: Type.number({ default: Date.now() }),
    expireTS: Type.number({ default: Date.now() }),
    updateTS: Type.number({ default: Date.now() }),
});

const LandSplitModel = typedModel("landsplit", landSplitSchema);
export default LandSplitModel;
