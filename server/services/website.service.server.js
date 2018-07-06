module.exports = function(app){
	
  const websiteModel = require('../models/website/website.model.server.js')

  websites = 
[
  { _id: "123", name: "Facebook", developerId: "456", description: "Lorem" },
  { _id: "234", name: "Tweeter",  developerId: "456", description: "Lorem" },
  { _id: "456", name: "Gizmodo",   developerId: "456", description: "Lorem" },
  { _id: "890", name: "Go", developerId: "123", description: "Lorem" },
  { _id: "567", name: "Tic Tac Toe", developerId: "123", description: "Lorem" },
  { _id: "678", name: "Checkers", developerId: "123", description: "Lorem" },
  { _id: "789", name: "Chess", developerId: "234", description: "Lorem" }
];

app.post('/api/user/:uid/website',createWebsite);
app.get('/api/user/:uid/website',findAllWebsitesForUser);
app.get('/api/website/:wid',findWebsiteById);
app.put('/api/website/:wid',updateWebsite);
app.delete('/api/website/:wid',deleteWebsite);


function createWebsite(req,res){
	// userId = req.params['uid'];
	var website = req.body;
	// website._id = Math.floor(Math.random()*Math.floor(10000)).toString();  
 //    website.developerId = userId;
 //    websites.push(website);

 websiteModel.createWebsite(website).then(
  data =>{
    res.json(data);

  })
    }


function findAllWebsitesForUser(req,res){
	  var uid = req.params['uid']
	  // var result = [];
    // for (var x = 0; x < websites.length; x++) {
    //   if (websites[x].developerId === userId) {  
    //     result.push(websites[x])

    //     }
    // }

    websiteModel.findAllWebsitesForUser(uid).then(
      websites =>{
         res.json(websites)
      })
   
    
}

function findWebsiteById(req,res){
	 var wid = req.params['wid']
	 websiteModel.findWebsiteById(wid).then(
    website => {
      res.json(website)
      
    })
          
    	}

function updateWebsite(req, res){
var wid = req.params['wid']
var  website = req.body;
websiteModel.updateWebsite(wid,website).then(
data =>{
res.json(data)
})
}


function deleteWebsite(req, res){
var wid = req.params['wid']
	websiteModel.deleteWebsite(wid).then(
    data =>{
      res.json(data)
    })
    
}
 

}
