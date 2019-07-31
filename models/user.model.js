const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const salt = 10;


const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    token: {
        type: String,
        default: null
    },
    id_student: {
        type: Schema.Types.ObjectId,
        ref: 'Student'
    }
    // id_student: Schema.Types.ObjectId
});

module.exports = mongoose.model('User', UserSchema);