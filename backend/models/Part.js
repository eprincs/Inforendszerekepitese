const mongoose = require('mongoose');

let Part = new mongoose.Schema({
  storageid: {type: Number},
  name: {type: String},
  date: {type: Number},
  quantity: {type: Number},
},
{collection: 'parts'});

module.exports = mongoose.model('Part', Part);
