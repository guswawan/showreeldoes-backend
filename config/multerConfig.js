const multer = require('multer');
// const path = require('path');
// const Datauri = require('datauri');

// const storage = multer.memoryStorage({
//     destination:function(req, file, cb){
//         if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/gif' || file.mimetype === 'video/mp4'){
//         cb(null, 'public/images/');
//         }else{
//         cb({message: 'this file is neither a video or image file'}, false)
//         }
//     },
//     filename: function(req, file, cb){
//         cb(null, file.originalname);
//     }
        
// });
// const upload = multer({storage: storage});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/images/')
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now()+path.extname(file.originalname))
    },
    fileFilter: function(req, file, cb) {
      let ext = path.extname(file.originalname)
      if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg' && ext !== '.mp4') {
        return cb(null, false)
      }
      cb(null, true)
    }      
});
const upload = multer({storage: storage});

module.exports = upload;