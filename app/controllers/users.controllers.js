const self = {};

const Joi = require("joi")

const model = require("../models/users.models");

self.getAll = (req, res) => {
    model.getAll().then((articles) => {
        res.status(200).send(articles);
    }).catch((error) => {
        console.error(error);
        res.sendStatus(500);
    });
}

self.createSingle = (req, res) => {

    { //validation
        const schema = Joi.object({
            "first_name": Joi.string().required(),
            "last_name": Joi.string().required(),
            "email": Joi.string().email().required(),
            "password": Joi.string().required(),
        });

        const validation = schema.validate(req.body);

        if (validation.error) {
            return res.status(400).send(validation.error.details[0].message);
        }
    }

    const user = Object.assign({}, req.body);

    model.addSingle(user).then((user_id) => {
        res.status(201).send({user_id: user_id});
    }).catch((error) => {
        console.error(error);
        res.sendStatus(500);
    });
}

self.login = (req, res) => {
    
    { //validation
        const schema = Joi.object({
            "email": Joi.string().required(),
            "password": Joi.string().required(),
        });

        const validation = schema.validate(req.body);

        if (validation.error) {
            return res.status(400).send(validation.error.details[0].message);
        }
    }

    model.attemptLogin(req.body.email, req.body.password).then((loginAttemptResult) => {

        if (loginAttemptResult.success) {
            const user_id = loginAttemptResult.user_id;

            model.getToken(user_id).then((session_token) => {

                if (session_token != null) {
                    res.status(200).send({user_id: user_id, session_token: session_token}); //already logged in

                } else {
                    
                    //give the user a session token
                    model.setToken(user_id).then((session_token) => {
                        res.status(200).send({user_id: user_id, session_token: session_token}); //logged in

                    }).catch((error) => {
                        console.error(error);
                        res.sendStatus(500);
                    });
                }
            }).catch((error) => {
                console.error(error);
                res.sendStatus(500);
            });
        } else {
            res.sendStatus(400);
        }
    }).catch((error) => {
        console.error(error);
        res.sendStatus(500);
    });
}

self.logout = (req, res) => {

    const session_token = req.header("X-Authorization");
    if (session_token == null) {
        return res.sendStatus(401);
    }

    model.getUserIdFromSessionToken(session_token).then((user_id) => {
        if (user_id != null) {

            model.deleteToken(user_id).then(() => {

                //logged out
                res.sendStatus(200);
    
            }).catch((error) => {
                console.error(error);
                res.sendStatus(500);
            });

        } else {
            res.sendStatus(401);
        }
    }).catch((error) => {
        console.error(error);
        res.sendStatus(500);
    });
}

self.deleteSingle = (req, res) => {
    console.error("delete user deprecated");
    res.sendStatus(500);
}

module.exports = self;