module.exports = function(app){
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


function selectWidgetById(wgid){
  for (var x = 0; x < widgets.length; x++) {
      if (widgets[x]._id === wgid) {  
        return widgets[x];
      }
  }
}

  function createWidget(req, res) {
  let pageId =req.params['pid']
  let widget = req.body;
    widget._id = Math.floor(Math.random()*Math.floor(10000)).toString(); 
    widget.pageId = pageId;
    widgets.push(widget);
    res.json(widget);
  }

  function findAllWidgetsForUser(req,res) {
  pageId = req.params['pid']
   var result = [];
    for (var x = 0; x < widgets.length; x++) {
      if (widgets[x].pageId === pageId) { 
        result.push(widgets[x]);
         }
    }res.json(result)
  }

  function findWidgetById(req, res) {
    let widgetId = req.params['wgid']
    for (var x = 0; x < widgets.length; x++) {
      if (widgets[x]._id === widgetId){
        let widget =widgets[x] 
        res.json(widget)
      }
    }
  }

  function updateWidget(req, res) { 
    let widgetId = req.params['wgid'];
    let widget = req.body;
    const oldWidget = selectWidgetById(widgetId);
    const index = widgets.indexOf(oldWidget);

    widgets[index].size = widget.size;
    widgets[index].width = widget.width;
    widgets[index].text = widget.text;
    widgets[index].url = widget.url;
    res.json(widget);


   }
  function deleteWidget(req,res) {  
   let widgetId = req.params['wgid']
    const oldWidget = selectWidgetById(widgetId);
    const index = widgets.indexOf(oldWidget);
      widgets.splice(index,1);
      res.json(widgets)
     }
   }