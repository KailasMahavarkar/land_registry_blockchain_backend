import { getRecord } from './controllers/admin/getLandRecord';
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
    deleteEmployee,
    readAllEmployee,
    updateEmployeeDetails,
} from "./controllers/admin/createEmployee";
import registerNewLand from "./controllers/admin/registerNewLand";
import transferLand from "./controllers/admin/transferLand";
import landSplit from "./controllers/admin/splitLand";
import mergeLand from "./controllers/admin/mergeLand";
import deleteImageCloudinary from './controllers/cloudinary/deleteImageCloudinary';
import readImageCloudinary from './controllers/cloudinary/readImageCloudinary';
import uploadImageCloudinary from './controllers/cloudinary/uploadImageCloudinary';
import multer from 'multer';
import _singleFileUpload from './middlewares/_singleFileUpload';
import { updateRecord } from './controllers/admin/updateLandRecord';
import _multipleFileUpload from './middlewares/_multiFileUpload';

const app = express();
const upload = multer({});


// set json limit
app.use(express.json({ limit: "3mb" }));
app.set('json spaces', 4);
app.use(express.urlencoded({ extended: true }));

// cors
app.use(
    cors({
        origin: "*",
    })
);

// handle json error
app.use(function (error, req, res, next) {
    if (error instanceof SyntaxError) {
        return res.status(400).json({
            msg: "failed to parse JSON body",
            status: "failed"
        })
    } else {
        return next();
    }
});


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
app.get("/employee/readAll", readAllEmployee);
app.delete("/employee/delete", deleteEmployee);

// manage user requests
app.post("/property/register", registerNewLand);
app.post("/property/transfer", transferLand);
app.post("/property/split", landSplit);
app.post('/property/merge', mergeLand);

// get land record
app.patch('/property/:recordType', updateRecord);
app.get('/property/:recordType', getRecord);


// cloudinary upload
app.post('/cloudinary',
    upload.single('file'),
    _singleFileUpload,
    uploadImageCloudinary
);
app.delete('/cloudinary', deleteImageCloudinary);
app.get('/cloudinary', readImageCloudinary);


// listen to port
app.listen(2000, async () => {
    console.log(`Server is running on port 2000`);
    await connect();
});
