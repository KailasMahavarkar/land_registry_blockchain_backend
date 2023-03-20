import { imageHash } from "image-hash";

const uploadImageCloudinary = (req, res) => {
    if (typeof req.singleImage.secure_url === 'string') {
        return imageHash(req.singleImage.secure_url, 8, true, (error, data) => {
            if (error) {
                return res.status(400).json({
                    message: "image upload failed",
                    status: "failed",
                })
            } else {
                return res.status(200).json({
                    message: "image uploaded successfully",
                    status: "success",
                    data: {
                        secureUrl: req.singleImage.secure_url,
                        publicId: req.singleImage.public_id,
                        hash: data
                    }
                })
            }
        });
    } else {
        return res.status(400).json({
            message: "image upload failed",
            status: "failed",
        })
    }

}

export default uploadImageCloudinary;