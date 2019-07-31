const cloudinary = require('cloudinary');


cloudinary.config({
    cloud_name: 'damaxkeot',
    api_key: '523294434589253',
    api_secret: 'hvErRGv-CktJiRKUbfj2HEtWqBw'
});


exports.uploads = (files) => {
    return new Promise(resolve => {
        cloudinary.uploader.upload(files,(results) => {
            resolve({url: results.url, id: results.public_id})
            
        }, {resource_type: "auto"})
    })
}