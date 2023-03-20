import { createSchema, Type, typedModel } from "ts-mongoose";

export const documentSchema = Type.array().of({
    docId: Type.string({ required: true, default: "" }),
    hash: Type.string({ required: true, default: "" }),
    link: Type.string({ required: true, default: "" }),
    name: Type.string({ required: true, default: "" }),
    verified: Type.boolean({ required: true, default: false }),
})
