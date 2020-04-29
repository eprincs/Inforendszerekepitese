let express = require('express');
let Product = require('./models/Product');

const productRoute = express.Router();

productRoute.route('/addProduct').post((req,res,next) => {

  Product.create(req.body, (err,data) => {
      if(err){
        console.log(err)
      }
      else {
        res.json(data)
      }
    });
});

productRoute.route('/getProducts').get((req,res) => {
  Product.find((err, data) => {
      if(err){
        return next(err)
      } else {
        res.json(data)
      }
  });
});

productRoute.route('/getProduct/:id').get((req,res) => {
  Product.findById(req.params.id, (err, data) => {
    if(err){
      return next(err)
    }
    else {
      res.json(data)
    }
  });
});

productRoute.route('/removeProduct/:id').delete((req,res,next) => {
  Product.findOneAndRemove(req.params.id, (err,data) => {
      if(err){
        return next(err)
      }
      else {
        res.status(200).json({
          msg: data
        })
      }
    });
});

module.exports = productRoute;
