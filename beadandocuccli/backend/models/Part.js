const mongoose = require('mongoose');

let Part = new mongoose.Schema({
  name: {type: String},
  date: {type: Date},
  quantity: {type: Number},
},
{collection: 'parts'});

module.exports = mongoose.model('Part', Part);
