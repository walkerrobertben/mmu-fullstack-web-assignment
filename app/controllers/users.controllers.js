const self = {};

const Joi = require("joi")

const model = require("../models/users.models");

const user_levels = require("../lib/user_levels");

self.getAll = (req, res) => {

    //require admin
    if (req.authenticated.user_level < user_levels.LEVEL_ADMIN) {
        return res.sendStatus(401);
    }

    model.getAll().then((users) => {
        res.status(200).send(users);
    }).catch((error) => {
        console.error(error);
        res.sendStatus(500);
    });
}

self.createSingle = (req, res) => {

    //require admin
    if (req.authenticated.user_level < user_levels.LEVEL_ADMIN) {
        return res.sendStatus(401);
    }

    { //validation

        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/;

        const schema = Joi.object({
            "first_name": Joi.string().required(),
            "last_name": Joi.string().required(),
            "email": Joi.string().email().required(),
            "password": Joi.string().regex(passwordPattern).required(),
        }).unknown(false);

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
    model.deleteToken(req.authenticated.user_id).then(() => {
        //logged out
        res.sendStatus(200);

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