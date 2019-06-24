const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const cors = require('cors');

const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
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
  createAndSaveNewUser(res, req);
  

  //return;
})

app.post("/api/exercise/add", (req, res)=>{
  console.log("successful post");
  updateUser(res, req);
  

  
})

app.get("/api/exercise/users", (req, res)=>{
  console.log("get all users");
  getUsers(req, res);
  

  //return;
})

// Not found middleware
app.use((req, res, next) => {
  return next({status: 404, message: 'not found'})
});

var createAndSaveNewUser = function(res, req) {
  console.log("adding new user, "+req.body.username);
  var user = new users({userName: req.body.username});
  user.save(function(err, data){
    if(err) {
      console.log("There was an error: "+err);
    } else {
      console.log("new user created in db: "+data);
      res.json({
        "username": req.body.username,
        "_id": data._id
               
      });
    }
  });
}

var getUsers = function(req, res) {
  users.find({}, {userName:1}, function(error, data) {
    if (error) {
      res.json("Error");
    } else {
      res.json(data);
    }
  });
  //res.json(users.find());
}

var updateUser = function(res, req) {
  console.log("attempting to add new exercise");
  if (!req.body.userId&&!req.body.description&&!req.body.duration) {
    res.json("Please enter a valid user id, description and duration");
  }
  
  users.findByIdAndUpdate(req.body.userId, 
    {description: req.body.description}, 
    {duration: req.body.duration}, 
    {date: req.body.date?req.body.date : new Date()},
    function(err, data) {
      if (err) {
        res.json("Error");
      }
    }
  );
}

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port);
})