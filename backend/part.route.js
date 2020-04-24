let express = require('express');
let Part = require('./models/Part');

const partRoute = express.Router();

partRoute.route('/').get((req,res) => {
    Part.find((err, data) => {
        if(err){
          return next(err)
        } else {
          res.json(data)
        }
    });
});

partRoute.route('/getPart/:id').get((req,res) => {
  Part.findById(req.params.id, (err, data) => {
    if(err){
      return next(err)
    }
    else {
      res.json(data)
    }
  });
});

partRoute.route('/addPart').post((req,res,next) => {

  Part.create(req.body, (err,data) => {
      if(err){
        console.log(err)
      }
      else {
        res.json(data)
      }
    });
});

partRoute.route('/removePart/:id').delete((req,res,next) => {
  Part.findOneAndRemove(req.params.id, (err,data) => {
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

partRoute.route('/updatePart/:id').put((req, res, next) => {
  Part.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      console.log(error);
      return next(error);

    } else {
      res.json(data)
      console.log('Data updated successfully')
    }
  })
})


module.exports = partRoute;
