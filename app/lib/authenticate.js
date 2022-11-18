//authentication middleware
const self = {}

const users_model = require("../models/users.models");


function GetAuthenticated(user_id) {
    return {
        "user_id": user_id
    }
}


//this *checks* if authenticated but will always call next()
self.check = (req, res, next) => {

    const session_token = req.header("X-Authorization");

    if (session_token == null) {
        return next(); //no token
    }

    users_model.getUserIdFromSessionToken(session_token).then((user_id) => {
        if (user_id != null) {

            req.authenticated = GetAuthenticated(user_id);
            return next();

        } else {
            return next();
        }
    }).catch((error) => {
        console.error(error);
        return next();
    });
}


//this *requires* the user is authenticated for next() to be called
self.require = (req, res, next) => {

    const session_token = req.header("X-Authorization");
    if (session_token == null) {
        return res.sendStatus(401); //no token, unauthorised
    }

    users_model.getUserIdFromSessionToken(session_token).then((user_id) => {
        if (user_id != null) {

            req.authenticated = GetAuthenticated(user_id);
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