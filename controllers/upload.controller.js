const Upload = require('../models/upload.model');


// exports.upload_create = function (req, res) {
//     console.log("iki req...", req.files)
//         var fileUpload = {
//             imageName: req.body.imageName,
//             cloudImage: req.files[0].url,
//             imageId: req.files.public_id
//         };

//         //then create file in database
//         Upload.create(fileUpload) 
//         console.log("iki fileUpload...", fileUpload)
//             .then(fileUpload => res.status(200).json(fileUpload))
//             .catch(err => console.log(err));
// };

exports.upload_create = function (req, res) {
    // console.log("iki req...", req.files)
    var fileUpload = {
        imageName: req.body.imageName,
        cloudImage: req.files[0].url,
        imageId: req.files.public_id
    }
    Upload.create(fileUpload, (err, created) => {
        if (err) {
            res.json({
                message: "failed.",
                err: err
            })
        } else {
            res.status(200).json({
                message: "image uploaded successfully!",
                created: created
            })
        }
    })
};

// exports.upload_create = function (req, res) {
//     try {
//         var fileUpload = {
//             imageName: req.body.imageName,
//             cloudImage: req.files[0].path,
//             imageId: ''
//         };
//         Upload.find({imageName: fileUpload.imageName}, (err, cb) => {
//             if (err) {
//                 res.json({
//                     err: err,
//                     message: "there was a problem uploading image"
//                 })
//             } else if( cb.length >= 1 ) {
//                 res.json({
//                     message: "file already exist"
//                 })
//             } else {
//                 var fileUpload = {
//                     imageName: req.body.imageName,
//                     cloudImage: req.files[0].path,
//                     imageId: ''
//                 }
//             }
//             //if all thing go well, post image to cloudinary
//             Cloud.uploads(fileUpload.cloudImage).then((results) => {
//                 console.log("iki result... ",results)
//                 var fileUpload = {
//                     imageName: req.body.imageName,
//                     cloudImage: results.url,
//                     imageId: results.id
//                 }

//                 //then create file in database
//                 Upload.create(fileUpload, (err, created) => {
//                     if (err) {
//                         res.json({
//                             message: "failed.",
//                             err: err
//                         })
//                     } else {
//                         res.status(200).json({
//                             message: "image uploaded successfully!",
//                             created: created
//                         })
//                     }
//                 })
//             })
//         });
//     }catch(execptions){
//         console.log(execptions)
//     }
// };


exports.upload_getall = function (req, res) {
    Upload.find((err, uploads) => {
        if (err) {
            res.json({
                success: false,
                message: "Error"
            })
        } else {
            res.json({
                success: true,
                uploads: uploads
            })
        }
    })
}

exports.upload_detail = function ( req, res) {
    Upload.findById(req.params.id, (err, upload) => {
        if (err) {
            res.status(400).json({
                success: false,
                message: "Error cant find showreel"
            })
        } else {
            res.status(200).json({
                success: true,
                upload: upload
            })
        }
    })
}

exports.upload_update = function (req, res) {
    let updateUpload = req.body
        Upload.findOneAndUpdate({ _id: req.params.id }, updateUpload, (err, updated) => {
            if (err) {
                res.status(400).json({
                    success: false,
                    message: "Error cant update showreel"
                })
            } else {
                res.status(200).json({
                    success: true,
                    message: "Success updated showreel",
                    updated: updated
                })
            }
        })
}

exports.upload_delete = function (req, res) {
    Upload.findByIdAndDelete({
        _id: req.params.id
    }, (err, deleted) => {
        if (err) {
            res.status(400).json({
                success: false,
                message: "Cant deleted showreel"
            })
        } else {
            res.status(200).json({
                success: true,
                message: "Success deleted showreel"
            })
        }
    })
}

// exports.multiple_app = async function (req, res) {
//     // res_promises will be an array of promises
//     let res_promises = req.files.path(file => new Promise((resolve, reject) => {
//         cloudinary.v2.uploader.upload(file.path, { use_filename: true, unique_filename: false }, function (error, result) {
//             if(error) reject(error)
//             else resolve(result.public_id)
//         })
//     })
//     )
//     // Promise.all will fire when all promises are resolved 
//     Promise.all(res_promises)
//     .then(result =>  res.json({'response':upload}))
//     .catch((error) => res.json({ 'message': error }))
// }