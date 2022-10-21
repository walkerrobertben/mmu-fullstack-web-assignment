const controller = require("../controllers/articles.controllers.js");

module.exports = function(app) {

    app.route("/articles")
        .get(controller.getAll)
        .post(controller.create);

    app.route("/articles/:article_id")
        .get(controller.getOne)
        .patch(controller.updateArticle)
        .delete(controller.deleteArticle);

}