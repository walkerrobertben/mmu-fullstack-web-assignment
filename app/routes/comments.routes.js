const controller = require("../controllers/comments.controllers.js");

const authenticate = require("../lib/authenticate");

module.exports = function(app) {

    app.route("/articles/:article_id/comments")
        .get(controller.getAll)
        .post(controller.createSingle);

    app.route("/comments/:comment_id")
        .delete(authenticate.require, controller.deleteSingle);
}