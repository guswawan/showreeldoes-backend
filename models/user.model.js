const mongoose =  require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: String,
    password: String,
    isAdmin: {
        type: Boolean,
        default: false
    },
    token: {
        type: String,
        required:true,
        unique:true
    }

    // _id_student: Schema.Types.ObjectId 
});


module.exports = mongoose.model('User', UserSchema);