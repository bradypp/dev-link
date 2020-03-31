const { Schema, model } = require('mongoose');

const countrySchema = new Schema({
    code: String,
    name: String,
    cities: [String],
});

const Country = model('country', countrySchema, 'countries');

module.exports = Country;
