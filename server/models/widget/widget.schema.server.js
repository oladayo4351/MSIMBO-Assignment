var mongoose = require('mongoose')

var WidgetSchema = mongoose.Schema({
	pageId: {type: mongoose.Schema.Types.ObjectId, ref: 'WebsiteModel'},
	widgetType: {type: String, enum:['HEADING', 'IMAGE', 'YOUTUBE']},
	name: String,
	text: String,
	placeholder: String,
	url: String,
	width: String,
	height: String,
	size: Number,
	dateCreated: {type: Date, default: Date.now}
}, {collection: 'widget'})

module.exports = WidgetSchema;