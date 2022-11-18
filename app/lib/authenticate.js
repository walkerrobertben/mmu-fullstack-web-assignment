//authentication middleware
const self = {}

const users_model = require("../models/users.models");

self.authenticate = (req, res, next) => {

    const session_token = req.header("X-Authorization");
    if (session_token == null) {
        return res.sendStatus(401); //no token, unauthorised
    }

    users_model.getUserIdFromSessionToken(session_token).then((user_id) => {
        if (user_id != null) {

            req.authenticated = {
                "user_id": user_id
                //could add more to this later like 'level' for user/admin accounts
            }

            return next();

        } else {
            res.sendStatus(401); //token doesnt match user
        }
    }).catch((error) => {
        console.error(error);
        res.sendStatus(500);
    });
}

module.exports = self;