import cloudinary from 'cloudinary';
import env from './env';

const cloud = cloudinary.v2;

cloud.config({
    cloud_name: env.CLOUDINARY_NAME,
    api_key: env.CLOUDINARY_API_KEY,
    api_secret: env.CLOUDINARY_API_SECRET,
});

export default cloud;