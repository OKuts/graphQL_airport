const {Schema, model} = require('mongoose');

const companySchema = new Schema({
    name: String,
});

module.exports = model('Companies', companySchema);