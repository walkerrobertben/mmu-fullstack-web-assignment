const controller = require("../controllers/users.controllers.js");

module.exports = function(app) {

    app.route("/users")
        .get(controller.getAll)
        .post(controller.createSingle);

    // app.route("/users/:user_id")
    //     .delete(controller.deleteSingle);

    app.route("/login")
        .post(controller.login);

    app.route("/logout")
        .post(controller.logout);

}