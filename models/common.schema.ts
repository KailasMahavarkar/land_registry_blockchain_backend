import { createSchema, Type, typedModel } from "ts-mongoose";

export const documentSchema = Type.array().of({
    docId: Type.string({ required: true, default: "" }),
    hash: Type.string({ required: true, default: "" }),
    link: Type.string({ required: true, default: "" }),
    name: Type.string({ required: true, default: "" }),
    verified: Type.boolean({ required: true, default: false }),
})


export const registerSchema = {
    _id: Type.objectId({
        auto: true,
    }),
    // give default values
    propertyId: Type.number({ required: true, default: 0 }),
    propertyHouseNumber: Type.string({ required: true, default: "" }),
    propertyStreetName: Type.string({ required: true, default: "" }),
    propertyType: Type.string({ required: true, default: "" }),
    propertyLength: Type.number({ required: true, default: 0 }),
    propertyWidth: Type.number({ required: true, default: 0 }),
    propertyPincode: Type.number({ required: true, default: 0 }),
    propertyState: Type.string({ required: true, default: "" }),
    propertyVillage: Type.string({ required: true, default: "" }),
    propertyDistrict: Type.string({ required: true, default: "" }),
    propertyTaluka: Type.string({ required: true, default: "" }),
    ownerName: Type.string({ required: true, default: "" }),
    aadharCardNumber: Type.string({ required: true, default: "" }),
    panCardNumber: Type.string({ required: true, default: "" }),
    transfered: Type.boolean({ required: true, default: false }),
    transferedTo: Type.number({ required: true, default: 0 }),
    transferedFrom: Type.array().of(
        Type.number({ default: [] })
    ),
    propertySplitLandId: Type.array().of(
        Type.number({ default: [] })
    ),
    surveyNumber: Type.number({ required: true, default: 0 }),
    subSurveyNumber: Type.number({ required: true, default: 0 }),
    createdOn: Type.string({ required: true, default: "" }),

    // status of the land record
    status: Type.string({ required: true, default: "pending" }),

    documents: documentSchema,

    // basic timestamps
    createTS: Type.number({ default: Date.now() }),
    expireTS: Type.number({ default: Date.now() }),
    updateTS: Type.number({ default: Date.now() }),
}