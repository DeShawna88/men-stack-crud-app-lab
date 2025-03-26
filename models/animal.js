const mongoose = require('mongoose');

const animalSchema = new mongoose.Schema({
    name: String,
    isMammal: Boolean,
    isBird: Boolean,
    isReptile: Boolean,
    isFish: Boolean,
    isAmphibian: Boolean,
});

const Animal = mongoose.model('Animal', animalSchema);
module.exports = Animal;