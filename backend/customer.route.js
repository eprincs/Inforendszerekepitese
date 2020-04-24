let express = require('express');
let Customer = require('./models/Customer');

const customerRoute = express.Router();

customerRoute.route('/addCustomer').post((req,res,next) => {

  Customer.create(req.body, (err,data) => {
      if(err){
        console.log(err)
      }
      else {
        res.json(data)
      }
    });
});

module.exports = customerRoute;
