const {Schema, model} = require('mongoose');

const flightSchema = new Schema({
    name: String,
    direct: String,
    date: String,
});

module.exports = model('Flights', flightSchema);
