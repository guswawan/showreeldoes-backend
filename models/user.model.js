const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const saltRound = 10;

const UserSchema = new Schema({
    username: String,
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    id_student: Schema.Types.ObjectId
});

// UserSchema.pre('save', (next) => {
//     this.password = bcrypt.hash(this.password, salt);
//     next();
// })

module.exports = mongoose.model('User', UserSchema);