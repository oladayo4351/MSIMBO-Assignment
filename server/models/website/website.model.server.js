var mongoose = require('mongoose');
var WebsiteSchema = require('./website.schema.server.js');

var WebsiteModel = mongoose.model('WebsiteModel', WebsiteSchema);

WebsiteModel.createWebsite = createWebsite;
WebsiteModel.findWebsiteById = findWebsiteById;
WebsiteModel.findAllWebsitesForUser = findAllWebsitesForUser;
WebsiteModel.updateWebsite = updateWebsite;
WebsiteModel.deleteWebsite = deleteWebsite;

function createWebsite(website) {
	return WebsiteModel.create(website);
}

function findWebsiteById(wid) {
	return WebsiteModel.findById(wid);
}

function findAllWebsitesForUser(uid) {
	return WebsiteModel.find({developerId: uid}).sort({name:1, description:1});
}


function updateWebsite(wid, website) {
	return WebsiteModel.update({_id: wid}, website);
}

function deleteWebsite(wid) {
	return WebsiteModel.remove({_id:wid});
}

module.exports = WebsiteModel;