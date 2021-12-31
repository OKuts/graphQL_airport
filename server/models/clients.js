const {Schema, model} = require('mongoose');

const clientSchema = new Schema({
    name: String,
    surname: String,
    age: Number,
    citizenship: String,
    doneFlights: [String]
});

module.exports = model('Clients', clientSchema);