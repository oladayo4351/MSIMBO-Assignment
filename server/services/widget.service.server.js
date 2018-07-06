module.exports = function(app){

var multer = require('multer'); // npm install multer --save
var upload = multer({ dest: './dist/assets/uploads'})
var widgetModel = require('../models/widget/widget.model.server.js')
widgets = 
[
  { _id: "123",  widgetType: "HEADING", pageId: "321", size: 2, text: "GIZMODO"},
  { _id: "234",  widgetType: "HEADING", pageId: "321", size: 4, text: "Lorem ipsum"},
  { _id: "345", widgetType: "IMAGE", pageId: "321", width: "100%", url: "https://www.w3schools.com/w3css/img_lights.jpg"},
  { _id: "456", widgetType: "HTML", pageId: "321", text: "<p>Lorem ipsum</p>"},
  { _id: "567", widgetType: "HEADING", pageId: "321", size: 4, text: "Lorem ipsum"},
  { _id: "678", widgetType: "YOUTUBE", pageId: "321", width: "100%", url: "https://youtu.be/AM2Ivdi9c4E" },
  { _id: "789",  widgetType: "HTML", pageId: "321", text: "<p>Lorem ipsum</p>"}
];

app.post('/api/page/:pid/widget',createWidget);
app.get('/api/page/:pid/widget',findAllWidgetsForUser);
app.get('/api/widget/:wgid',findWidgetById);
app.put('/api/widget/:wgid',updateWidget);
app.delete('/api/widget/:wgid',deleteWidget);
app.post("/api/user/:uid/website/:wid/page/:pid/widget/:wgid/upload", upload.single('myFile'), uploadImage);

function uploadImage(req,  res){
  const uid = req.params['uid'];
  const wid = req.params['wid'];
  const pid = req.params['pid'];
  const wgid = req.params['wgid'];
  const myFile = req.file;
  widget = findWidgetById(wgid).then(
    widget =>{
       widget.url ='/asset/upload/' + myFile.filename;
       widgetModel.updateWidget( wgid, widget).then(
        data=>{
           var callbackUrl = req.headers.origin + '/user/' +uid + '/website/' + wid +'/page/'+pid+'/widget/'+wgid;
  res.redirect(callbackUrl);
        })
    }

    );
 

 
}

// function selectWidgetById(wgid){
//   for (var x = 0; x < widgets.length; x++) {
//       if (widgets[x]._id === wgid) {  
//         return widgets[x];
//       }
//   }
// }

  function createWidget(req, res) {
  let pid =req.params['pid']
  let widget = req.body;
    // widget._id = Math.floor(Math.random()*Math.floor(10000)).toString(); 
    // widget.pageId = pageId;
    // widgets.push(widget);
widgetModel.createWidget(widget).then(
  data => {
     res.json(data);
  })

   
  }

  function findAllWidgetsForUser(req,res) {
 let pid = req.params['pid']
  widgetModel.findAllWidgetsforPage(pid).then(
    data =>{
        res.json(data)
    })

  }

  function findWidgetById(req, res) {
    let wgid = req.params['wgid']
    widgetModel.findWidgetById(wgid).then(
      data =>{
        res.json(data)
      })
  }

  function updateWidget(req, res) { 
    let wgid = req.params['wgid'];
    let widget = req.body;
   
   widgetModel.updateWidget(wgid,widget).then(
    data =>{
         res.json(data);
    })

   }

  function deleteWidget(req,res) {  
   let wgid = req.params['wgid']
  widgetModel.deleteWidget(wgid).then(
    data =>{
      res.json(data)
    })     
     }
   }