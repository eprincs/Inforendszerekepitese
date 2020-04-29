const mongoose = require('mongoose');

let Customer = require('./Customer');
let Product = require('./Product');

let Order = new mongoose.Schema({
  name: {type: []},
  product: {type: []},
  quantity: {type: Number},
},
{collection: 'orders'});

module.exports = mongoose.model('Order', Order);
