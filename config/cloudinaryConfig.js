const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const cloudinaryStorage = require('multer-storage-cloudinary');


cloudinary.config({
    cloud_name: 'damaxkeot',
    api_key: '523294434589253',
    api_secret: 'hvErRGv-CktJiRKUbfj2HEtWqBw'
});

const storage = cloudinaryStorage({
    cloudinary: cloudinary,
    folder: "showreeldoes",
    allowedFormats: ["jpg", "jpeg", "png", "gif", "mp4"]  
});

const upload = multer({storage: storage});

// exports.uploads = (files) => {
//     return new Promise(resolve => {
//         cloudinary.uploader.upload(files, (results) => {
//             resolve({url: results.url, id: results.public_id})
            
//         }, {resource_type: "auto"})
//     })
// }

module.exports = upload;