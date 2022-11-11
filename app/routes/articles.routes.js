const controller = require("../controllers/articles.controllers.js");

module.exports = function(app) {

    app.route("/articles")
        .get(controller.getAll)
        .post(controller.createSingle);

    app.route("/articles/:article_id")
        .get(controller.getSingle)
        .patch(controller.updateSingle)
        .delete(controller.deleteSingle);

}