const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AboutSchema = new Schema({
    content: String,
    image: String
})

module.exports = mongoose.model('About', AboutSchema);