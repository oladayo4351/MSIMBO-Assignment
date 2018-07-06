var mongoose = require('mongoose')

var WidgetSchema = require("./widget.schema.server.js")

var WidgetModel = mongoose.model("WidgetModel" , WidgetSchema)


WidgetModel.findAllWidgetsforPage = findAllWidgetsforPage,
WidgetModel.findWidgetById = findWidgetById,
WidgetModel.updateWidget = updateWidget,
WidgetModel.deleteWidget = deleteWidget,
WidgetModel.createWidget = createWidget


function createWidget(widget){
	return WidgetModel.create(widget);
}
function findAllWidgetsforPage(pid){
	return WidgetModel.find({pageId:pid});

} 

function findWidgetById(wgid){
	return WidgetModel.findById(wgid);

}

function updateWidget(wgid, widget){
	return WidgetModel.update({_id:wgid}, widget);
}

function deleteWidget(wgid){
	return WidgetModel.remove({_id:wgid});
}

module.exports = WidgetModel;