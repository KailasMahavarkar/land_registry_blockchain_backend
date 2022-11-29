import Ajv from "ajv";
const ajv = new Ajv();

const memberRegisterSchema = {
	type: "object",
	nullable: false,
	properties: {
		email: {
			type: "string",
		},
		username: {
			type: "string",
			minLength: 3,
			maxLength: 20,
		},
		password: {
			type: "string",
		},
	},
	required: ["email", "username", "password"],
};

export const validateTempMemberRegistration = ajv.compile(memberRegisterSchema);
