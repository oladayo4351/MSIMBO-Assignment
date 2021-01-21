var connectionString = "mongodb://127.0.0.1:27017/web-dev"; // for local

if (process.env.MLAB_USERNAME_WEBDEV) {
  // check if running remotely
  var username = process.env.MLAB_USERNAME_WEBDEV; // get from environment
  var password = process.env.MLAB_PASSWORD_WEBDEV;
  connectionString = "mongodb+srv://" + username + ":" + password;
  connectionString += "@cluster-nhg7v7rs.5fs4a.mongodb.net/heroku_pn1q8xh2"; // use yours
}

var mongoose = require("mongoose");
var db = mongoose.connect(connectionString);
module.exports = db;
