// const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UploadSchema = mongoose.Schema({
    imageName: {
        type: String,
        require: true
    },
    cloudImage: [mongoose.Schema.Types.Mixed],
    imageId: {
        type: String
    },
    post_date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Upload', UploadSchema)