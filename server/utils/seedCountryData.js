const cities = require('all-the-cities');
const countries = require('country-list');
const Country = require('../models/Country');

countries.getData().forEach(country => {
    const filteredCities = cities.filter(city => city.country === country.code);
    const citiesToSave = [];
    filteredCities.forEach(city => {
        citiesToSave.push({
            name: city.name,
            country: city.country,
        });
    });
    const newCountry = new Country({
        ...country,
        cities: citiesToSave.map(city => city.name),
    });
    newCountry.save();
});
