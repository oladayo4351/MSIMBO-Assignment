module.exports = function(app){

const userModel = require('../models/user/user.model.server.js')
users = [
	{_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder", email: "alice@gmail.com"},
	{_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley", email: "bob@whatever.com"},
	{_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia", email: "charly@hotmail.com"},
	{_id: "456", username: "shiyu", password: "shiyu", firstName: "Shiyu", lastName: "Wang", email: "swang@ulem.org"}
	];

app.get('/api/user/:uid', findUserById);
app.get('/api/user', findUser);
app.post('/api/user', createUser);
app.put('/api/user/:uid', updateUser);
app.delete('/api/user/:uid', deleteUser);

	// function selectUserbyId(uid){
	// 	for (let x = 0; x < users.length; x++) {
 //      		if (users[x]._id === uid) {  
 //            return users[x]; 
 //        	}
 //      	}
	// }

 function findUserById(req, res) {
    let uid = req.params['uid']
   userModel.findUserById(uid).then(
    data => {
         res.json(data)

    })
      
      
    }
  

  function createUser(req,res){
	var user = req.body;
	// user._id = Math.floor(Math.random()*Math.floor(10000)).toString();
	// users.push(user);
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
  // var oldUser = selectUserById(userId);
  // var index = users.indexOf(oldUser);
  // users.splice(index, 1);

      
}

}
