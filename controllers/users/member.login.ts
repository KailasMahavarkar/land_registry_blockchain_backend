// importing models
import User from "../../models/user.model";
import refreshToken from "../../models/refreshtoken.model";
import SHA512 from "crypto-js/sha512";
import jwt from "jsonwebtoken";

// import env
import env from "../../env";

// generate new access token
export const generateAccessToken = (payload) => {
    delete payload.password;
    delete payload.payment;
    delete payload.pastes;

    return jwt.sign(payload, env.ACCESS_TOKEN_SECRET, {
        expiresIn: env.ACCESS_TOKEN_EXPIRY,
    });
};

// generate new refresh token
export const generateRefreshToken = (payload) => {
    delete payload.password;
    delete payload.payment;
    delete payload.pastes;

    return jwt.sign(payload, env.REFRESH_TOKEN_SECRET, {
        expiresIn: env.REFRESH_TOKEN_EXPIRY,
    });
};

// generate new access token for admin
export const generateAdminAccessToken = (payload) => {
    return jwt.sign(payload, env.ADMIN_ACCESS_TOKEN_SECRET, {
        expiresIn: env.ADMIN_ACCESS_TOKEN_EXPIRY,
    });
};

// generate new refresh token
export const generateAdminRefreshToken = (payload) => {
    return jwt.sign(payload, env.ADMIN_REFRESH_TOKEN_SECRET, {
        expiresIn: env.ADMIN_REFRESH_TOKEN_EXPIRY,
    });
};

const memberLogin = async (req, res) => {
    try {
        const userInfo: any = await User.findOne({
            username: req.body.username
        });

        if (!userInfo) {
            return res.status(404).send({
                msg: "User not found",
                status: "failed",
            });
        }


        if (
            userInfo.username === req.body.username &&
            userInfo.password === req.body.password
        ) {
            // payload with username and password
            const payload = userInfo.toJSON();

            // creating JWT access token and refresh token
            const accessTokenValue = generateAccessToken(payload);
            const refreshTokenValue = generateRefreshToken(payload);

            // adding refresh token to db
            try {
                const newRefreshToken = new refreshToken({
                    token: refreshTokenValue,
                });
                newRefreshToken.save();
            } catch (error) {
                return res.status(500).send({
                    msg: "refresh token to db failed",
                    status: "exited",
                });
            }

            // return access token and refresh token for 1st time
            return res.status(200).send({
                msg: "successfully fetched token data",
                status: "success",
                data: {
                    accessToken: accessTokenValue,
                    refreshToken: refreshTokenValue,
                },
            });
        }

        return res.status(400).send({
            msg: "Username and Password does not match",
            status: "failed",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            msg: "Login Failed",
            status: "failed",
        });
    }
};

export default memberLogin;
