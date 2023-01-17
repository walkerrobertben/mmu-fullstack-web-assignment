const controller = require("../controllers/articles.controllers.js");

const authenticate = require("../lib/authenticate");

module.exports = function(app) {

    app.route("/articles")
        .get(authenticate.check, controller.getAll)
        .post(authenticate.require, controller.createSingle);

    app.route("/articles/:article_id")
        .get(authenticate.check, controller.getSingle)
        .patch(authenticate.require, controller.updateSingle)
        .delete(authenticate.require, controller.deleteSingle);

}