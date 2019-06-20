const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const cors = require('cors');

const mongoose = require('mongoose');
mongoose.connect(process.env.MLAB_URI, { useNewUrlParser: true });
var Schema = mongoose.Schema;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connected to MongoDB");
});

var userSchema = new Schema({
  userName: {
    type: String,
    required: true,
    unique: true
  }
});
var users = mongoose.model('users', userSchema); 
app.use(cors());

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.use(express.static('public'));
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});




// Error Handling middleware
app.use((err, req, res, next) => {
  let errCode, errMessage
  console.log("Error handling middleware")
  if (err.errors) {
    // mongoose validation error
    errCode = 400 // bad request
    const keys = Object.keys(err.errors)
    // report the first validation error
    errMessage = err.errors[keys[0]].message
  } else {
    // generic or custom error
    errCode = err.status || 500
    errMessage = err.message || 'Internal Server Error'
  }
  res.status(errCode).type('txt')
    .send(errMessage)
})



app.post("/api/exercise/new-user", (req, res)=>{
  console.log("successful post");
  createAndSaveNewUser(req.body.username, res, req);
  

  //return;
})

// Not found middleware
app.use((req, res, next) => {
  return next({status: 404, message: 'not found'})
});

var createAndSaveNewUser = function(username, res, req) {
  console.log("adding new user, "+username);
  var user = new users({userName: username});
  user.save(function(err, data){
    if(err) {
      console.log("There was an error: "+err);
    } else {
      console.log("new user created in db: "+data);
      res.json({
        "username": username,
        "_id": data._id
               
      });
    }
  });
}

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port);
})