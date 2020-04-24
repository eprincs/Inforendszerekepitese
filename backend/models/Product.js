const mongoose = require('mongoose');

let Part = require('./Part');

let Product = new mongoose.Schema({
  name: {type: String},
  parts: {type: []},
  products: {type: []},

},
{collection: 'products'});


module.exports = mongoose.model('Product', Product);
