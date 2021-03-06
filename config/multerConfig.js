const multer = require('multer');
// const path = require('path');

const storage = multer.memoryStorage({
    destination:function(req, file, cb){
        if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/gif' || file.mimetype === 'video/mp4'){
        cb(null, '{url: results.url}');
        }else{
        cb({message: 'this file is neither a video or image file'}, false)
        }
    },
    filename: function(req, file, cb){
        cb(null, file.originalname);
    }
        
});
const upload = multer({storage: storage});


module.exports = upload;