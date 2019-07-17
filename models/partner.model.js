const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PartnerSchema = new Schema({
    testimoni: String,
    partner_name: String,
    partner_institution: String
});

module.exports = mongoose.model('Partner', PartnerSchema);
