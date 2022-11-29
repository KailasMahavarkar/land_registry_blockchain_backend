import { createSchema, Type, typedModel } from "ts-mongoose";
const tempUserSchema = createSchema({
	_id: Type.objectId({
		auto: true,
	}),
	email: Type.string({ required: true }),
	username: Type.string({ required: true }),
	password: Type.string({ required: true }),
	token: Type.string({ required: true }),
	status: Type.string({
		required: true,
		enum: ["pending", "banned", "expired"],
        default: "pending",
	}),
	attempts: Type.number({ required: true, default: 0 }),

    // basic timestamps
	createTS: Type.number({ required: true, default: Date.now() }),
	expireTS: Type.number({ required: true, default: Date.now() }),
	updateTS: Type.number({ required: true, default: Date.now() }),
});

const TempUserModel = typedModel("Temp", tempUserSchema);
export default TempUserModel;
