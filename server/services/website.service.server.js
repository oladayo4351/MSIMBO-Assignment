module.exports = function(app){
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

function selectWebsiteById(wid){
	for (var x = 0; x < websites.length; x++) {
      if (websites[x]._id === wid) {  
        return websites[x];
      }
  }
}

function createWebsite(req,res){
	userId = req.params['uid'];
	website = req.body;
	website._id = Math.floor(Math.random()*Math.floor(10000)).toString();  
    website.developerId = userId;
    websites.push(website);
    res.json(website);
}


function findAllWebsitesForUser(req,res){
	  var userId = req.params['uid']
	  var result = [];
    for (var x = 0; x < websites.length; x++) {
      if (websites[x].developerId === userId) {  
        result.push(websites[x])

        }
    }res.json(result)
    
}

function findWebsiteById(req,res){
	 websiteId = req.params['wid']
	 for (var x = 0; x < websites.length; x++) {
      if (websites[x]._id === websiteId) {  
        let website = websites[x];
        res.json(website)
       
    	}
    }
}

function updateWebsite(req, res){
var websiteId = req.params['wid']
var  website = req.body;
const oldWebsite =  selectWebsiteById(websiteId);
    const index = websites.indexOf(oldWebsite);
    websites[index].name = website.name;
    websites[index].description = website.description;
    res.json(website)

}

function deleteWebsite(req, res){
var websiteId = req.params['wid']
	const oldWebsite = selectWebsiteById(websiteId);
    const index = websites.indexOf(oldWebsite);
    websites.splice(index,1);
    res.json(websites)

}
 }


