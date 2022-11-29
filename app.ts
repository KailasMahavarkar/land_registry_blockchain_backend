import env from "./env";
import express from "express";
import SHA512 from "crypto-js/sha512";
import cors from "cors";

import memberRegister from "./controllers/users/member.register";
import mailVerify from "./controllers/users/mail.verify";
import memberLogin from "./controllers/users/member.login";
import _authAPI, { _authAPILoose } from "./middlewares/_authAPI";
import connect from "./connect";
import {
	createEmployee,
	updateEmployeeDetails,
} from "./controllers/admin/create.employee";

const app = express();
app.use(express.json({ limit: "0.5mb" }));

app.use(
	cors({
		origin: "*",
	})
);

app.use(async (req, res, next) => {
	const body = req.body as any;

	const testkey = req.headers["x-test-key"] || "";
	const isTestHeaderOK = SHA512(testkey).toString() === env.X_TEST_KEY;

	req.locals = {
		hash: body?.options?.hash === true,
		compress: body?.options?.compress === true,
		encrypt: body?.options?.encrypt === true,
		decrypt: body?.options?.decrypt === true,

		owner: "default",
		role: "member",
		user: {},

		// checks
		checks: {
			testkey: isTestHeaderOK,
		},
		headers: {
			testkey: testkey,
		},
	};

	return next();
});

app.post("/auth/register", memberRegister);
app.post("/auth/mailverify", mailVerify);
app.post("/auth/login", memberLogin);

// employee routes
app.post("/employee/create", createEmployee);
app.patch("/employee/update", updateEmployeeDetails);
app.get("/employee/read", createEmployee);
app.get("/employee/readAll", createEmployee);
app.delete("/employee/delete", createEmployee);

// property history
app.get("/employee/property-history", (req, res) => {
	const propertyHistoryArray = [
		{
			id: 1,
			sellingParty: "Radhe Sham",
			buyingParty: "Ramesh Goswami",
			state: "maharashtra",
			district: "mumbai",
			taluka: "mumbai",
			agentName: null,
			status: "verified",
			lastAction: "transfer",
			lastActionDate: "12/12/2020",
			action: "view",
		},

		{
			id: 2,
			sellingParty: "Ritik Shah",
			buyingParty: "Raju Shah",
			state: "maharashtra",
			district: "mumbai",
			taluka: "mumbai",
			agentName: "kartik mistry",
			status: "verified",
			lastAction: "transfer",
			lastActionDate: "12/11/2022",
			action: "view",
		},
		{
			id: 3,
			sellingParty: "Kailas Mahavarkar",
			buyingParty: "Mayur Sharma",
			state: "maharashtra",
			district: "mumbai",
			taluka: "mumbai",
			agentName: "ravi kumar",
			status: "verified",
			lastAction: "transfer",
			lastActionDate: "12/11/2022",
			action: "view",
		},
	];

    return res.json({
        status: "success",
        data: propertyHistoryArray,
    })
});

// listen to port
app.listen(2000, async () => {
	console.log(`Server is running on port 2000`);
	await connect();
});
