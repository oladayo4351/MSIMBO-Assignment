
module.exports = function(app){
pages = 
[
  { _id: "321", name: "Post 1", websiteId: "456", description: "Lorem" },
  { _id: "432", name: "Post 2", websiteId: "456", description: "Lorem" },
  { _id: "543", name: "Post 3", websiteId: "456", description: "Lorem" }
];

app.post('/api/website/:wid/page',createPage);
app.get('/api/website/:wid/page',findAllPagesForWebsite);
app.get('/api/page/:pid',findPageById);
app.put('/api/page/:pid',updatePage);
app.delete('/api/page/:pid',deletePage);

function selectPageById(pid){
  for (var x = 0; x < pages.length; x++) {
      if (pages[x]._id === pid) {  
        return pages[x];
      }
  }
}

  function createPage(req, res) {
   var websiteId = req.params['wid']
    var page = req.body;
   page._id = Math.floor(Math.random()*Math.floor(10000)).toString(); 
     page.websiteId = websiteId;
    pages.push(page);
    res.json( page);
  }

  function findAllPagesForWebsite(req,res) {
   var websiteId = req.params['wid']
    var result = [];
    for (let x = 0; x < pages.length; x++) {
      if (pages[x].websiteId === websiteId) {
       result.push(pages[x]); }
    }res.json(result);
  }

  function findPageById(req,res) {
    var pageId = req.params['pid']
    for (let x = 0; x < pages.length; x++) {
      if (pages[x]._id === pageId) {  
        let page = pages[x];
        res.json(page)

       }
 
    }
      }

 function  updatePage(req, res) {
 let pageId = req.params['pid'];
 let page = req.body;
    let oldPage = selectPageById(pageId);
    var index = pages.indexOf(oldPage);
    pages[index].name = page.name
    pages[index].description = page.description
    res.json(page)
}


 function deletePage(req, res) {
  let pageId = req.params['pid']
    var oldPage = selectPageById(pageId);
    var index = pages.indexOf(oldPage);
      pages.splice(index,1);
      res.json(pages);

    }
}
