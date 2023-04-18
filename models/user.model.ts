import { createSchema, Type, typedModel } from "ts-mongoose";

const permissionSchema = createSchema(
	{
		transfer: Type.boolean({ default: false, required: true }),
		merge: Type.boolean({ default: false, required: true }),
		split: Type.boolean({ default: false, required: true }),
        register: Type.boolean({ default: false, required: true }),
	},
	{
		_id: false,
	}
);

const userSchema = createSchema({
	_id: Type.objectId({
		auto: true,
	}),
	username: Type.string({ required: true }),

	role: Type.string({
		required: true,
		enum: ["employee", "admin", "scrutiny", "support"],
	}),

	// profile
	fullname: Type.string({ required: false }),
	email: Type.string({ required: true }),
	apikey: Type.string({ required: true, index: true }),

	// password
	password: Type.string({ required: true }),
	datejoined: Type.number({ required: true }),

	status: Type.string({
		required: true,
		enum: ["active", "inactive", "banned", "deleted"],
	}),

	permissions: permissionSchema,
});

// create index for apikey
const UserModel = typedModel("user", userSchema);
export default UserModel;
