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

customerRoute.route('/getCustomers').get((req,res) => {
  Customer.find((err, data) => {
      if(err){
        return next(err)
      } else {
        res.json(data)
      }
  });
});

customerRoute.route('/getCustomer/:id').get((req,res) => {
  Customer.findById(req.params.id, (err, data) => {
    if(err){
      return next(err)
    }
    else {
      res.json(data)
    }
  });
});

module.exports = customerRoute;
