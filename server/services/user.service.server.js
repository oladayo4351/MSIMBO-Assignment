module.exports = function(app){


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

	function selectUserbyId(uid){
		for (let x = 0; x < users.length; x++) {
      		if (users[x]._id === uid) {  
        		return users[x]; 
        	}
      	}
	}

 function findUserById(req, res) {
    let uid = req.params['uid']
    for (let x = 0; x < users.length; x++) {
      if (users[x]._id === uid) {  
      	res.json( users[x]) 
      	return;
      }
    }
  }

  function createUser(req,res){
	var user = req.body;
	user._id = Math.floor(Math.random()*Math.floor(10000)).toString();
	users.push(user);
    res.json(user);
}

function findUser (req, res){
	const username = req.query['username']
  	const password = req.query['password']
    
	if (username && password){
	var user;
		for (let x = 0; x < users.length; x++) {
		  if (users[x].username === username && users[x].password === password){ 
		     user = users[x];
		  }
		}
    res.json(user)
    return;
		}


  if(username) {
      var user = users.find(function(user){
        return user.username === username;
      })
      res.json(user);
      return;
    }
    // res.json(users);
  res.json(users)

}


function updateUser(req, res){
  userId =req.params['uid'];
  var user = req.body;  

    var oldUser = selectUserbyId(userId);
    var index = users.indexOf(oldUser);

  users[index].username = user.username;
  users[index].password = user.password;
  users[index].firstName = user.firstName;
  users[index].lastName = user.lastName;
  users[index].email = user.email;
  res.json(user);

    
}

function deleteUser(req,res){
  var userId = req.params['uid'] 
  var oldUser = selectUserById(userId);
  var index = users.indexOf(oldUser);
  users.splice(index, 1);
  res.json(users);
      
}

}
