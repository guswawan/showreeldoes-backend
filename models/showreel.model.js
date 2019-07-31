const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ShowreelSchema = new Schema({
    title: String,
    description: String,
    fileUpload: String,
    id_student: {
        type: Schema.Types.ObjectId,
        ref: 'Student'
    }
})

module.exports = mongoose.model('Showreel', ShowreelSchema);