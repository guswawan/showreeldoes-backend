const cloudinary = require('cloudinary');
const multer = require('multer');
const cloudinaryStorage = require('multer-storage-cloudinary');


cloudinary.config({
    cloud_name: 'damaxkeot',
    api_key: '523294434589253',
    api_secret: 'hvErRGv-CktJiRKUbfj2HEtWqBw'
});

const storage = cloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "showreeldoes",
        allowedFormats: ["jpg", "jpeg", "png", "gif", "mp4"],
        resource_type: "video"
    }   
});

const uploadVideo = multer({storage: storage})


module.exports = uploadVideo;