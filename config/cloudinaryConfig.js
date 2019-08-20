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
        resource_type: "video, image"
    }   
});

const upload = multer({storage: storage});

// exports.uploads = (files) => {
//     return new Promise(resolve => {
//         cloudinary.uploader.upload(files, (results) => {
//             resolve({url: results.url, id: results.public_id})
            
//         }, {resource_type: "auto"})
//     })
// }

// exports.upload = function (files) {
//     return new Promise(function (resolve) {
//         cloudinary.uploader.upload(files, function (result) {
//             resolve({url: result.url, id: result.public_id})
//         }, {resource_type: "auto"}
//         )
//     })
// }

module.exports = upload;