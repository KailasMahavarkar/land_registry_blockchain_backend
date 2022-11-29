import User from "../../models/user.model";
import SHA512 from "crypto-js/sha512";
import {
	isEmpty,
	randomToken,
	runDev,
	showError,
	withMode,
} from "../../helper";
import TempUserModel from "../../models/tempuser.model";
import bindTemplate from "../../template.bind";
import sendEmail from "../../mailer";
import env from "../../env";

const MAIL_OTP_EXPIRY_IN_MINS = 5;
const USER_BAN_TIME_IN_MINS = 20;

const sendVerificationMail = async (token, email) => {
	// bind email template
	const bindedTemplate = await bindTemplate("verify", {
		company: "pastekey.io",
		href: `http://localhost:3000/register?mailtoken=${token}`,
	});

	// send email to user
	return await sendEmail({
		senderEmail: "no-reply@lrs.govt.in",
		appname: "Land Registration System",
		html: bindedTemplate.template,
		subject: "Verify your email",
		receiverEmails: [
			{
				email: email,
			},
		],
		plaintext: bindedTemplate.plaintext,
	});
};

const memberRegister = async (req, res) => {
	const body = req.body as any;

	const username = body.username;
	const email = body.email;
	let password = body.password || "";

	if (req.locals.encrypt) {
		password = SHA512(password).toString();
	}

	try {
		// if usernameMatch is not empty ? already exists username : continue
		const usernameMatch = await User.findOne({
			username: username,
		});
		if (!isEmpty(usernameMatch)) {
			return res.status(400).send({
				status: "failed",
				msg: "Username already exists",
			});
		}

		// if emailCheck is not empty ? already exists email : continue
		const emailCheck = await User.findOne({
			email: email,
		});

		if (!isEmpty(emailCheck)) {
			return res.status(400).send({
				msg: "Email is linked with another username",
				status: "failed",
			});
		}

		const token = randomToken();
		const findResult = await TempUserModel.findOne({
			email: email,
		});

		// if findResult is empty ? create new temp user : continue
		if (!findResult) {
			const tempuser = new TempUserModel({
				email: email,
				username: username,
				password: password,
				token: token,
				attempts: 1,
				createTS: Date.now(),
				expireTS: Date.now() + 60 * 1000 * MAIL_OTP_EXPIRY_IN_MINS,
			});
			await tempuser.save();
		} else {
			// handle user ban
			if (findResult.status === "banned") {
				// if user is banned and time is less than MAIL_OTP_EXPIRY_IN_MINS
				if (Date.now() < findResult.expireTS) {
					return res.status(400).send({
						msg: `Request exceeded, registration paused for ${USER_BAN_TIME_IN_MINS} minutes`,
						status: "failed",
						data: {
							// time left in seconds
							timeLeftInSeconds: Math.floor(
								(findResult.expireTS - Date.now()) / 1000
							),
						},
						dev: {
							token: findResult.token,
						},
					});
				} else {
					// un-ban user
					findResult.status = "pending";
					findResult.attempts = 1;
					findResult.expireTS =
						Date.now() + 60 * 1000 * MAIL_OTP_EXPIRY_IN_MINS;
					await findResult.save();
				}
			} else if (findResult.status === "pending") {
				// if attempts is greater than 3 ? ban user for 30 minutes : continue
				if (findResult.attempts >= 3) {
					findResult.status = "banned";
					findResult.expireTS =
						Date.now() + 60 * 1000 * USER_BAN_TIME_IN_MINS;
					findResult.attempts = 0;
					await findResult.save();
					return res.status(400).send({
						msg: `You have exceeded the limit of attempts. Please try again after ${MAIL_OTP_EXPIRY_IN_MINS} minutes`,
						status: "failed",
					});
				} else {
					findResult.attempts++;
					findResult.token = token;
					await findResult.save();
				}
			} else if (findResult.status === "expired") {
				return res.status(400).send({
					msg: "Your verification link has expired. Please try again",
					status: "failed",
				});
			}
		}

		// send mail
		if (env.EMAIL_MODE === "prod") {
			await sendVerificationMail(token, email);
		}

		return res.status(200).send({
			msg: "Verification mail sent",
			status: "success",
			dev: runDev({
				token: token,
			}),
		});
	} catch (error) {
		return res.status(500).send({
			msg: "error registering user",
			status: "exited",
			error: showError(error),
		});
	}
};

export default memberRegister;
