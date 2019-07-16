const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ShowreelSchema = new Schema({
    title: String,
    description: String,
    path: String
})

module.exports = mongoose.model('Showreel', ShowreelSchema);