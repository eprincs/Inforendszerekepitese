let mongoose = require('mongoose'),
    path = require('path'),
    express = require('express'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    productRoute = require('./product.route');
    partRoute = require('./part.route');
    orderRoute = require('./order.route');
    customerRoute = require('./customer.route');


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/mydb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true
}).then(() => {
  console.log('Database sucessfully connected')
},
  error => {
    console.log('Database could not connect: ' + error)
  }
)

let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended:false
}));
app.use(cors());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(express.static(path.join(__dirname, 'dist/beadandocuccli')));
app.use('/', express.static(path.join(__dirname,'dist/beadandocuccli')));
app.use('/api', partRoute);
app.use('/api', productRoute);
app.use('/api', orderRoute);
app.use('/api', customerRoute);


app.listen( 600,'localhost', () => {
});
