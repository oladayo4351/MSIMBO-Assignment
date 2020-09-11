module.exports = function (app) {
  require("./models/models.server.js");
  require("./services/env.service.server.js")(app);
  require("./services/user.service.server.js")(app);
  require("./services/website.service.server.js")(app);
  require("./services/page.service.server.js")(app);
  require("./services/widget.service.server.js")(app);
};
