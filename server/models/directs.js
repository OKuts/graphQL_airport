const {Schema, model} = require('mongoose');

const directSchema = new Schema({
    direct: String,
});

module.exports = model('Directs', directSchema);