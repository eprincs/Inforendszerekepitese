const mongoose = require('mongoose');

let Customer = new mongoose.Schema({
  name: {type: String},
  address: {type: String},
},
{collection: 'customers'});

module.exports = mongoose.model('Customer', Customer);
