module.exports = function(app){

const userModel = require('../models/user/user.model.server.js')
var bcrypt = require("bcrypt-nodejs");

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(localStrategy));
function localStrategy(username, password, done) {
  userModel.findUserByUsername(username).then(
    (user) =>{
                if(user && bcrypt.compareSync(password, user.password)) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            }
        )
   }


passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);


app.get('/api/user/:uid', findUserById);
app.get('/api/user', findUser);
app.post('/api/user', createUser);
app.put('/api/user/:uid', updateUser);
app.delete('/api/user/:uid', deleteUser);
app.post ('/api/register', register);
app.post  ('/api/login', passport.authenticate('local'), login);
app.post('/api/logout', logout);
app.post('/api/loggedIn', loggedin);

  function loggedin(req, res) {
    if(req.isAuthenticated()) {
      res.send(req.user);
    } else {
      res.send("0");
    }
  } 

function logout(req, res) {
   req.logOut();
   res.send(200);
}

function login(req, res) {
   var user = req.user;
   res.json(user);
}



function register (req, res) {
    var user = req.body;
     user.password = bcrypt.hashSync(user.password);
    userModel.createUser(user).then(
function(user){
 req.login(user, function(err) {
  res.json(user);
 });
});
}

function serializeUser(user, done){
  done(null,user);
}

function deserializeUser(user, done){
    userModel.findUserById(user._id).then(
        function(user){
                done(null, user);
            },
            function(err){
               done(err, null);
            }
       );
}


 function findUserById(req, res) {
    let uid = req.params['uid']
   userModel.findUserById(uid).then(
    data => {
         res.json(data)
    })     
  }
  

  function createUser(req,res){
    var user = req.body 
  userModel.createUser(user).then(
    (data) =>{
        res.json(data);
    });
}

function findUser (req, res){
	const username = req.query['username'];
  const password = req.query['password']
	if (username && password){
		userModel.findUserByCredentials(username, password).then(
      data =>{
         res.json(data);
      })
           return;
      
		  }
		
  if(username) {
       userModel.findUserByUsername(username).then(
        data => {
          res.json(data);
        })  
      return;
    }
    // res.json(users);
  res.json(users)
}


function updateUser(req, res){
  userId =req.params['uid'];
  var user = req.body;  

   userModel.updateUser(userId, user).then(
    data =>{
       res.json(data);
    })
    
}

function deleteUser(req,res){
  var userId = req.params['uid']

  userModel.deleteUser(uid).then(
    data =>{
        res.json(data);
    }
    ) 
  
      
}

}
