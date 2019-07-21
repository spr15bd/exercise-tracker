// NodeJS, mongoDB Exercise Tracker
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
// collection.ensureIndex is deprecated. Therefore used createIndexes instead.
mongoose.set('useCreateIndex', true);

// Connect to the database
mongoose.connect(process.env.MLAB_URI, { useNewUrlParser: true }, (databaseConnectError, data) => { 
  // current URL string parser is deprecated, and will be removed in a future version. Therefore set { useNewUrlParser: true } in MongoClient.connect.
  if (databaseConnectError) {
    console.log("Error conecting to mongodb database");
    throw(databaseConnectError);
  } else {
    console.log("Successfully connected to the mongodb database");
  }
});
var Schema = mongoose.Schema;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connected to MongoDB");
});

// Define a schema (the data fields that will be held in the database)
var userSchema = new Schema({
  userName: {
    type: String,
    required: true,
    unique: true
  },
  exerciseLog: [{
    description: {
      type: String,
      required: true
    },
    duration: {
      type: Number,
      required: true
    },
    date: {
      type: Date,
      default: Date.now()
    }
  }]
});
var users = mongoose.model('users', userSchema); 

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static('public'));

// Display imitial page (html form)
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// Register a new user
app.post("/api/exercise/new-user", (req, res)=>{
  createAndSaveNewUser(res, req);
})

// Add a new exercise to existing user
app.post("/api/exercise/add", (req, res)=>{
  updateUser(res, req);
})

// Return all user details
app.get("/api/exercise/users", (req, res)=>{
  getUsers(req, res);
})

// retrieve the log array which shows all exercises added for a user
app.get("/api/exercise/log", (req, res)=>{
  getUserExerciseLog(req, res); 
})

// Not found middleware - fire 'Not found middleware' only if the other routes are unsuccessful
app.use((req, res, next) => {
  return next({status: 404, message: 'not found'})
});

var createAndSaveNewUser = function(res, req) {
  var user = new users({userName: req.body.username, log:[]});
  user.save(function(error, data){
    if(error) {
      res.send("Error updating database: "+error.errmsg)
    } else {
      res.json({
        "username": req.body.username,
        "_id": data._id
      });
    }
  });
}

// Return an object of all current users
var getUsers = (req, res) => {
  users.find({}, {userName:1}, (error, data) => {
    if (error) {
      res.json(error);
    } else {
      res.json(data);
    }
  });
}

var getUserExerciseLog = function(req, res) {
  // return user object plus exercise log, omit the userId
  users.findById({_id:req.query.userId}, {_id: 0, userName:1,exerciseLog:1}, function(error, data) {
    if (error) {
      res.send("Invalid userId. Please enter a valid userId.");
    } else {
      // If the user specifies a limit return only up to that index of the exercise log array
      if (req.query.limit) {
        data.exerciseLog = data.exerciseLog.slice(0, req.query.limit);
      }
      // if the user specifies a from date and/or a to date, filter out exercise log items outside these dates
      if (req.query.from||req.query.to) {
        let fromDate=req.query.from;
        let toDate=req.query.to;
        if (fromDate&&toDate) {
          data.exerciseLog=data.exerciseLog.filter(item => item.date > new Date(req.query.from) && item.date < new Date(req.query.to));
        } else if (fromDate&&!toDate) {
          data.exerciseLog=data.exerciseLog.filter(item => item.date > new Date(req.query.from));
        } else if (!fromDate&&toDate) {
          data.exerciseLog=data.exerciseLog.filter(item => item.date < new Date(req.query.to));
        }
      }
      let totalExercises = data.exerciseLog.length;
      // the data variable is not an object, so convert it to one in order to add a count property of the number of exercises in the log
      let logResult = data.toObject();
      logResult.exercise_count = totalExercises;
      logResult.exerciseLog.forEach ((item) => {
        item.date = item.date.toString();
      })
      res.json(logResult);
    }
  })
}

var updateUser = function(res, req) {
  // Handle invalid user data
  if (!req.body.userId||!req.body.description||!req.body.duration) {
    res.json("Please enter a valid user id, description and duration");
  }
  let now = Date();
  // 'upsert:false' - if id not found do not add the exercise details to the log
  // 'multi:false'  - if multiple matching ids found, update one only
  
  // Add user's exercise to the database and return their input through the response object
  users.findByIdAndUpdate({_id:req.body.userId}, 
    {$push:{"exerciseLog": {description: req.body.description, duration: req.body.duration, date: req.body.date||now}}},
    {upsert:false, multi:false},
    function(err, data) {
      if (err) {
        res.send("Invalid userId. Please enter a valid userId.");
      } else {
        getUserAndExercise(req, res, {description: req.body.description, duration: req.body.duration, date: now.toString()});
      }
    }
  );
}

var getUserAndExercise = function(req, res, mostRecentLog) {
  let user = users.findById({_id:req.body.userId}, {userName:1}, function(error, user) {
      if (error) {
        res.send(error);
      } else {
        let userAndExercise =  { user, mostRecentLog };
        res.json(userAndExercise);
      } 
  });
}

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port);
})