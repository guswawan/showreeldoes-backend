const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
// <<<<<<< user
// const saltRound = 10;
// =======
const salt = 10;
// >>>>>>> master

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
    id_student: Schema.Types.ObjectId,
    token: {
        type: String,
        default: null
    }
});

module.exports = mongoose.model('User', UserSchema);