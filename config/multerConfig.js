const multer = require('multer');
const path = require('path');
const Datauri = require('datauri');

// const storage = multer.memoryStorage({
//     destination:function(req, file,cb){
//         if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/gif' || file.mimetype === 'video/mp4'){
//         cb(null, 'public/images/');
//         }else{
//         cb({message: 'this file is neither a video or image file'}, false)
//         }
//     },
//     filename: function(req, file, cb){
//         cb(null, file.originalname);
//     }
        
// })
const storage = multer.memoryStorage();
const upload = multer({ storage }).single('cloudImage');
const dUri = new Datauri();
const dataUri = req =>
dUri.format(path.extname(req.file.originalname).toString(), req.file.buffer);

// const upload = multer({storage: storage});

module.exports = upload, dataUri;