const cloudinary = require('cloudinary');
const multerCloudinary = require('multer-cloudinary');


cloudinary.config({
    cloud_name: 'damaxkeot',
    api_key: '523294434589253',
    api_secret: 'hvErRGv-CktJiRKUbfj2HEtWqBw'
});


exports.uploads = (file) => {
    return new Promise(resolve => {
        cloudinary.uploader.upload(file,(result) => {
            resolve({url: result.url, id: result.public_id})
            
        }, {resource_type: "auto"})
    })
}