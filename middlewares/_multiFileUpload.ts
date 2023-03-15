import { createReadStream } from 'streamifier';
import cloudinary from "../cloudinary";


const _multipleFileUpload = async (req, res, next) => {
    console.log("starting ... single upload --")
    try {

        let streamUpload = (req) => {
            // eslint-disable-next-line no-undef
            return new Promise((resolve, reject) => {

                let stream = cloudinary.uploader.upload_stream(
                    {
                        folder: "landregistry",
                    },
                    (error, result) => {
                        if (result) {
                            resolve(result);
                        } else {
                            reject(error);
                        }
                    }
                );

                // create multiple streams

                for (let i = 0; i < req.files.length; i++) {
                    createReadStream(req
                        .files[i].buffer)
                        .pipe(stream);
                }


            });
        };

        const upload = async (req) => {
            return await streamUpload(req);
        }

        req.multipleImages = await upload(req)

        console.log("leaving ... single upload --")
        next()

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: "Cloudinary Error Uploading Image",
            error: "SE_M_SINGLE_FILE_UPLOAD_01",
        })
    }

};

export default _multipleFileUpload;