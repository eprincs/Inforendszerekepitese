let express = require('express');
let Order = require('./models/Order');

const orderRoute = express.Router();

orderRoute.route('/addOrder').post((req,res,next) => {

  Order.create(req.body, (err,data) => {
      if(err){
        console.log(err)
      }
      else {
        res.json(data)
      }
    });
});


module.exports = orderRoute;
