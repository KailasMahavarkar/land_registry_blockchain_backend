import cloudinary from '../../cloudinary';

const readImageCloudinary = async (req, res) => {
    let imageId = req.body.publicId || req.body.imageId

    // try to get the imageId from the query string
    if (!imageId) {
        imageId = req.query.publicId || req.query.imageId
    }

    if (!imageId) {
        return res.status(400).json({
            msg: "'publidId' or 'imageId' is required",
            status: "failed"
        })
    }

    try {
        const result = await cloudinary.api.resource(imageId)

        if (!result) {
            return res.status(400).json({
                msg: "Image Not Found",
                status: "failed"
            })
        }

        return res.status(200).json({
            msg: "Image Fetched Successfully",
            status: "success",
            data: result
        })

    } catch (error) {
        if (error?.error?.http_code === 404) {
            return res.status(400).json({
                msg: "Image Not Found",
                status: "failed"
            })
        }

        return res.status(500).json({
            msg: "Cloudinary Error Read Image",
            status: "exited",
            error: "SE_M_SINGLE_FILE_READ_01",
        })
    }
}

export default readImageCloudinary;