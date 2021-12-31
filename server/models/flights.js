const {Schema, model} = require('mongoose');

const flightSchema = new Schema({
    companyId: String,
    directId: String,
    date: String,
    time: String
});

module.exports = model('Flights', flightSchema);
