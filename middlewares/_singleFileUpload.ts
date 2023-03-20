import { createReadStream } from 'streamifier';
import cloudinary from '../cloudinary';
import { imageHash } from 'image-hash';



const _singleFileUpload = async (req, res, next) => {
    // console.log("starting ... single upload --")
    try {
        let streamUpload = (req: any) => {
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

                createReadStream(req.file.buffer)
                    .pipe(stream);

            });
        };

        const upload = async (req) => {
            return await streamUpload(req);
        }

        req.singleImage = await upload(req)

        console.log("leaving ... single upload --")
        next()

    } catch (error) {
        return res.status(500).json({
            msg: "Cloudinary Error Uploading Image",
            error: error.message,
            status: "exited"
        })
    }

};


export default _singleFileUpload;