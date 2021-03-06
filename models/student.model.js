const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
    full_name: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: false
    },
    gender: {
        type: Boolean,
        default: false
    },
    birthday: {
        type: Date
    },
    email: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    id_user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    // id_user: Schema.Types.ObjectId,
    showreels: [{
        id_showreel: {
            type: Schema.Types.ObjectId,
            ref: 'Showreel'
        },
        title: String,
        description: String,
        fileUpload: String,
    }],
    profile_pic: String

})
module.exports = mongoose.model('Student', StudentSchema);