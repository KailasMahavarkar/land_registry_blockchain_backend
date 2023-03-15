import { Type, typedModel, createSchema } from "ts-mongoose";

// this model tracks the land register details before
// entering into the blockchain
const propertySchema = createSchema({
    _id: Type.objectId({
        auto: true,
    }),
    // give default values
    propertyId: Type.number({ required: true, default: 0 }),
    propertyHouseNumber: Type.string({ required: true, default: "" }),
    propertyStreetName: Type.string({ required: true, default: "" }),
    propertyType: Type.string({ required: true, default: "" }),
    propertyArea: Type.number({ required: true, default: 0 }),
    propertyPincode: Type.number({ required: true, default: 0 }),
    propertyState: Type.string({ required: true, default: "" }),
    propertyVillage: Type.string({ required: true, default: "" }),
    propertyDistrict: Type.string({ required: true, default: "" }),
    propertyTaluka: Type.string({ required: true, default: "" }),
    ownerName: Type.string({ required: true, default: "" }),
    aadharCardNumber: Type.string({ required: true, default: "" }),
    panCardNumber: Type.string({ required: true, default: "" }),
    addressProofA: Type.string({ required: true, default: "" }),
    addressProofB: Type.string({ required: true, default: "" }),
    transfered: Type.boolean({ required: true, default: false }),
    transferedTo: Type.number({ required: true, default: 0 }),
    transferedFrom: Type.array().of({
        type: Type.number({ default: 0 }),
    }),
    propertySplitLandId: Type.array().of({
        type: Type.number({ default: 0 }),
    }),
    surveyNumber: Type.number({ required: true, default: 0 }),
    subSurveyNumber: Type.number({ required: true, default: 0 }),
    createdOn: Type.string({ required: true, default: "" }),

    // basic timestamps
    createTS: Type.number({ default: Date.now() }),
    expireTS: Type.number({ default: Date.now() }),
    updateTS: Type.number({ default: Date.now() }),
})

const LandRegisterModel = typedModel("landrecord", propertySchema);
export default LandRegisterModel;
