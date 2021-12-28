const {Schema, model} = require('mongoose');

const userSchema = new Schema({
    name: String,
    age: Number,
    nationality: String,
    doneFlights: [String]
});

module.exports = model('Users', userSchema);